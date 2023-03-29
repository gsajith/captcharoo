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
      const error = await response.json();
      throw new Error(error.message);
    }
  } catch (error) {
    alert(error?.message || "Something went wrong");
  } finally {
  }

  console.log("Captcha value:", captchaCode);
};

export default generateShortcode;
