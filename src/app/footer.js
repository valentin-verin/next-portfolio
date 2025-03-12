import styles from "./Footer.module.css";

const Footer = () => {
  return (
    <div className={styles.footer}>
      <div className={styles.footerLeft}>
        <p className={styles.contactTitle}>Contact</p>
        <a href="mailto:vverinpro@gmail.com">vverinpro@gmail.com</a>
      </div>
      <div className={styles.footerMiddle}>
        <p>2024 - © VALENTIN VERIN</p>
      </div>
      <div className={styles.footerRight}>
        <div className={styles.footerRightContainer}>
          <a href="">Top</a>
          <a href="">About</a>
          <a href="">Project</a>
          <a href="">Contact</a>
        </div>
      </div>
    </div>
  );
};

export default Footer;
