import Head from "next/head";
import { useRouter } from "next/router";
import { useCallback, useEffect, useRef, useState } from "react";
import { AiFillLock, AiFillUnlock, AiOutlineCopy } from "react-icons/ai";
import Expired from "../components/Expired";
import ReCaptcha from "../components/ReCaptcha";
import Toast from "../components/Toast";
import { FONT_CLIMATE_CRISIS, FONT_OUTFIT, TOAST_TIMEOUT } from "../constants";
import styles from "../styles/Home.module.css";

const CaptchaPage = (props) => {
  const router = useRouter();
  const { shortcode } = router.query;
  const showToastRef = useRef();

  const [phrase, setPhrase] = useState(null);
  const [name, setName] = useState(props.name);
  const [solvedCaptcha, setSolvedCaptcha] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [toastShown, setToastShown] = useState(false);

  const showSolved = solvedCaptcha && phrase && phrase.length > 0;

  const title = `Captcharoo${
    props.name && props.name.length > 0 && " from " + props.name
  }`;

  const description =
    props.name && props.name.length > 0
      ? `${props.name} has sent you a Captcharoo!`
      : "Someone has sent you a Captcharoo!";

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
          includePhrase: solvedCaptcha,
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
      // TODO: Handle error
      triggerToast(error?.message || "Something went wrong");
    }
  }, [shortcode, solvedCaptcha, router]);

  // Already fetching initial data in getServerSideProps, so just
  // fetch the row if the captcha is solved to get the phrase
  useEffect(() => {
    if (solvedCaptcha) {
      fetchRow();
    }
  }, [solvedCaptcha, fetchRow]);

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="og:title" content={title} />
        <meta name="twitter:title" content={title} />
        <meta name="description" content={description} />
        <meta name="og:description" content={description} />
        <meta
          name="twitter:image"
          content="https://captcharoo.vercel.app/share_preview.png"
        />
        <meta
          name="og:image"
          content="https://captcharoo.vercel.app/share_preview.png"
        />
      </Head>
      <main className={`${styles.main} ${showSolved ? styles.solved : ""}`}>
        <Toast message={toastMessage} shown={toastShown} />
        <div className={styles.homePageContainer}>
          {props.expired ? (
            <Expired name={name} />
          ) : (
            <>
              <div className={styles.titleContainer}>
                <div className={`${FONT_OUTFIT.className} ${styles.title}`}>
                  {showSolved
                    ? "Congrats! The phrase is:"
                    : "Reveal the secret phrase"}
                </div>
              </div>
              <div className={styles.formContainer}>
                {!showSolved ? (
                  <>
                    <div>
                      Solve the Captcha below to reveal the secret phrase
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
                    <ReCaptcha setSolved={setSolvedCaptcha} />
                  </>
                ) : (
                  <>
                    <button
                      tabindex={0}
                      className={`${styles.linkContainer}`}
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
                        <> whoever sent this Captcha to you</>
                      )}
                      .
                    </div>
                  </>
                )}
              </div>
              <div
                className={`${FONT_CLIMATE_CRISIS.className} ${styles.submitButton} ${styles.noInteract}`}>
                {!showSolved ? (
                  <>
                    <AiFillLock /> {"LOCKED"}
                  </>
                ) : (
                  <>
                    <AiFillUnlock /> {"SOLVED!"}
                  </>
                )}
              </div>
            </>
          )}
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

    if (!result.data.inserted_at || !result.data.ttl) {
      return {
        props: { name: result.data.name, expired: true },
      };
    }

    const inserted_at_ms = new Date(result.data.inserted_at).getTime();
    if (inserted_at_ms + result.data.ttl < Date.now()) {
      return {
        props: { name: result.data.name, expired: true },
      };
    }

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
