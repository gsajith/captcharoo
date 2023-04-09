import Link from "next/link";
import { FONT_OUTFIT } from "../constants";
import styles from "../styles/Footer.module.css";
import { useCallback, useState } from "react";
import { AiFillCloseCircle } from "react-icons/ai";
import * as Dialog from '@radix-ui/react-dialog';


const Footer = () => {
  const [showModal, setShowModal] = useState(false);
  const [modalTitle, setModalTitle] = useState("ABOUT");
  const [modalMessage, setModalMessage] = useState("About message ajsldjkflsjdflk");

  const showAboutPage = useCallback(() => {
    setModalTitle("ABOUT");
    setModalMessage("About emssage");
    setShowModal(true);
  }, []);

  return (
    <>
      {showModal && (
        <div className={`${FONT_OUTFIT.className} ${styles.modalContainer}`}>
          <div aria-modal aria-hidden tabIndex={-1} role="dialog" className={styles.modal}>
            <div className={`${styles.modalTitle}`}>
              <div className={styles.modalTitleText}>
                {modalTitle}
              </div>
              <button tabIndex="-1" className={styles.modalTitleButton} onClick={() => setShowModal(false)}>
                <AiFillCloseCircle />
              </button>
            </div>
            <div className={styles.modalMessage}>
              {modalMessage}
            </div>
          </div>
        </div>
      )}
      <Dialog.Root>
        <Dialog.Portal>
          <Dialog.Overlay className={styles.dialogOverlay} />
          <Dialog.Content className={styles.dialogContent}>
            <Dialog.Title className={styles.dialogTitle}>
              <div className={styles.dialogTitleText}>
                Edit profile
              </div>
              <Dialog.Close asChild>
                <button className="IconButton" aria-label="Close">
                  <AiFillCloseCircle />
                </button>
              </Dialog.Close>
            </Dialog.Title>
            <Dialog.Description className={styles.dialogDescription}>
              Make changes to your profile here. Click save when youre done.
            </Dialog.Description>
          </Dialog.Content>
        </Dialog.Portal>
        <div className={`${FONT_OUTFIT.className} ${styles.footerContainer}`}>
          <div className={styles.footer}>
            <Link href="/">Home</Link>
            <Dialog.Trigger asChild>
              <button className={`${styles.fakeLink} ${FONT_OUTFIT.className}`}>About</button>
            </Dialog.Trigger>
            <Link href="/">Privacy</Link>
            <a target="_blank" href="https://github.com/gsajith/captcharoo" rel="noopener noreferrer">Github</a>
            <div>Made with 😡 by <a target="_blank" href="https://twitter.com/GuamHat" rel="noopener noreferrer">@GuamHat</a></div>
          </div>
        </div>

      </Dialog.Root>
    </>);
}

export default Footer;
