import { ReactElement, useEffect } from "react";
import LayoutContainer from "@/components/layout";
import { GetServerSidePropsContext } from "next";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useForm, Controller } from "react-hook-form";
import { DateRangePicker } from "@mantine/dates";
import {
  Box,
  Button,
  Group,
  Input,
  Stack,
  Table,
  Text,
  Flex,
  Title,
  Image,
  Textarea,
  Grid,
  NumberInput,
} from "@mantine/core";
import Editor from "@/components/editor";
import { IconFile } from "@tabler/icons";
import { classValidatorResolver } from "@hookform/resolvers/class-validator";
import { RegisterGroupRepository } from "@/repository/registerGroup.repository";

const GroupRegisterPage = ({}) => {
  const { data } = useSession();
  const router = useRouter();
  useEffect(() => {
    if (!data) router.replace("/");
  }, [data]);

  const resolver = classValidatorResolver(RegisterGroupRepository);

  const {
    control,
    register,
    handleSubmit,
    getValues,
    setValue,
    watch,
    formState: { errors },
  } = useForm<RegisterGroupRepository>({
    resolver,
    defaultValues: {
      minUser: 1,
      maxUser: 10,
      isApproval: true,
      isOpened: true,
    },
  });
  const watchDate = watch("date");

  console.log(errors);
  const onSubmitForm = handleSubmit((body) => {
    console.log(body);
  });

  return (
    <div>
      <Stack>
        <Box
          sx={(theme) => ({
            borderRadius: theme.radius.sm,
            border: "1px solid",
            borderColor: theme.colors.gray[4],
          })}
        >
          <Flex
            direction={{ sx: "row" }}
            justify={{ sx: "center" }}
            gap={"lg"}
            sx={(theme) => ({
              padding: theme.spacing.md,
              borderBottom: "1px solid",
              borderColor: theme.colors.gray[2],
            })}
          >
            <Box
              sx={(theme) => ({
                flex: 1,
              })}
            >
              <Title
                size={18}
                sx={(theme) => ({
                  margin: 0,
                })}
              >
                ????????? ?????? ??????
              </Title>
            </Box>
          </Flex>

          <Box
            sx={(theme) => ({
              padding: theme.spacing.md,
            })}
          >
            <Stack>
              <Group grow align={"flex-start"}>
                <Box>
                  <Image
                    width={"100%"}
                    height={210}
                    src={null}
                    alt="With default placeholder"
                    withPlaceholder
                  />
                </Box>
                <Box>
                  <Stack>
                    <Input.Wrapper
                      id="title"
                      required={true}
                      label="????????? ??????"
                    >
                      <Input
                        id="title"
                        placeholder="????????? ??????????????????."
                        {...register("title")}
                      />
                    </Input.Wrapper>
                    <Input.Wrapper
                      id="subTitle"
                      required={true}
                      label="????????? ?????? ??????"
                    >
                      <Textarea
                        id={"subTitle"}
                        placeholder={
                          "???????????? ?????? ????????? ?????? ??? ????????? ??????????????????."
                        }
                        minRows={4}
                        maxRows={4}
                        {...register("subTitle")}
                        maxLength={250}
                      />
                    </Input.Wrapper>
                  </Stack>
                </Box>
              </Group>
              <Grid>
                <Grid.Col span={6}>
                  <DateRangePicker
                    label="????????? ??????"
                    required={true}
                    placeholder="????????? ????????? ??????????????????."
                    value={watchDate}
                    onChange={(value) => {
                      setValue("date", value);
                    }}
                  />
                </Grid.Col>
                <Grid.Col span={3}>
                  <Input.Wrapper id="id" required={true} label="?????? ??????">
                    <Controller
                      name="minUser"
                      control={control}
                      render={({ field }) => (
                        <NumberInput
                          defaultValue={field.value || 1}
                          placeholder="?????? ??????"
                          {...field}
                        />
                      )}
                    />
                  </Input.Wrapper>
                </Grid.Col>
                <Grid.Col span={3}>
                  <Input.Wrapper id="maxUser" required={true} label="?????? ??????">
                    <Controller
                      name="maxUser"
                      control={control}
                      render={({ field }) => (
                        <NumberInput
                          id={"maxUser"}
                          defaultValue={field.value || 10}
                          placeholder="?????? ??????"
                          {...field}
                        />
                      )}
                    />
                  </Input.Wrapper>
                </Grid.Col>
              </Grid>

              <Input.Wrapper id="id" required={true} label="????????? ?????? ??????">
                <Controller
                  control={control}
                  name={"information"}
                  render={({ field }) => {
                    return (
                      <Editor value={field.value} onChange={field.onChange} />
                    );
                  }}
                />
              </Input.Wrapper>

              <Input.Wrapper id="id" required={true} label="????????? ?????? ??????">
                <Controller
                  control={control}
                  name={"notice"}
                  render={({ field }) => {
                    return (
                      <Editor value={field.value} onChange={field.onChange} />
                    );
                  }}
                />
              </Input.Wrapper>
            </Stack>
          </Box>
        </Box>

        <Box
          sx={(theme) => ({
            borderRadius: theme.radius.sm,
            border: "1px solid",
            borderColor: theme.colors.gray[4],
          })}
        >
          <Flex
            direction={{ sx: "row" }}
            justify={{ sx: "center" }}
            gap={"lg"}
            sx={(theme) => ({
              padding: theme.spacing.md,
              borderBottom: "1px solid",
              borderColor: theme.colors.gray[2],
            })}
          >
            <Box
              sx={(theme) => ({
                flex: 1,
              })}
            >
              <Title
                size={18}
                sx={(theme) => ({
                  margin: 0,
                })}
              >
                ????????? ?????? ??????
              </Title>
              <Text
                sx={(theme) => ({
                  color: theme.colors.gray[6],
                  marginTop: 4,
                  fontSize: 14,
                })}
              >
                ???????????? ????????? ????????? ???????????????.
              </Text>
            </Box>
            <Box>
              <Button leftIcon={<IconFile size={18} />}>?????? ?????????</Button>
            </Box>
          </Flex>

          <Box
            sx={(theme) => ({
              padding: theme.spacing.md,
            })}
          >
            <Table>
              <thead>
                <tr>
                  <th>
                    <Text
                      sx={(theme) => ({
                        color: theme.colors.gray[5],
                      })}
                    >
                      ??????
                    </Text>
                  </th>
                  <th>
                    <Text
                      sx={(theme) => ({
                        color: theme.colors.gray[5],
                      })}
                    >
                      ?????? ??????
                    </Text>
                  </th>
                  <th>
                    <Text
                      sx={(theme) => ({
                        color: theme.colors.gray[5],
                      })}
                    >
                      ?????? ??????
                    </Text>
                  </th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>1</td>
                  <td>2</td>
                  <td>3</td>
                  <td>4</td>
                </tr>
              </tbody>
            </Table>
          </Box>
        </Box>

        <Group>
          <Button onClick={onSubmitForm}>??????</Button>
        </Group>
      </Stack>
    </div>
  );
};

GroupRegisterPage.getLayout = function getLayout(page: ReactElement) {
  return <LayoutContainer>{page}</LayoutContainer>;
};

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const session = await getServerSession(context.req, context.res, authOptions);

  if (!session) {
    return {
      redirect: {
        permanent: false,
        destination: "/",
      },
      props: {},
    };
  }

  return {
    props: {
      session,
    },
  };
}

export default GroupRegisterPage;
