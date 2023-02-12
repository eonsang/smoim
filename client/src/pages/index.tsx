import { ReactElement } from "react";
import LayoutContainer from "@/components/layout";

export default function Home() {
  return <>gg</>;
}

Home.getLayout = function getLayout(page: ReactElement) {
  return <LayoutContainer>{page}</LayoutContainer>;
};
