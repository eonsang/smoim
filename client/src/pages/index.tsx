import { ReactElement } from "react";
import LayoutContainer from "@/components/layout";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { GetServerSidePropsContext } from "next";
import { useSession } from "next-auth/react";

export default function Home() {
  const { data } = useSession();

  return <>gg</>;
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
