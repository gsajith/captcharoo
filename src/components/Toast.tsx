import styles from "@/styles/Toast.module.css";

type ToastProps = {
  message: string;
  shown: boolean;
};

const Toast = ({ message, shown }: ToastProps) => {
  return (
    <div
      className={styles.toastContainer}
      style={{ bottom: shown ? "3rem" : "-200px" }}>
      <b>Error:</b> {message}
    </div>
  );
};

export default Toast;
