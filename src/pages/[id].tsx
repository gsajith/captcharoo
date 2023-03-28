import Head from "next/head";
import styles from "@/styles/Home.module.css";
import { useRouter } from "next/router";
import ReCAPTCHA from "react-google-recaptcha";
import { createRef, useState } from "react";

const CaptchaPage = () => {
  const router = useRouter();
  const recaptchaRef = createRef<ReCAPTCHA>();
  const { id } = router.query;
  const [phrase, setPhrase] = useState(null);
  const [name, setName] = useState(null);

  const fetchRow = async () => {
    try {
      const endpoint = "/api/getPhraseRow";

      const data = {
        id: id,
      };

      const JSONdata = JSON.stringify(data);

      const options = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSONdata,
      };

      const response = await fetch(endpoint, options);
      const result = await response.json();
      if (response.ok) {
        alert(`Got ${JSON.stringify(result.data)}`);
        setPhrase(result.data[0].phrase);
        setName(result.data[0].name);
      } else {
        alert("Invalid URL");
      }
    } catch (error: any) {
      alert(error?.message || "Something went wrong");
    } finally {
    }
  };

  const onChange = async (captchaCode: string | null) => {
    if (!captchaCode) {
      return;
    }
    try {
      const response = await fetch("/api/testCaptcha", {
        method: "POST",
        body: JSON.stringify({ captcha: captchaCode }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (response.ok) {
        fetchRow();
      } else {
        // Else throw an error with the message returned
        // from the API
        const error = await response.json();
        throw new Error(error.message);
      }
    } catch (error: any) {
      alert(error?.message || "Something went wrong");
    } finally {
      // Reset the reCAPTCHA when the request has failed or succeeeded
      // so that it can be executed again if user submits another email.
      // recaptchaRef.current?.reset();
    }

    console.log("Captcha value:", captchaCode);
  };

  return (
    <>
      <Head>
        <title>Captcharoo</title>
        <meta name="description" content="Bot or not?" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <div className={styles.center}>
          {id}:{phrase} {name}
        </div>
        <ReCAPTCHA
          ref={recaptchaRef}
          asyncScriptOnLoad={() => console.log("load")}
          sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY!}
          onChange={onChange}
        />
      </main>
    </>
  );
};

export default CaptchaPage;
