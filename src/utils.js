import { generateSlug } from "random-word-slugs";
import { customAlphabet } from "nanoid";
const nanoid = customAlphabet("1234567890abcdefghijklmnopqrstuvwxyz", 10);

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
    // TODO: Handle error
    alert(error?.message || "Something went wrong");
  } finally {
  }

  console.log("Captcha value:", captchaCode);
};

export const randomSlug = () => {
  return generateSlug(3, {
    format: "kebab",
    partsOfSpeech: ["adjective", "adjective", "noun"],
    categories: {
      adjective: [
        "condition",
        "personality",
        "quantity",
        "taste",
        "sounds",
        "time",
        "color",
        "touch",
        "appearance",
        "shapes",
        "size",
      ],
      noun: ["food", "animals"]
    },
  });
};

export default generateShortcode;
