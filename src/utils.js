import { customAlphabet } from "nanoid";
const nanoid = customAlphabet("1234567890abcdef", 10);

export const generateShortcode = () => {
  return nanoid(6);
};

export default generateShortcode;
