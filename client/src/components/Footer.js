

import styles from "./Footer.module.css";

export default function Footer() {
    return (
        <footer>
            <div className={styles.footer}>
                <div className={styles.footerContent}>
                    <div className={styles.footerTop}>
                        <div>
                            <span className={styles.footerHeading}>Contact</span>
                            <p>Email: support@handcraftedhaven.com</p>
                            <p>Phone: +1 (800) 555-1234</p>
                        </div>
                        <div>
                            <span className={styles.footerHeading}>Follow Us</span>
                            <p>Instagram | Facebook | Pinterest</p>
                        </div>
                    </div>
                    <div className={styles.footerBottom}>
                        <p>&copy; {new Date().getFullYear()} Handcrafted Haven | All rights reserved</p>
                    </div>
                </div>
            </div>
        </footer>);
};