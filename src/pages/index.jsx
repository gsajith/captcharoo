import { testCaptcha } from "../utils";
import Head from "next/head";
import { useRouter } from "next/router";
import { useCallback, useEffect, useRef, useState } from "react";
import ReCAPTCHA from "react-google-recaptcha";
import { AiFillLock, AiFillUnlock, AiOutlineCopy } from "react-icons/ai";
import { Transition } from "react-transition-group";
import Toast from "../components/Toast";
import styles from "../styles/Home.module.css";

import localFont from "next/font/local";
import TextField from "../components/TextField";
const climateCrisis = localFont({ src: "../ClimateCrisis.ttf" });

const transitionStyles = {
  entering: { opacity: 1 },
  entered: { opacity: 1 },
  exiting: { opacity: 0, maxHeight: 0, padding: 0 },
  exited: { opacity: 0, maxHeight: 0, padding: 0 },
};

export default function Home() {
  const [captchaLoaded, setCaptchaLoaded] = useState(false);
  const [captchaSolved, setCaptchaSolved] = useState(false);
  const [phraseValue, setPhraseValue] = useState("");
  const [nameValue, setNameValue] = useState("");
  const [createdPhraseCode, setCreatedPhraseCode] = useState(null);
  const nodeRef = useRef(null);
  const router = useRouter();
  const showToastRef = useRef();
  const [toastShown, setToastShown] = useState(false);
  const [toastMessage, setToastMessage] = useState("");

  const handleSubmit = useCallback(
    async (event) => {
      try {
        event.preventDefault();

        const data = {
          phrase: phraseValue,
          name: nameValue,
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
      } catch (error) {
        alert(error?.message || "Something went wrong");
      } finally {
      }
    },
    [phraseValue, nameValue]
  );

  const triggerError = () => {
    clearTimeout(showToastRef.current);
    setToastMessage("Invalid link provided.");
    setToastShown(true);
    showToastRef.current = setTimeout(() => {
      setToastShown(false);
    }, 3000);
  };

  const triggerCopied = () => {
    clearTimeout(showToastRef.current);
    setToastMessage("Link copied!");
    setToastShown(true);
    showToastRef.current = setTimeout(() => {
      setToastShown(false);
    }, 3000);
  };

  useEffect(() => {
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
        <Toast message={toastMessage} shown={toastShown} />
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
                timeout={600}>
                {(state) => (
                  <div
                    ref={nodeRef}
                    style={{
                      ...transitionStyles[state],
                    }}
                    className={styles.formContainer}>
                    <TextField
                      name="phrase"
                      placeholder="Your phrase"
                      maxLength={20}
                      required
                      value={phraseValue}
                      onChange={(e) => setPhraseValue(e.target.value)}
                    />
                    <TextField
                      name="name"
                      placeholder="Your name (optional)"
                      maxLength={40}
                      value={nameValue}
                      onChange={(e) => setNameValue(e.target.value)}
                    />

                    <ReCAPTCHA
                      asyncScriptOnLoad={() =>
                        setTimeout(() => {
                          setCaptchaLoaded(true);
                        }, 100)
                      }
                      sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY}
                      onChange={(code) =>
                        testCaptcha(code, () => setCaptchaSolved(true))
                      }
                    />
                  </div>
                )}
              </Transition>
            </div>
            {createdPhraseCode && (
              <div className={styles.formContainer}>
                <div
                  className={styles.linkContainer}
                  onClick={() => {
                    navigator.clipboard.writeText(
                      window.location.href + "" + createdPhraseCode
                    );
                    triggerCopied();
                  }}>
                  <div>{window.location.href + "" + createdPhraseCode}</div>
                  <div className={styles.linkButton}>
                    <AiOutlineCopy />
                  </div>
                </div>
              </div>
            )}
            <button
              className={`${climateCrisis.className} ${styles.submitButton} ${
                createdPhraseCode && styles.noInteract
              }`}
              onClick={handleSubmit}
              disabled={!captchaSolved}>
              {!createdPhraseCode ? (
                <>
                  <AiFillUnlock className={styles.unlock} />
                  <AiFillLock className={styles.lock} />
                  LOCK
                </>
              ) : (
                <>
                  <AiFillLock />
                  LOCKED
                </>
              )}
            </button>
          </div>
        </>
      </main>
    </>
  );
}
