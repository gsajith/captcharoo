import localFont from "next/font/local";
import Head from "next/head";
import { useRouter } from "next/router";
import { useCallback, useEffect, useRef, useState } from "react";
import ReCAPTCHA from "react-google-recaptcha";
import {
  AiFillLock,
  AiFillUnlock,
  AiOutlineCopy,
  AiOutlineRetweet
} from "react-icons/ai";
import IconTextField from "../components/IconTextField";
import Slider from "../components/Slider";
import TextField from "../components/TextField";
import Toast from "../components/Toast";
import styles from "../styles/Home.module.css";
import { randomSlug, testCaptcha } from "../utils";
const climateCrisis = localFont({ src: "../ClimateCrisis.ttf" });

const EXPIRY = [
  { label: "1 hour", value: 60 * 60 },
  { label: "6 hours", value: 60 * 60 * 6 },
  { label: "12 hours", value: 60 * 60 * 12 },
  { label: "24 hours", value: 60 * 60 * 24 },
  { label: "48 hours", value: 60 * 60 * 48 },
  { label: "1 week", value: 60 * 60 * 24 * 7 },
  { label: "1 month", value: 60 * 60 * 24 * 30 }
]

export default function Home() {
  const router = useRouter();
  const showToastRef = useRef();
  const [captchaSolved, setCaptchaSolved] = useState(false);
  const [createdPhraseCode, setCreatedPhraseCode] = useState(false);
  const [phraseValue, setPhraseValue] = useState("");
  const [nameValue, setNameValue] = useState("");
  const [expiryValue, setExpiryValue] = useState(2);
  const [toastShown, setToastShown] = useState(false);
  const [toastMessage, setToastMessage] = useState("");

  const handleSubmit = useCallback(
    async (event) => {
      event.preventDefault();
      try {
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
                : "Your phrase is stored!"}
            </div>
          </div>
          {!createdPhraseCode ?
            <div
              className={styles.formContainer}>
              <IconTextField
                icon={
                  <AiOutlineRetweet
                    onClick={() => {
                      window.getSelection().removeAllRanges();
                      setPhraseValue(randomSlug());
                    }}
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
              <div className={styles.sliderContainer}>
                <div className={styles.sliderLabelContainer}>
                  <label for="expiry">Expires in:</label>
                  <span className={styles.sliderValue}>{EXPIRY[expiryValue].label}</span>
                </div>
                <Slider
                  defaultValue={[expiryValue]}
                  max={EXPIRY.length - 1}
                  min={0}
                  step={1}
                  aria-label={"Expires in"}
                  id="expiry"
                  onValueChange={(value) => setExpiryValue(value[0])}
                />
              </div>
              <ReCAPTCHA
                asyncScriptOnLoad={() => console.log("Captcha loaded")}
                sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY}
                onChange={(code) =>
                  testCaptcha(code, () => setCaptchaSolved(true))
                }
              />
            </div> :
            <div
              className={styles.formContainer}>
              <button
                className={styles.linkContainer}
                onClick={() => {
                  navigator.clipboard.writeText(
                    window.location.href + "" + createdPhraseCode
                  );
                  triggerToast("Link copied!");
                }}>
                <div className={styles.linkText}>
                  {window.location.href + "" + createdPhraseCode}
                </div>
                <div className={styles.linkButton}>
                  <AiOutlineCopy />
                </div>
              </button>

              <div className={styles.sans}>
                Send this link to anyone you want to unlock the secret
                phrase.
              </div>
            </div>
          }
          {createdPhraseCode ? (
            <div
              className={`${climateCrisis.className} ${styles.submitButton} ${styles.noInteract}`}>
              <AiFillLock />
              LOCKED
            </div>
          ) : (
            <button
              className={`${climateCrisis.className} ${styles.submitButton}`}
              onClick={handleSubmit}
              disabled={!captchaSolved}>
              <AiFillUnlock className={styles.unlock} />
              <AiFillLock className={styles.lock} />
              LOCK
            </button>
          )}
        </div>
      </main>
    </>
  );
}
