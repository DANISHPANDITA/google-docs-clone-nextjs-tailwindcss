/** @format */
import ProgressBar from "@badrap/bar-of-progress";
import "@material-tailwind/react/tailwind.css";
import { Provider } from "next-auth/client";
import Head from "next/head";
import Router from "next/router";
import "tailwindcss/tailwind.css";
const progress = new ProgressBar({
  size: 3,
  color: "#00C1D4",
  className: "z-50",
  delay: 100,
});
Router.events.on("routeChangeStart", progress.start);
Router.events.on("routeChangeComplete", progress.finish);
Router.events.on("routeChangeError", progress.finish);
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
