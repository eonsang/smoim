import {
  createStyles,
  Navbar,
  TextInput,
  Code,
  UnstyledButton,
  Text,
  useMantineTheme,
  Flex,
  Badge,
} from "@mantine/core";
import { AiOutlineSearch } from "react-icons/ai";
import { memo } from "react";
import Link from "next/link";
import { useSession } from "next-auth/react";

const useStyles = createStyles((theme) => ({
  navbar: {
    paddingTop: 0,
    zIndex: 0,
  },

  section: {
    marginLeft: -theme.spacing.md,
    marginRight: -theme.spacing.md,
    marginBottom: theme.spacing.md,

    "&:not(:last-of-type)": {
      borderBottom: `1px solid ${
        theme.colorScheme === "dark"
          ? theme.colors.dark[4]
          : theme.colors.gray[3]
      }`,
    },
  },

  searchCode: {
    fontWeight: 700,
    fontSize: 10,
    backgroundColor:
      theme.colorScheme === "dark"
        ? theme.colors.dark[7]
        : theme.colors.gray[0],
    border: `1px solid ${
      theme.colorScheme === "dark" ? theme.colors.dark[7] : theme.colors.gray[2]
    }`,
  },

  mainLinks: {
    paddingLeft: theme.spacing.md - theme.spacing.xs,
    paddingRight: theme.spacing.md - theme.spacing.xs,
    paddingBottom: theme.spacing.md,
  },

  mainLink: {
    display: "flex",
    alignItems: "center",
    width: "100%",
    fontSize: theme.fontSizes.xs,
    padding: `8px ${theme.spacing.xs}px`,
    borderRadius: theme.radius.sm,
    fontWeight: 500,
    color:
      theme.colorScheme === "dark"
        ? theme.colors.dark[0]
        : theme.colors.gray[7],

    "&:hover": {
      backgroundColor:
        theme.colorScheme === "dark"
          ? theme.colors.dark[6]
          : theme.colors.gray[0],
      color: theme.colorScheme === "dark" ? theme.white : theme.black,
    },
  },
}));

export function NavLayout() {
  const { data } = useSession();
  const { classes } = useStyles();

  const theme = useMantineTheme();

  const NavItem = memo(
    ({
      label,
      notification,
      link,
    }: {
      label: string;
      notification?: number;
      link: string;
    }) => (
      <UnstyledButton className={classes.mainLink} component={Link} href={link}>
        <Flex justify={"space-between"} align={"center"} w={"100%"}>
          <Text size={14}>{label}</Text>
          {typeof notification === "number" && <Badge>{notification}</Badge>}
        </Flex>
      </UnstyledButton>
    )
  );
  NavItem.displayName = "navItem";

  return (
    <Navbar
      width={{ sm: 280 }}
      p="md"
      className={classes.navbar}
      bg={theme.colors.gray[0]}
    >
      {/*<TextInput*/}
      {/*  placeholder="키워드 검색"*/}
      {/*  size="sm"*/}
      {/*  icon={<AiOutlineSearch size={18} />}*/}
      {/*  mb="sm"*/}
      {/*/>*/}
      <Navbar.Section className={classes.section}>
        <div className={classes.mainLinks}>
          <NavItem label={"전체 모임"} notification={3} link={"/"} />
          {data && <NavItem label={"내 모임"} notification={3} link={"/"} />}
          <NavItem label={"커뮤니티"} link={"/community"} />
        </div>
      </Navbar.Section>
    </Navbar>
  );
}
