import * as DialogBase from "@radix-ui/react-dialog";
import { AiFillCloseCircle } from "react-icons/ai";
import styles from "../styles/Dialog.module.css";

const Dialog = ({ title, message, buttonText }) => {
  return (
    <DialogBase.Root>
      <DialogBase.Portal>
        <DialogBase.Overlay className={styles.dialogOverlay} />
        <DialogBase.Content className={styles.dialogContent}>
          <DialogBase.Title className={styles.dialogTitle}>
            <div className={styles.dialogTitleText}>{title}</div>
            <DialogBase.Close asChild>
              <button className={styles.dialogTitleButton} aria-label="Close">
                <AiFillCloseCircle />
              </button>
            </DialogBase.Close>
          </DialogBase.Title>
          <DialogBase.Description className={styles.dialogDescription}>
            {message}
          </DialogBase.Description>
        </DialogBase.Content>
      </DialogBase.Portal>
      <DialogBase.Trigger asChild>
        <button className={styles.fakeLink}>{buttonText}</button>
      </DialogBase.Trigger>
    </DialogBase.Root>
  );
};

export default Dialog;
