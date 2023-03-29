import styles from "@/styles/Home.module.css";
import Head from "next/head";
import { useRouter } from "next/router";
import { createRef, useCallback, useEffect, useState } from "react";
import ReCAPTCHA from "react-google-recaptcha";
import { testCaptcha } from "../utils";

// TODO: SSR Title for this page based on name of person who created it

const CaptchaPage = () => {
  const router = useRouter();
  const { shortcode } = router.query;

  const [phrase, setPhrase] = useState(null);
  const [name, setName] = useState(null);
  const [captchaSolved, setCaptchaSolved] = useState(false);

  const fetchRow = useCallback(async () => {
    try {
      const endpoint = "/api/phrase/get";

      const options = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          shortcode: shortcode,
          includePhrase: captchaSolved,
        }),
      };

      const response = await fetch(endpoint, options);

      const result = await response.json();

      if (response.ok) {
        // alert(`Got ${JSON.stringify(result.data)}`);
        setPhrase(result.data.phrase);
        setName(result.data.name);
      } else {
        // Redirect to home and show error
        router.push("/?error=invalid");
      }
    } catch (error: any) {
      alert(error?.message || "Something went wrong");
    } finally {
    }
  }, [shortcode, captchaSolved, router]);

  // On initial load, do callback with no phrase fetched
  useEffect(() => {
    if (shortcode) {
      fetchRow();
    }
  }, [fetchRow, shortcode]);

  return (
    <>
      <Head>
        <title>Captcharoo{name ? " from " + name : ""}</title>
        <meta name="description" content="Bot or not?" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <div className={styles.center}>
          {shortcode}:{phrase} {name}
        </div>
        <div
          style={{
            width: captchaSolved ? 0 : 300,
            overflow: "hidden",
            transition: "width 750ms",
            transitionTimingFunction: "ease-in-out",
          }}>
          <ReCAPTCHA
            asyncScriptOnLoad={() => console.log("load")}
            sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY!}
            onChange={(code) => testCaptcha(code, () => setCaptchaSolved(true))}
          />
        </div>
      </main>
    </>
  );
};

export default CaptchaPage;
