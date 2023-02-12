import {
  createStyles,
  Header,
  Group,
  Button,
  Box,
  Center,
  Text,
  useMantineTheme,
} from "@mantine/core";
import { GoogleLogin } from "@react-oauth/google";
import { useSetRecoilState } from "recoil";
import { uiState } from "@/recoil/atom/ui";

const useStyles = createStyles((theme) => ({
  hiddenMobile: {
    [theme.fn.smallerThan("sm")]: {
      display: "none",
    },
  },
}));

export function HeaderLayout() {
  const { classes } = useStyles();
  const setUiState = useSetRecoilState(uiState);

  return (
    <Box>
      <Header height={60} px="md">
        <Group position="apart" sx={{ height: "100%" }}>
          <Center w={280}>
            <Text fz="xl" fw={"900"}>
              스모임 smoim
            </Text>
          </Center>
          <Group className={classes.hiddenMobile}>
            <Button
              onClick={() =>
                setUiState((prev) => ({ ...prev, openLoginPopup: true }))
              }
            >
              시작하기
            </Button>
          </Group>
        </Group>
      </Header>
    </Box>
  );
}
