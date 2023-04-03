import localFont from "next/font/local";
import { AiFillExclamationCircle } from "react-icons/ai";
import styles from "../styles/Home.module.css";
const climateCrisis = localFont({ src: "../ClimateCrisis.ttf" });

const Expired = ({ name }) => {
  return (
    <>
      <div className={styles.titleContainer}>
        <div className={`${climateCrisis.className} ${styles.title}`}>
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
        className={`${climateCrisis.className} ${styles.submitButton} ${styles.noInteract}`}>
        <AiFillExclamationCircle /> {"EXPIRED"}
      </div>
    </>
  );
};

export default Expired;
