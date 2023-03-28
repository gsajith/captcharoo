import Head from "next/head";
import styles from "@/styles/Home.module.css";
import ReCAPTCHA from "react-google-recaptcha";
import { testCaptcha } from "../utils";
import { useState } from "react";

export default function Home() {
  const [captchaSolved, setCaptchaSolved] = useState(false);

  const handleSubmit = async (event: any) => {
    try {
      event.preventDefault();

      const data = {
        phrase: event.target.phrase.value,
        name: event.target.name.value,
      };

      const JSONdata = JSON.stringify(data);

      const endpoint = "/api/phrase/create";

      const options = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSONdata,
      };

      const response = await fetch(endpoint, options);

      const result = await response.json();
      alert(`Is this your full name: ${JSON.stringify(result)}`);
    } catch (error: any) {
      alert(error?.message || "Something went wrong");
    } finally {
    }
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
          <form onSubmit={handleSubmit}>
            <label htmlFor="phrase">Phrase: </label>
            <input
              required
              maxLength={20}
              type="text"
              id="phrase"
              name="phrase"
            />
            <br />
            <br />
            <label htmlFor="name">Name: </label>
            <input type="text" id="name" name="name" />
            <br />
            <br />

            <ReCAPTCHA
              asyncScriptOnLoad={() => console.log("load")}
              sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY!}
              onChange={(code) =>
                testCaptcha(code, () => setCaptchaSolved(true))
              }
            />
            <br />

            <button type="submit" disabled={!captchaSolved}>
              Submit
            </button>
          </form>
        </div>
      </main>
    </>
  );
}
