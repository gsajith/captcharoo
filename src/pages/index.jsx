import localFont from "next/font/local";
import Head from "next/head";
import { useRouter } from "next/router";
import { useCallback, useEffect, useRef, useState } from "react";
import {
  AiFillLock,
  AiFillUnlock,
  AiOutlineCopy,
  AiOutlineRetweet,
} from "react-icons/ai";
import IconTextField from "../components/IconTextField";
import ReCaptcha from "../components/ReCaptcha";
import Slider from "../components/Slider";
import TextField from "../components/TextField";
import Toast from "../components/Toast";
import { EXPIRY_OPTIONS, MAX_INPUT_LENGTH, TOAST_TIMEOUT } from "../constants";
import styles from "../styles/Home.module.css";
import { randomSlug } from "../utils";
const climateCrisis = localFont({ src: "../ClimateCrisis.ttf" });

export default function Home() {
  const router = useRouter();
  const showToastRef = useRef();
  const [captchaSolved, setCaptchaSolved] = useState(false);
  const [createdPhraseCode, setCreatedPhraseCode] = useState(null);
  const [phraseValue, setPhraseValue] = useState("");
  const [nameValue, setNameValue] = useState("");
  const [expiryValue, setExpiryValue] = useState(2);
  const [toastShown, setToastShown] = useState(false);
  const [toastMessage, setToastMessage] = useState("");

  const handleSubmit = useCallback(
    async (event) => {
      event.preventDefault();
      try {
        const options = {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            phrase: phraseValue,
            name: nameValue,
          }),
        };
        const response = await fetch("/api/phrase/create", options);
        const result = await response.json();
        setCreatedPhraseCode(result.data[0].shortcode);
      } catch (error) {
        // TODO: Handle error
        triggerToast(error?.message || "Something went wrong");
      }
    },
    [phraseValue, nameValue]
  );

  const generateRandomPhrase = useCallback(() => {
    window.getSelection().removeAllRanges();
    setPhraseValue(randomSlug());
  }, []);

  const triggerToast = (message) => {
    clearTimeout(showToastRef.current);
    setToastMessage(message);
    setToastShown(true);
    showToastRef.current = setTimeout(() => {
      setToastShown(false);
    }, TOAST_TIMEOUT);
  };

  useEffect(() => {
    if (router.query.error) {
      triggerToast("Invalid link provided.");
      router.push("/");
    }
  }, [router, router.query.error]);

  return (
    <>
      <Head>
        <title>Captcharoo</title>
        <meta name="description" content="Bot or not?" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />{" "}
      </Head>
      <main className={styles.main}>
        <Toast message={toastMessage} shown={toastShown} />
        <div className={styles.homePageContainer}>
          <div className={styles.titleContainer}>
            <div className={`${climateCrisis.className} ${styles.title}`}>
              {!createdPhraseCode
                ? "Store your secret phrase"
                : "Your phrase is stored!"}
            </div>
          </div>
          {!createdPhraseCode ? (
            <div className={styles.formContainer}>
              <IconTextField
                icon={
                  <AiOutlineRetweet onClick={() => generateRandomPhrase()} />
                }
                name="phrase"
                placeholder="Your phrase"
                maxLength={MAX_INPUT_LENGTH}
                required
                value={phraseValue}
                onChange={(e) => setPhraseValue(e.target.value)}
              />
              <TextField
                name="name"
                placeholder="Your name (optional)"
                maxLength={MAX_INPUT_LENGTH}
                value={nameValue}
                onChange={(e) => setNameValue(e.target.value)}
              />
              <div className={styles.sliderContainer}>
                <div className={styles.sliderLabelContainer}>
                  <label htmlFor="expiry">Expires in:</label>
                  <span className={styles.sliderValue}>
                    {EXPIRY_OPTIONS[expiryValue].label}
                  </span>
                </div>
                <Slider
                  defaultValue={[expiryValue]}
                  max={EXPIRY_OPTIONS.length - 1}
                  min={0}
                  step={1}
                  aria-label={"Expires in"}
                  id="expiry"
                  onValueChange={(value) => setExpiryValue(value[0])}
                />
              </div>
              <ReCaptcha setSolved={setCaptchaSolved} />
            </div>
          ) : (
            <div className={styles.formContainer}>
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
                Send this link to anyone you want to unlock the secret phrase.
              </div>
            </div>
          )}
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
