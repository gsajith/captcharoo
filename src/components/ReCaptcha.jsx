import Image from "next/image";
import { useState } from "react";
import ReCAPTCHA from "react-google-recaptcha";
import styles from "../styles/Home.module.css";
import { testCaptcha } from "../utils";

const ReCaptcha = ({ setSolved }) => {
  const [captchaLoading, setCaptchaLoading] = useState(true);
  const [validating, setValidating] = useState(false);
  if (process.env.NODE_ENV === "development") {
    return <button onClick={() => setSolved(true)}>Bypass Captcha</button>;
  }
  return (
    <div className={styles.captchaContainer}>
      {captchaLoading && (
        <Image
          src="/recaptcha_placeholder.png"
          alt="Captcha"
          fill="true"
          style={{
            objectFit: "cover",
            objectPosition: "center",
            position: "absolute",
            top: 0,
            zIndex: 0,
          }}
        />
      )}
      {validating && (
        <div className={styles.captchaValidation}>
          Validating...
        </div>
      )}
      <ReCAPTCHA
        asyncScriptOnLoad={() =>
          setTimeout(() => setCaptchaLoading(false), 250)
        }
        sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY}
        onChange={(code) => {
          setValidating(true);
          testCaptcha(code, () => {
            setSolved(true);
            setValidating(false);
          });
        }}
      />
    </div>
  );
};

export default ReCaptcha;
