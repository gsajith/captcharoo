import { AiFillExclamationCircle } from "react-icons/ai";
import { FONT_CLIMATE_CRISIS, FONT_OUTFIT } from "../constants";
import styles from "../styles/Home.module.css";

const ErrorPage = ({ title, message, endText }) => {
  return (
    <>
      <div className={styles.titleContainer}>
        <div className={`${FONT_OUTFIT.className} ${styles.title}`}>
          {title}
        </div>
      </div>
      <div className={styles.formContainer}>
        {message}
      </div>
      <div className={`${FONT_CLIMATE_CRISIS.className} ${styles.submitButton}`}>
        <AiFillExclamationCircle /> {endText}
      </div>
    </>
  );
};

export default ErrorPage;
