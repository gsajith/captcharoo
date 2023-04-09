import { AiFillCloseCircle } from "react-icons/ai";
import * as DialogBase from "@radix-ui/react-dialog";
import styles from "../styles/Dialog.module.css";
import { FONT_OUTFIT } from "../constants";

const Dialog = ({ title, message, buttonText }) => {
  return (
    <DialogBase.Root>
      <DialogBase.Portal>
        <DialogBase.Overlay className={styles.dialogOverlay} />
        <DialogBase.Content className={styles.dialogContent}>
          <DialogBase.Title
            className={`${styles.dialogTitle} ${FONT_OUTFIT.className}`}>
            <div className={styles.dialogTitleText}>{title}</div>
            <DialogBase.Close asChild>
              <button className={styles.dialogTitleButton} aria-label="Close">
                <AiFillCloseCircle />
              </button>
            </DialogBase.Close>
          </DialogBase.Title>
          <DialogBase.Description
            className={`${styles.dialogDescription} ${FONT_OUTFIT.className}`}>
            {message}
          </DialogBase.Description>
        </DialogBase.Content>
      </DialogBase.Portal>
      <DialogBase.Trigger asChild>
        <button className={`${styles.fakeLink} ${FONT_OUTFIT.className}`}>
          {buttonText}
        </button>
      </DialogBase.Trigger>
    </DialogBase.Root>
  );
};

export default Dialog;
