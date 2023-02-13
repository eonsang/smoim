import {
  createStyles,
  Header,
  Group,
  Button,
  Box,
  Center,
  Text,
  UnstyledButton,
  Menu,
  Avatar,
} from "@mantine/core";
import { deleteCookie } from "cookies-next";
import { useSetRecoilState } from "recoil";
import { uiState } from "@/recoil/atom/ui";
import { signOut, useSession } from "next-auth/react";
import { showNotification } from "@mantine/notifications";

const useStyles = createStyles((theme) => ({
  hiddenMobile: {
    [theme.fn.smallerThan("sm")]: {
      display: "none",
    },
  },
}));

export function HeaderLayout() {
  const { classes } = useStyles();
  const { data } = useSession();
  const setUiState = useSetRecoilState(uiState);

  const handleClickSignOut = () => {
    return signOut({
      redirect: false,
      callbackUrl: window.location.origin,
    })
      .then(() => {
        showNotification({
          title: "이번 스터디는 만족 하셨나요?!",
          message:
            "다음 스터디에 다시 만나요! 학습에 불편사항이 있으면 언제든 문의주세요 😘",
        });
      })
      .finally(() => {
        deleteCookie("accessToken");
        deleteCookie("refreshToken");
      });
  };

  return (
    <Box>
      <Header height={60} px="md">
        <Group position="apart" sx={{ height: "100%" }}>
          <Center w={280}>
            <Text fz="xl" fw={"900"}>
              스모임 smoim
            </Text>
          </Center>
          {data ? (
            <Menu
              width={260}
              position="bottom-end"
              transition="pop-top-right"
              onClose={() => {}}
              onOpen={() => {}}
            >
              <Menu.Target>
                <UnstyledButton>
                  <Group spacing={2}>
                    <Avatar size={30} src={data.user?.image} radius={30} />
                    <Text size="sm" weight={500}>
                      {data.user?.name}
                    </Text>
                  </Group>
                </UnstyledButton>
              </Menu.Target>
              <Menu.Dropdown>
                <Menu.Item>내 정보</Menu.Item>
                <Menu.Divider />
                <Menu.Item color={"red.5"} onClick={handleClickSignOut}>
                  로그아웃
                </Menu.Item>
              </Menu.Dropdown>
            </Menu>
          ) : (
            <Group className={classes.hiddenMobile}>
              <Button
                onClick={() =>
                  setUiState((prev) => ({ ...prev, openLoginPopup: true }))
                }
              >
                시작하기
              </Button>
            </Group>
          )}
        </Group>
      </Header>
    </Box>
  );
}
