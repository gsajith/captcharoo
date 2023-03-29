import styles from "@/styles/Toast.module.css";

type ToastProps = {
  message: string;
  shown: boolean;
};

const Toast = ({ message, shown }: ToastProps) => {
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
