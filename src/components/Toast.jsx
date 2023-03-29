import styles from "../styles/Toast.module.css";

const Toast = ({ message, shown }) => {
  const fullMessage = message.includes("Invalid") ? (
    <>
      <b>Error:</b> {message}
    </>
  ) : (
    <>{message}</>
  );
  return (
    <div
      className={styles.toastContainer}
      style={{ bottom: shown ? "3rem" : "-200px" }}>
      {fullMessage}
    </div>
  );
};

export default Toast;
