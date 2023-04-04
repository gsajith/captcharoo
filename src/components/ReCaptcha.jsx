import ReCAPTCHA from "react-google-recaptcha";
import { testCaptcha } from "../utils";
import styles from "../styles/Home.module.css";
import Image from "next/image";
import { useState } from "react";

const ReCaptcha = ({ setSolved }) => {
  const [captchaLoading, setCaptchaLoading] = useState(true);
  // if (process.env.NODE_ENV === "development") {
  //   return <button onClick={() => setSolved(true)}>Bypass Captcha</button>;
  // }
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
      <ReCAPTCHA
        asyncScriptOnLoad={() =>
          setTimeout(() => setCaptchaLoading(false), 250)
        }
        sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY}
        onChange={(code) => testCaptcha(code, () => setSolved(true))}
      />
    </div>
  );
};

export default ReCaptcha;
