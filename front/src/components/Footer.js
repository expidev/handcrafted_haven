

import styles from "../styles/Home.module.css";

export default function Footer() {
  return (
        <footer className={styles.footer}>
                <div className={styles.footerTop}>
                <div>
                    <h4>Contact</h4>
                    <p>Email: support@handcraftedhaven.com</p>
                    <p>Phone: +1 (800) 555-1234</p>
                </div>
                <div>
                    <h4>Follow Us</h4>
                    <p>Instagram | Facebook | Pinterest</p>
                </div>
                <div>
                    <h4>Newsletter</h4>
                    <input type="email" placeholder="Your email" />
                    <button>Subscribe</button>
                </div>
                </div>
                <div className={styles.footerBottom}>
                <p>&copy; {new Date().getFullYear()} Handcrafted Haven | All rights reserved</p>
                </div>
            </footer> );
};