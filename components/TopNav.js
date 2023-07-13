import Link from 'next/link';

import styles from './TopNav.module.css';

const TopNav = () => {
    return (
        <nav className={styles.navContainer}>
            <ul className={styles.navItemList}>
                <li className={styles.navItem}>
                    <Link href="/">
                        Home
                    </Link>
                </li>
                <li className={styles.navItem}>
                    <Link href="/papers/new">
                        Contribute
                    </Link>
                </li>
                <li className={styles.navItem}>
                    <Link href="/all">
                        Papers
                    </Link>
                </li>
                <li className={styles.navItem}>
                    <Link href="/about">
                        About
                    </Link>
                </li>
                <li className={styles.navItem}>
                    <Link href="/contact">
                        Contact
                    </Link>
                </li>
            </ul>
        </nav>
    );
};

export default TopNav;