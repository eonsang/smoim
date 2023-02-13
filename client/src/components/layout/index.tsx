import { NavLayout } from "@/components/layout/nav";
import { HeaderLayout } from "@/components/layout/header";
import {
  Box,
  Button,
  Container,
  Flex,
  Input,
  Modal,
  Stack,
  Text,
  TypographyStylesProvider,
} from "@mantine/core";
import React from "react";
import Image from "next/image";
import { useGoogleLogin } from "@react-oauth/google";
import { FcGoogle } from "react-icons/fc";
import { BsApple } from "react-icons/bs";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { uiState } from "@/recoil/atom/ui";
import { useMutation } from "@tanstack/react-query";
import client, { TErrorRespnose } from "@/api/client";
import { useInputState } from "@mantine/hooks";
import { useForm } from "react-hook-form";
import { IsOptional, IsString } from "class-validator";
import { setCookie } from "cookies-next";
import { signIn, useSession } from "next-auth/react";
import KakaoLogin from "react-kakao-login";
import { showNotification } from "@mantine/notifications";

export class AuthForm {
  @IsString()
  token: string;

  @IsString()
  @IsOptional()
  nickname: string;

  @IsString()
  provider: string;
}

type Props = {
  children: React.ReactElement;
};
const LayoutContainer = ({ children }: Props) => {
  const { data } = useSession();
  const uiValue = useRecoilValue(uiState);
  const setUiState = useSetRecoilState(uiState);
  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm<AuthForm>({
    defaultValues: {},
  });

  const [isSignup, setIsSignup] = useInputState<boolean>(false);
  const signUpMutation = useMutation(
    (body: AuthForm) => client.post("/v1/client/user", body),
    {
      async onSuccess(res) {
        setCookie("accessToken", res.data.accessToken);
        setCookie("refreshToken", res.data.refreshToken);
        setIsSignup(false);
        setUiState((prev) => ({ ...prev, openLoginPopup: false }));
        showNotification({
          title: "첫 방문이시군요!",
          message: "관심있는 모임에 참여하고, 함꼐 성장해봐요!",
        });
        await signIn("credentials", {
          redirect: false,
          id: res.data.user.id,
          email: res.data.user.email,
          name: res.data.user.nickname,
        });
      },
      onError(err) {
        showNotification({
          title: "문제가 발생했어요!",
          message: "확인하고 알려드릴게요!",
          color: "red",
        });
      },
    }
  );

  const loginMutation = useMutation(
    (body: { provider: string; token: string }) =>
      client.post("/v1/client/auth/login", body),
    {
      async onSuccess(res) {
        setCookie("accessToken", res.data.accessToken);
        setCookie("refreshToken", res.data.refreshToken);
        setIsSignup(false);
        setUiState((prev) => ({ ...prev, openLoginPopup: false }));

        await signIn("credentials", {
          redirect: false,
          id: res.data.user.id,
          email: res.data.user.email,
          name: res.data.user.nickname,
        });
      },
      onError(err: TErrorRespnose, variables) {
        if (err.error?.code === 40400) {
          setIsSignup(true);
          setValue("provider", variables.provider);
          setValue("token", variables.token);
        }
      },
    }
  );

  const onClickGoogleLogin = useGoogleLogin({
    onSuccess(response) {
      loginMutation.mutate({
        provider: "google",
        token: response.access_token,
      });
    },
  });

  return (
    <div>
      <HeaderLayout />
      <Flex>
        <NavLayout />
        <Container fluid={true} w={"100%"}>
          {children}
        </Container>
      </Flex>
      <TypographyStylesProvider>
        <Modal
          centered
          overlayOpacity={0.3}
          overlayBlur={1}
          opened={uiValue.openLoginPopup}
          onClose={() => {
            setUiState((prev) => ({ ...prev, openLoginPopup: false }));
            setIsSignup(false);
          }}
        >
          <Box>
            <Box mb={12}>
              <Text size={20}>시작하기</Text>
            </Box>
            <Text color={"dark.2"}>
              00명의 회원들이 함께 학습하며, 성장하고 있어요.
            </Text>
            <Text color={"dark.2"}>아래 간편가입을 통해, 함께하세요!</Text>
          </Box>

          {isSignup ? (
            <form
              onSubmit={handleSubmit((body) => signUpMutation.mutate(body))}
            >
              <Flex
                h={160}
                direction={"column"}
                justify={"space-between"}
                mt={40}
              >
                <Input.Wrapper
                  w={"100%"}
                  id="input-demo"
                  withAsterisk
                  label="닉네임"
                  description="자신을 표현할 수 있는 재밌는 닉네임을 지어주세요!"
                >
                  <Input size={"md"} {...register("nickname")} />
                </Input.Wrapper>

                <Button type={"submit"} h={48}>
                  시작하기
                </Button>
              </Flex>
            </form>
          ) : (
            <Stack spacing={8} mt={40}>
              <KakaoLogin
                token={process.env.NEXT_PUBLIC_KAKAO_JAVASCRIPT_KEY as string}
                onSuccess={({ response }) => {
                  loginMutation.mutate({
                    provider: "kakao",
                    token: response.access_token,
                  });
                }}
                onFail={console.error}
                onLogout={console.info}
                render={({ onClick }) => (
                  <Button
                    onClick={onClick}
                    fullWidth
                    variant={"default"}
                    h={48}
                    styles={(theme) => ({
                      root: {
                        borderWidth: 0,
                        backgroundColor: "#fae100",
                        "&:hover": {
                          backgroundColor: "#fae100",
                        },
                      },
                    })}
                  >
                    <Image
                      src={require("@/assets/imgs/kakao-logo.png")}
                      alt={"카카오 로그인"}
                      width={32}
                    />
                    <Text ml={12} size={16}>
                      카카오 로그인
                    </Text>
                  </Button>
                )}
              />

              <Button
                fullWidth
                variant={"default"}
                h={48}
                onClick={() => onClickGoogleLogin()}
              >
                <FcGoogle size={26} />
                <Text ml={12} size={16}>
                  구글 로그인
                </Text>
              </Button>
              {/*<Button*/}
              {/*  fullWidth*/}
              {/*  variant={"default"}*/}
              {/*  h={48}*/}
              {/*  bg={"#000"}*/}
              {/*  styles={(theme) => ({*/}
              {/*    root: {*/}
              {/*      borderWidth: 0,*/}
              {/*      backgroundColor: "#000",*/}
              {/*      "&:hover": {*/}
              {/*        backgroundColor: "#000",*/}
              {/*      },*/}
              {/*    },*/}
              {/*  })}*/}
              {/*>*/}
              {/*  <BsApple size={26} color={"#fff"} />*/}
              {/*  <Text ml={12} size={16} color={"#fff"}>*/}
              {/*    애플 로그인*/}
              {/*  </Text>*/}
              {/*</Button>*/}
            </Stack>
          )}
        </Modal>
      </TypographyStylesProvider>
    </div>
  );
};

export default LayoutContainer;
