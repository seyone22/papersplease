'use client'

import Link from 'next/link';
import styles from './TopNav.module.css';
import {useState} from "react";

const TopNav = () => {
    const [showMenu, setShowMenu] = useState(false);
    const toggleMenu = () => {
        setShowMenu((prevShowMenu) => !prevShowMenu)
    }

    return (
        <nav className={styles.navContainer}>
            <div
                className={`${styles.hamburgerMenu} ${showMenu ? styles.active : ''}`}
                onClick={toggleMenu}
            >
                <div className={styles.hamburgerIcon}></div>
            </div>
            <ul className={`${styles.navItemList} ${showMenu ? styles.active : ''}`}>
                <li className={styles.navItem}>
                    <Link href="/">Home</Link>
                </li>
                <li className={styles.navItem}>
                    <Link href="/contribute">Contribute</Link>
                </li>
                <li className={styles.navItem}>
                    <Link href="/all">Papers</Link>
                </li>
                <li className={styles.navItem}>
                    <Link href="/about">About</Link>
                </li>
                <li className={styles.navItem}>
                    <Link href="/contact">Contact</Link>
                </li>
            </ul>
        </nav>
    );
};

export default TopNav;