import Link from "next/link";
import { FONT_OUTFIT } from "../constants";
import styles from "../styles/Footer.module.css";
import Dialog from "./Dialog";
import PrivacyPolicy from "./PrivacyPolicy";

const Footer = () => {
  return (
    <>
      <div className={`${FONT_OUTFIT.className} ${styles.footerContainer}`}>
        <div className={styles.footer}>
          <Link href="/">Home</Link>
          <Dialog title="About" message="About text" buttonText="About" />
          <PrivacyPolicy />
          <a
            target="_blank"
            href="https://github.com/gsajith/captcharoo"
            rel="noopener noreferrer">
            Github
          </a>
          <div>
            <span className={styles.footerText}>Made with 😡 by </span>
            <a
              target="_blank"
              href="https://twitter.com/GuamHat"
              rel="noopener noreferrer">
              @GuamHat
            </a>
          </div>
        </div>
      </div>
    </>
  );
};

export default Footer;
