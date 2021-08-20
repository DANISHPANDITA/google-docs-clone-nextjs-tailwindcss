/** @format */
import "@material-tailwind/react/tailwind.css";
import { Provider } from "next-auth/client";
import Head from "next/head";
import "tailwindcss/tailwind.css";
export default function App({ Component, pageProps }) {
  return (
    <>
      <Head>
        <link
          href="https://fonts.googleapis.com/icon?family=Material+Icons"
          rel="stylesheet"
        />
      </Head>

      <Provider session={pageProps.session}>
        <Component {...pageProps} />
      </Provider>
    </>
  );
}
