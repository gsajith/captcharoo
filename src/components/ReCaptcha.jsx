import ReCAPTCHA from "react-google-recaptcha";
import { testCaptcha } from "../utils";

const ReCaptcha = ({ setSolved }) => {
  if (process.env.NODE_ENV === "development") {
    return <button onClick={() => setSolved(true)}>Bypass Captcha</button>;
  }
  return (
    <ReCAPTCHA
      sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY}
      onChange={(code) => testCaptcha(code, () => setSolved(true))}
    />
  );
};

export default ReCaptcha;
