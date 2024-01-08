import React from 'react';
import styles from './HomePage.module.css';
import { NavLink, Outlet, useLocation } from 'react-router-dom';

const HomePage = () => {
  const path = useLocation().pathname;
  return (
    <div className={styles.container}>
      <h1>Forms</h1>
      <nav className={styles.nav}>
        <NavLink to={'/'} className={path === '/' ? styles.navLinkActive : ''}>
          Home
        </NavLink>
        <NavLink
          to={'/uncontrolled-form'}
          className={path === '/uncontrolled-form' ? styles.navLinkActive : ''}
        >
          Uncontrolled Form
        </NavLink>
        <NavLink
          to={'/react-hook-form'}
          className={path === '/react-hook-form' ? styles.navLinkActive : ''}
        >
          React Hook Form
        </NavLink>
      </nav>
      <div className={styles.content}>
        <Outlet />
      </div>
    </div>
  );
};

export default HomePage;
