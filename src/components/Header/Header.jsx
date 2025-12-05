import React from 'react';
import { NavLink } from 'react-router-dom';
import styles from './Header.module.css';

export default function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <NavLink to="/" className={styles.logo}>
          OZEU.NET
        </NavLink>
        <nav className={styles.nav}>
          <NavLink to="/" className={({ isActive }) => isActive ? `${styles.navLink} ${styles.active}` : styles.navLink}>Home</NavLink>
          <NavLink to="/tools" className={({ isActive }) => isActive ? `${styles.navLink} ${styles.active}` : styles.navLink}>Tools</NavLink>
          <NavLink to="/gallery" className={({ isActive }) => isActive ? `${styles.navLink} ${styles.active}` : styles.navLink}>Gallery</NavLink>
          <NavLink to="/about" className={({ isActive }) => isActive ? `${styles.navLink} ${styles.active}` : styles.navLink}>About</NavLink>
          <NavLink to="/contact" className={({ isActive }) => isActive ? `${styles.navLink} ${styles.active}` : styles.navLink}>Contact</NavLink>
        </nav>
      </div>
    </header>
  );
}
