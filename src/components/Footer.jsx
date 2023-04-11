import Link from "next/link";
import { useRouter } from "next/router";
import styles from "../styles/Footer.module.css";
import About from "../widgets/About";
import PrivacyPolicy from "../widgets/PrivacyPolicy";
import KofiButton from "./KofiButton";
import SvgLogoComponent from "../assets/SvgLogoComponent";
import homeStyles from "../styles/Home.module.css";

const Footer = ({ homeCallback, locked, solved }) => {
  const router = useRouter();
  return (
    <div className={`${styles.footerContainer} ${locked ? homeStyles.locked : ""} ${solved ? homeStyles.solved : ""}`}>
      <SvgLogoComponent style={{ marginBottom: 12, fill: "var(--primary)" }} />
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
        {/* <KofiButton /> */}
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
  );
};

export default Footer;
