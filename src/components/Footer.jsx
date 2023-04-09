import Link from "next/link";
import { FONT_OUTFIT } from "../constants";
import styles from "../styles/Footer.module.css";

const Footer = () => {
  return <div className={`${FONT_OUTFIT.className} ${styles.footerContainer}`}>
    <div className={styles.footer}>
      <Link href="/">Home</Link>
      <Link href="/">About</Link>
      <Link href="/">Privacy</Link>
      <Link href="/">Github</Link>
      <div>Made with 😡 by <Link href="/">@GuamHat</Link></div>
    </div>
  </div>;
}

export default Footer;
