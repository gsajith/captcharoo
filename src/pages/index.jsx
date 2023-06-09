import { useRouter } from "next/router";
import { useCallback, useEffect, useRef, useState } from "react";
import {
  AiFillLock,
  AiFillUnlock,
  AiOutlineCopy,
  AiOutlineRetweet,
} from "react-icons/ai";
import Footer from "../components/Footer";
import IconTextField from "../components/IconTextField";
import ReCaptcha from "../components/ReCaptcha";
import Slider from "../components/Slider";
import TextField from "../components/TextField";
import Toast from "../components/Toast";
import {
  EXPIRY_OPTIONS,
  FONT_CLIMATE_CRISIS,
  MAX_INPUT_LENGTH,
  TOAST_TIMEOUT,
} from "../constants";
import styles from "../styles/Home.module.css";
import { randomSlug } from "../utils";
import Link from "next/link";

export default function Home() {
  const router = useRouter();
  const showToastRef = useRef();
  const [solved, setSolved] = useState(false);
  const [createdPhraseCode, setCreatedPhraseCode] = useState(null);
  const [phraseValue, setPhraseValue] = useState("");
  const [nameValue, setNameValue] = useState("");
  const [expiryValue, setExpiryValue] = useState(2);
  const [toastShown, setToastShown] = useState(false);
  const [toastMessage, setToastMessage] = useState("");

  // Create the phrase in the backend
  const lockPhrase = useCallback(
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
            ttl: EXPIRY_OPTIONS[expiryValue].ms,
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
    [phraseValue, nameValue, expiryValue]
  );

  // Clear window selection and set random phrase
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

  const resetPage = () => {
    setSolved(false);
    setPhraseValue("");
    setNameValue("");
    setExpiryValue(2);
    setCreatedPhraseCode(null);
  };

  // Backup error state if invalid link hit
  // This should normally be handled in [shortcode].jsx
  useEffect(() => {
    if (router.query.error) {
      triggerToast("Invalid link provided.");
      router.push("/");
    }
  }, [router, router.query.error]);

  return (
    <>
      <main
        className={`${styles.main} ${createdPhraseCode ? styles.locked : ""}`}>
        <Toast message={toastMessage} shown={toastShown} />
        <div className={styles.homePageContainer}>
          <div className={styles.titleContainer}>
            <div className={`${styles.title}`}>
              {!createdPhraseCode
                ? "Lock your secret phrase"
                : "Your phrase is locked!"}
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
              <ReCaptcha setSolved={setSolved} />
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
              className={`${FONT_CLIMATE_CRISIS.className} ${styles.submitButton}`}>
              <AiFillLock />
              LOCKED
            </div>
          ) : (
            <button
              className={`${FONT_CLIMATE_CRISIS.className} ${styles.submitButton}`}
              onClick={lockPhrase}
              disabled={!solved || phraseValue.length === 0}>
              <AiFillUnlock className={styles.unlock} />
              <AiFillLock className={styles.lock} />
              LOCK
            </button>
          )}
        </div>
        {createdPhraseCode !== null && (
          <div style={{ marginTop: 16, cursor: "pointer", color: "var(--primary)" }}>
            <a onClick={resetPage}>&larr; Go back</a>
          </div>
        )}
      </main>

      <Footer homeCallback={resetPage} locked={createdPhraseCode !== null} />
    </>
  );
}
