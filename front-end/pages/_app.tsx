import Header from "@/components/Header";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import Head from "next/head";

export const databaseUrl = "https://afe5-145-100-157-235.ngrok-free.app/api";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Next Movies</title>
      </Head>
      <Header />
      <Component {...pageProps} />
    </>
  );
}
