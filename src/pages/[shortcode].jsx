import localFont from "next/font/local";
import Head from "next/head";
import { useRouter } from "next/router";
import { useCallback, useEffect, useRef, useState } from "react";
import { AiFillLock, AiFillUnlock, AiOutlineCopy } from "react-icons/ai";
import ReCaptcha from "../components/ReCaptcha";
import Toast from "../components/Toast";
import { TOAST_TIMEOUT } from "../constants";
import styles from "../styles/Home.module.css";
const climateCrisis = localFont({ src: "../ClimateCrisis.ttf" });

const CaptchaPage = (props) => {
  const router = useRouter();
  const { shortcode } = router.query;
  const showToastRef = useRef();

  const [phrase, setPhrase] = useState(null);
  const [name, setName] = useState(null);
  const [captchaSolved, setCaptchaSolved] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [toastShown, setToastShown] = useState(false);

  const title = `Captcharoo${
    props.name && props.name.length > 0 && " from " + props.name
  }`;

  const triggerToast = (message) => {
    clearTimeout(showToastRef.current);
    setToastMessage(message);
    setToastShown(true);
    showToastRef.current = setTimeout(() => {
      setToastShown(false);
    }, TOAST_TIMEOUT);
  };

  const fetchRow = useCallback(async () => {
    try {
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
      const response = await fetch("/api/phrase/get", options);
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
    }
  }, [shortcode, captchaSolved, router]);

  // Already fetching initial data in getServerSideProps, so just
  // fetch the row if the captcha is solved to get the phrase
  useEffect(() => {
    if (captchaSolved) {
      fetchRow();
    }
  }, [captchaSolved, fetchRow]);

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content="Bot or not?" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <Toast message={toastMessage} shown={toastShown} />
        <div className={styles.homePageContainer}>
          <div
            className={styles.titleContainer}
            style={
              captchaSolved
                ? { backgroundColor: "#42DB75", color: "black" }
                : {}
            }>
            <div className={`${climateCrisis.className} ${styles.title}`}>
              {captchaSolved
                ? "Congrats! This is the phrase:"
                : "Unlock the secret phrase"}
            </div>
          </div>
          <div className={styles.formContainer}>
            {!captchaSolved ? (
              <>
                <div className={styles.sans}>
                  Solve the captcha below to reveal the secret phrase
                  {name ? (
                    <>
                      {" "}
                      from <b>{name}</b>
                    </>
                  ) : (
                    <></>
                  )}
                  .
                </div>
                <ReCaptcha setSolved={setCaptchaSolved} />
              </>
            ) : (
              <>
                <button
                  tabindex={0}
                  className={`${styles.linkContainer} ${
                    captchaSolved && styles.solved
                  }`}
                  onClick={() => {
                    if (phrase) {
                      navigator.clipboard.writeText(phrase);
                      triggerToast("Phrase copied!");
                    }
                  }}>
                  <div>{phrase}</div>
                  <div className={styles.linkButton}>
                    <AiOutlineCopy />
                  </div>
                </button>
                <div className={styles.sans}>
                  Share this phrase back to
                  {name ? (
                    <>
                      {" "}
                      <b>{name}</b>
                    </>
                  ) : (
                    <> whoever sent this captcha to you</>
                  )}
                  .
                </div>
              </>
            )}
          </div>
          <div
            className={`${climateCrisis.className} ${styles.submitButton} ${styles.noInteract}`}
            style={
              captchaSolved
                ? { backgroundColor: "#42DB75", color: "black" }
                : {}
            }>
            {!captchaSolved ? (
              <>
                <AiFillLock /> {"LOCKED"}
              </>
            ) : (
              <>
                <AiFillUnlock /> {"SOLVED!"}
              </>
            )}
          </div>
        </div>
      </main>
    </>
  );
};

export const getServerSideProps = async ({ params }) => {
  try {
    const dev = process.env.NODE_ENV !== "production";
    const server = dev
      ? "http://localhost:3000"
      : "https://captcharoo.vercel.app";
    const endpoint = server + "/api/phrase/get";

    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        shortcode: params.shortcode,
        includePhrase: false,
      }),
    };

    const response = await fetch(endpoint, options);
    const result = await response.json();

    if (response.ok) {
      return {
        props: { name: result.data.name },
      };
    } else {
      return {
        props: {},
      };
    }
  } catch (error) {
    return {
      props: {},
    };
  }
};

export default CaptchaPage;
