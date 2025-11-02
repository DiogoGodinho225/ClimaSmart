import styles from "../../styles/footer.module.css";
import { FaLinkedin, FaInstagram, FaFacebook } from "react-icons/fa6";

const Footer = () =>{
    return(
        <footer className={styles.footer}>
            <div className={styles.socials}>
                <a href="#">
                    <FaLinkedin />
                </a>
                 <a href="#">
                    <FaInstagram />
                </a>
                 <a href="#">
                    <FaFacebook />
                </a>
            </div>
            <p>© {new Date().getFullYear()} ClimaSmart — Todos os direitos reservados.</p>
        </footer>
    );
}

export default Footer;