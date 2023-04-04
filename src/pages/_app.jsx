import Head from "next/head";
import "../styles/globals.css";

export default function App({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>Captcharoo — Bot or not?</title>
        <meta name="og:title" content="Captcharoo — Bot or not?" />
        <meta name="twitter:title" content="Captcharoo — Bot or not?" />
        <meta
          name="description"
          content="Lock a secret phrase behind a passcode and have suspected bots try to fill it out!"
        />
        <meta
          name="og:description"
          content="Lock a secret phrase behind a passcode and have suspected bots try to fill it out!"
        />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:creator" content="@GuamHat" />
        <meta name="twitter:site" content="@GuamHat" />
        <meta name="twitter:image" content="/link_preview.png" />
        <meta name="twitter:image:alt" content="Captcharoo" />
        <meta name="twitter:image:width" content="1200" />
        <meta name="twitter:image:height" content="630" />
        <meta name="twitter:domain" content="captcharoo.com" />
        <meta name="og:image" content="/link_preview.png" />
        <meta name="og:image:alt" content="Captcharoo" />
        <meta name="og:image:width" content="1200" />
        <meta name="og:image:height" content="630" />
        <meta name="og:url" content="https://captcharoo.com" />
        <meta name="og:type" content="website" />
        <meta name="og:site_name" content="Captcharoo" />
        <meta name="og:locale" content="en_US" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Component {...pageProps} />
    </>
  );
}
