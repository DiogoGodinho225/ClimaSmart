'use client';
import styles from '../../styles/navbar.module.css';
import { FaPhoneAlt, FaSearch, FaMapPin } from 'react-icons/fa';
import { LocationContext } from '../../Context/LocationContext';
import { useContext } from 'react';
import { Tooltip } from 'react-tooltip';
import 'react-tooltip/dist/react-tooltip.css';

const NavBar = () => {

    const { location, loading } = useContext(LocationContext);

    return (
        <nav className={styles.nav}>
            <ul className={styles.navUL}>
                <li><a href='#' className={styles.a}><h3 className={styles.h3}>ClimaSmart</h3></a></li>
                <li>
                    <a href='#' className={`${styles.a} ${styles.phone}`}><FaPhoneAlt /></a>
                    <Tooltip 
                        anchorSelect={`.${styles.phone}`} 
                        place="bottom" 
                        content="Pretende receber alertas e sugestões de Vestuário?"
                        style={{
                            borderRadius: '10px',
                            backgroundColor: 'white',
                            color: 'black',
                            fontWeight: 'bold',
                            fontFamily: 'Arial',
                            fontSize: '10pt',
                        }}
                    />
                </li>
                <li><p className={styles.loc}><FaMapPin style={{ color: 'red', fontSize: '11pt' }} /> {loading ? 'A procurar localização atual...' : String(`${location?.city}, ${location?.country}`)}</p></li>
                <li>
                    <div className={styles.inputGroup}>
                        <input className={styles.input} placeholder='Pesquisar região'></input>
                        <label className={styles.inputLabel}><FaSearch /></label>
                    </div>
                </li>
            </ul>
        </nav>
    );
};

export default NavBar;