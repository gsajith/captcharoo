import { AiFillExclamationCircle } from "react-icons/ai";
import styles from "../styles/Home.module.css";
import { FONT_CLIMATE_CRISIS, FONT_OUTFIT } from "../constants";

const Expired = ({ name }) => {
  return (
    <>
      <div className={styles.titleContainer}>
        <div className={`${FONT_OUTFIT.className} ${styles.title}`}>
          This captcha has expired.
        </div>
      </div>
      <div className={styles.formContainer}>
        <div>
          Please ask
          {name ? (
            <>
              {" "}
              <b>{name} </b>
            </>
          ) : (
            <> whoever sent this captcha to you </>
          )}
          to send a new one.
        </div>
      </div>
      <div
        className={`${FONT_CLIMATE_CRISIS.className} ${styles.submitButton} ${styles.noInteract}`}>
        <AiFillExclamationCircle /> {"EXPIRED"}
      </div>
    </>
  );
};

export default Expired;
