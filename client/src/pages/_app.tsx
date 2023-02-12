import "reflect-metadata";

import { AppProps } from "next/app";
import Head from "next/head";
import { MantineProvider } from "@mantine/core";
import { SessionProvider } from "next-auth/react";
import { ReactElement, ReactNode } from "react";
import { NextPage } from "next";
import { Noto_Sans_KR, Nanum_Gothic } from "@next/font/google";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { QueryClient } from "@tanstack/query-core";
import { RecoilRoot } from "recoil";
import { QueryClientProvider } from "@tanstack/react-query";

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

export const notoSansKR = Noto_Sans_KR({
  weight: ["100", "400", "700", "900"],
  subsets: ["latin"],
});

const queryClient = new QueryClient();

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}: AppPropsWithLayout) {
  const getLayout = Component.getLayout ?? ((page) => page);

  return (
    <>
      <Head>
        <title>Page title</title>
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width"
        />
      </Head>

      <MantineProvider
        withGlobalStyles
        withNormalizeCSS
        theme={{
          fontFamily: notoSansKR.style.fontFamily,
          colorScheme: "light",
        }}
      >
        <SessionProvider session={session}>
          <GoogleOAuthProvider
            clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID as string}
          >
            <RecoilRoot>
              <QueryClientProvider client={queryClient}>
                <main className={notoSansKR.className}>
                  {getLayout(<Component {...pageProps} />)}
                </main>
              </QueryClientProvider>
            </RecoilRoot>
          </GoogleOAuthProvider>
        </SessionProvider>
      </MantineProvider>
    </>
  );
}
