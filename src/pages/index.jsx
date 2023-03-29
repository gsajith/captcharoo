import localFont from "next/font/local";
import Head from "next/head";
import { useRouter } from "next/router";
import { useCallback, useEffect, useRef, useState } from "react";
import ReCAPTCHA from "react-google-recaptcha";
import {
  AiFillLock,
  AiFillUnlock,
  AiOutlineCopy,
  AiOutlineRetweet,
} from "react-icons/ai";
import { Transition } from "react-transition-group";
import IconTextField from "../components/IconTextField";
import TextField from "../components/TextField";
import Toast from "../components/Toast";
import styles from "../styles/Home.module.css";
import { randomSlug, testCaptcha } from "../utils";
const climateCrisis = localFont({ src: "../ClimateCrisis.ttf" });

const transitionStyles = {
  entering: { opacity: 1 },
  entered: { opacity: 1 },
  exiting: { opacity: 0, maxHeight: 0, padding: 0 },
  exited: { opacity: 0, maxHeight: 0, padding: 0 },
};

export default function Home() {
  const router = useRouter();
  const nodeRef = useRef();
  const showToastRef = useRef();
  const [captchaSolved, setCaptchaSolved] = useState(false);
  const [createdPhraseCode, setCreatedPhraseCode] = useState(false);
  const [phraseValue, setPhraseValue] = useState("");
  const [nameValue, setNameValue] = useState("");
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

  const triggerToast = (message) => {
    clearTimeout(showToastRef.current);
    setToastMessage(message);
    setToastShown(true);
    showToastRef.current = setTimeout(() => {
      setToastShown(false);
    }, 3000);
  };

  useEffect(() => {
    if (router.query.error) {
      triggerToast("Invalid link provided.");
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
        <div className={styles.homePageContainer}>
          <div className={styles.titleContainer}>
            <div className={`${climateCrisis.className} ${styles.title}`}>
              {!createdPhraseCode
                ? "Store your secret phrase"
                : "Your phrase is stored"}
            </div>
          </div>

          <Transition nodeRef={nodeRef} in={!createdPhraseCode} timeout={600}>
            {(state) => (
              <div
                ref={nodeRef}
                style={{
                  ...transitionStyles[state],
                }}
                className={styles.formContainer}>
                <IconTextField
                  icon={
                    <AiOutlineRetweet
                      onClick={() => setPhraseValue(randomSlug())}
                    />
                  }
                  name="phrase"
                  placeholder="Your phrase"
                  maxLength={40}
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
                  asyncScriptOnLoad={() => console.log("Captcha loaded")}
                  sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY}
                  onChange={(code) =>
                    testCaptcha(code, () => setCaptchaSolved(true))
                  }
                />
              </div>
            )}
          </Transition>
          <Transition nodeRef={nodeRef} in={createdPhraseCode} timeout={600}>
            {(state) =>
              createdPhraseCode && (
                <div
                  ref={nodeRef}
                  style={{
                    ...transitionStyles[state],
                  }}
                  className={styles.formContainer}>
                  <div
                    className={styles.linkContainer}
                    onClick={() => {
                      navigator.clipboard.writeText(
                        window.location.href + "" + createdPhraseCode
                      );
                      triggerToast("Link copied!");
                    }}>
                    <div>{window.location.href + "" + createdPhraseCode}</div>
                    <div className={styles.linkButton}>
                      <AiOutlineCopy />
                    </div>
                  </div>
                </div>
              )
            }
          </Transition>
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
      </main>
    </>
  );
}
