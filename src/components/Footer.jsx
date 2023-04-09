import Link from "next/link";
import { useRouter } from "next/router";
import { FONT_OUTFIT } from "../constants";
import styles from "../styles/Footer.module.css";
import About from "../widgets/About";
import PrivacyPolicy from "../widgets/PrivacyPolicy";

const Footer = ({ homeCallback, locked }) => {
  const router = useRouter();
  return (
    <>
      <div className={`${FONT_OUTFIT.className} ${styles.footerContainer}`}>
        <div className={styles.footer}>
          {router.pathname === "/" && locked && (
            <Link
              href="/"
              onClick={(e) => {
                e.preventDefault();
                homeCallback();
              }}>
              Home
            </Link>
          )}
          {router.pathname !== "/" && <Link href="/">Home</Link>}
          <About />
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
