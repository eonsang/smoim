import { ReactElement, useState } from "react";
import LayoutContainer from "@/components/layout";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { GetServerSidePropsContext } from "next";
import { useSession } from "next-auth/react";
import {
  Box,
  Button,
  Grid,
  Menu,
  SimpleGrid,
  Stack,
  TextInput,
} from "@mantine/core";
import { MoimCard } from "@/components/card/MoimCard";
import { useQuery } from "@tanstack/react-query";
import { queryKey } from "@/constants/queryKey";
import { getGroups } from "@/api/group.api";
import Link from "next/link";

export default function Home() {
  const { data } = useSession();
  const [page, setPage] = useState<number>(1);

  const groupQuery = useQuery(queryKey.getGroups(1, 20), () =>
    getGroups({ page, size: 20 })
  );

  return (
    <Stack>
      <Grid grow bg={"gray.1"}>
        <Grid.Col span={"auto"}>
          <Menu shadow="md" width={200}>
            <Menu.Target>
              <Button>Toggle menu</Button>
            </Menu.Target>
            <Menu.Dropdown>
              <Menu.Label>Application</Menu.Label>
              <Menu.Item onClick={() => null}>
                <TextInput />
              </Menu.Item>
            </Menu.Dropdown>
          </Menu>
        </Grid.Col>
        {data && (
          <Grid.Col span={6}>
            <Button href={"/group/register"} component={Link}>
              스터디 등록하기
            </Button>
          </Grid.Col>
        )}
      </Grid>

      <SimpleGrid
        cols={4}
        spacing="lg"
        breakpoints={[
          { maxWidth: 980, cols: 3, spacing: "md" },
          { maxWidth: 755, cols: 2, spacing: "sm" },
          { maxWidth: 600, cols: 1, spacing: "sm" },
        ]}
      >
        {groupQuery.data?.data.items.map((group, index) => (
          <MoimCard
            key={group.id}
            image={"https://picsum.photos/400/180"}
            category={"develop"}
            title={"스터디 모집합니다~!"}
            footer={"footer"}
            author={{
              name: "name",
              description: "desc",
              image: "https://picsum.photos/400/180",
            }}
          />
        ))}
      </SimpleGrid>
    </Stack>
  );
}

Home.getLayout = function getLayout(page: ReactElement) {
  return <LayoutContainer>{page}</LayoutContainer>;
};

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const session = await getServerSession(context.req, context.res, authOptions);
  return {
    props: {
      session,
    },
  };
}
