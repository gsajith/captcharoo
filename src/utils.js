import { customAlphabet } from "nanoid";
const nanoid = customAlphabet("1234567890abcdef", 10);

export const generateShortcode = () => {
  return nanoid(6);
};

export const testCaptcha = async (captchaCode, callback) => {
  if (!captchaCode) {
    return;
  }
  try {
    const response = await fetch("/api/testCaptcha", {
      method: "POST",
      body: JSON.stringify({ captcha: captchaCode }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (response.ok) {
      callback();
    } else {
      // Else throw an error with the message returned
      // from the API
      const error = await response.json();
      throw new Error(error.message);
    }
  } catch (error) {
    alert(error?.message || "Something went wrong");
  } finally {
    // Reset the reCAPTCHA when the request has failed or succeeeded
    // so that it can be executed again if user submits another email.
    // recaptchaRef.current?.reset();
  }

  console.log("Captcha value:", captchaCode);
};

export default generateShortcode;
