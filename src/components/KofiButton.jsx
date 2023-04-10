import Image from "next/image";
import styles from "../styles/KofiButton.module.css";
import { FONT_OUTFIT } from "../constants";

const KofiButton = ({
  message = "Buy me a coffee",
  username = "gsajith",
  className,
  ...otherProps
}) => {
  return (
    <a
      target="_blank"
      rel="noopener noreferrer"
      href={`https://ko-fi.com/${username}`}
      className={`${styles.buttonContainer} ${FONT_OUTFIT.className} ${className}`}
      {...otherProps}>
      <Image
        src="https://storage.ko-fi.com/cdn/cup-border.png"
        alt="Kofi"
        width={24}
        height={14}
      />
      {message}
    </a>
  );
};

export default KofiButton;
