'use client';
import styles from '../../styles/navbar.module.css';
import { FaPhoneAlt, FaSearch, FaMapPin } from 'react-icons/fa';
import { LocationContext } from '../../Context/LocationContext';
import { useContext } from 'react';


const NavBar = () => {

    const {location, loading} = useContext(LocationContext);

    return (
        <nav className={styles.nav}>
            <ul className={styles.navUL}>
                <li><a href='#' className={styles.a}><h3 className={styles.h3}>ClimaSmart</h3></a></li>
                <li><a href='#' className={`${styles.a} ${styles.phone}`}><FaPhoneAlt /></a></li>
                <li><p className={styles.loc}><FaMapPin style={{color: 'red', fontSize: '11pt'}} /> {loading ? 'A localizar...' : String(`${location?.city}, ${location?.country}`)}</p></li>
                <li>
                    <div className={styles.inputGroup}>
                        <input className={styles.input} placeholder='Pesquisar'></input>
                        <label className={styles.inputLabel}><FaSearch /></label>
                    </div>
                </li>
            </ul>
        </nav>
    );
};

export default NavBar;