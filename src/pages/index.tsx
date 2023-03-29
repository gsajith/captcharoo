import Head from "next/head";
import styles from "@/styles/Home.module.css";
import ReCAPTCHA from "react-google-recaptcha";
import { testCaptcha } from "@/utils";
import { createRef, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { AiFillLock } from "react-icons/ai";
import { useRouter } from "next/router";
import Toast from "@/components/Toast";
import { Transition } from "react-transition-group";

import localFont from "next/font/local";
const climateCrisis = localFont({ src: "../ClimateCrisis.ttf" });

const duration = 600;

const defaultStyle = {
  transition: `opacity ${
    duration / 4
  }ms ease-in-out, max-height ${duration}ms ease-in-out, padding ${duration}ms ease-in-out`,
  opacity: 0,
};

const transitionStyles = {
  entering: { opacity: 1 },
  entered: { opacity: 1 },
  exiting: { opacity: 0, maxHeight: 0, padding: 0 },
  exited: { opacity: 0, maxHeight: 0, padding: 0 },
};

export default function Home() {
  const [captchaLoaded, setCaptchaLoaded] = useState(false);
  const [captchaSolved, setCaptchaSolved] = useState(false);
  const [createdPhraseCode, setCreatedPhraseCode] = useState(null);
  const recaptcha = createRef<ReCAPTCHA>();
  const nodeRef = useRef(null);
  const router = useRouter();
  const [errorShown, setErrorShown] = useState(false);

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
      setCreatedPhraseCode(result.data[0].shortcode);
      // alert(`Is this your full name: ${JSON.stringify(result)}`);
    } catch (error: any) {
      alert(error?.message || "Something went wrong");
    } finally {
    }
  };

  const triggerError = () => {
    setErrorShown(true);
    setTimeout(() => {
      setErrorShown(false);
    }, 3000);
  };

  useEffect(() => {
    recaptcha?.current?.reset();
    if (router.query.error) {
      triggerError();
    }
  }, [router.query.error]);

  return (
    <>
      <Head>
        <title>Captcharoo</title>
        <meta name="description" content="Bot or not?" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />{" "}
      </Head>
      <main className={`${styles.main}`}>
        <Toast message={"Invalid link provided."} shown={errorShown} />
        <>
          <div className={styles.homePageContainer}>
            <div className={styles.titleContainer}>
              <div className={`${climateCrisis.className} ${styles.title}`}>
                {!createdPhraseCode
                  ? "Store your secret phrase"
                  : "Your phrase is stored"}
              </div>
            </div>

            <div className={styles.overlayWrapper}>
              <div
                className={styles.overlay}
                style={{
                  opacity: captchaLoaded ? 0 : 1,
                  pointerEvents: captchaLoaded ? "none" : "all",
                }}></div>
              <Transition
                nodeRef={nodeRef}
                in={!createdPhraseCode}
                timeout={duration}>
                {(state) => (
                  <form
                    ref={nodeRef}
                    style={{
                      ...defaultStyle,
                      ...transitionStyles[state],
                    }}
                    className={styles.formContainer}
                    onSubmit={handleSubmit}>
                    <input
                      className={styles.textField}
                      required
                      maxLength={20}
                      type="text"
                      id="phrase"
                      name="phrase"
                      placeholder="Your phrase"
                      autoComplete="off"
                    />
                    <input
                      className={styles.textField}
                      type="text"
                      id="name"
                      name="name"
                      placeholder="Your name (optional)"
                      autoComplete="off"
                    />

                    <ReCAPTCHA
                      ref={recaptcha}
                      asyncScriptOnLoad={() =>
                        setTimeout(() => {
                          setCaptchaLoaded(true);
                        }, 100)
                      }
                      sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY!}
                      onChange={(code) =>
                        testCaptcha(code, () => setCaptchaSolved(true))
                      }
                    />
                    <button
                      className={`${climateCrisis.className} ${styles.submitButton}`}
                      type="submit"
                      disabled={captchaSolved}>
                      <AiFillLock />
                      LOCK
                    </button>
                  </form>
                )}
              </Transition>
            </div>
            {createdPhraseCode && (
              <div className={styles.formContainer}>
                <Link href={"/" + createdPhraseCode}>Share this link.</Link>
              </div>
            )}
            <div className={styles.bottomContainer} />
          </div>
        </>
      </main>
    </>
  );
}
