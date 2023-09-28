'use client'
import Link from 'next/link';
import {useState} from 'react';
import {usePathname} from 'next/navigation';

import styles from './TopNav.module.css';

const TopNav = () => {
    const pathname = usePathname();
    const [showMenu, setShowMenu] = useState(false);

    const toggleMenu = () => {
        setShowMenu((prevShowMenu) => !prevShowMenu);
    };

    return (
        <nav className={styles.navContainer}>
            <div
                className={`${styles.hamburgerMenu} ${showMenu ? styles.active : ''}`}
                onClick={toggleMenu}
            >
                <div className={styles.hamburgerIcon}></div>
            </div>
            <ul className={`${styles.navItemList} ${showMenu ? styles.active : ''}`}>
                <NavItem current={pathname === '/'} href="/">
                    Home
                </NavItem>
                <NavItem current={pathname === '/contribute'} href="/contribute">
                    Contribute
                </NavItem>
                <NavItem current={pathname === '/all'} href="/all">
                    Papers
                </NavItem>
                <NavItem current={pathname === '/about'} href="/about">
                    About
                </NavItem>
                <NavItem current={pathname === '/contact'} href="/contact">
                    Contact
                </NavItem>
            </ul>
        </nav>
    );
};

// Custom NavItem component to handle highlighting
const NavItem = ({current, href, children}) => (
    <li className={`${styles.navItem} ${current ? styles.navItemCurrent : ''}`}>
        <Link href={href}>{children}</Link>
    </li>
);

export default TopNav;
