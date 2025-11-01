'use client';
import styles from '../../styles/navbar.module.css';
import { FaPhoneAlt, FaSearch } from 'react-icons/fa';
import { LocationContext } from '../../Context/LocationContext';
import { useContext } from 'react';


const NavBar = () => {

    const {location, loading} = useContext(LocationContext);

    return (
        <nav className={styles.nav}>
            <ul className={styles.navUL}>
                <li><a href='#' className={styles.a}><h3 className={styles.h3}>ClimaSmart</h3></a></li>
                <li><p className={styles.loc}>{!loading ? 'A localizar...' : String(location ?? '')}</p></li>
                <li>
                    <div className={styles.inputGroup}>
                        <input className={styles.input} placeholder='Pesquisar'></input>
                        <label className={styles.inputLabel}><FaSearch /></label>
                    </div>
                </li>
                <li><a href='#' className={`${styles.a} ${styles.phone}`}><FaPhoneAlt /></a></li>
            </ul>
        </nav>
    );
};

export default NavBar;