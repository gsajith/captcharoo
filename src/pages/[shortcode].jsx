import styles from "../styles/Home.module.css";
import Head from "next/head";
import { useRouter } from "next/router";
import { useCallback, useEffect, useState } from "react";
import ReCAPTCHA from "react-google-recaptcha";
import { testCaptcha } from "../utils";

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
        setPhrase(result.data.phrase);
        setName(result.data.name);
      } else {
        // Redirect to home and show error
        router.push("/?error=invalid");
      }
    } catch (error) {
      alert(error?.message || "Something went wrong");
    } finally {
    }
  }, [shortcode, captchaSolved, router]);

  // On initial load, do fetch with no phrase included
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
        <ReCAPTCHA
          asyncScriptOnLoad={() => console.log("load")}
          sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY}
          onChange={(code) => testCaptcha(code, () => setCaptchaSolved(true))}
        />
      </main>
    </>
  );
};

export default CaptchaPage;
