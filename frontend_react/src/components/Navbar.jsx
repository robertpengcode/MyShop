import React from 'react'
import {Link} from 'react-router-dom'
import ConnectButton from './ConnectButton'
import styles from '../styles'

export default function Navbar() {
  return (
    <div className={styles.navContainer}>
        <div className={styles.navLogo}>MyShop</div>
        <div>
          <Link className={styles.navLink} to="/">Home</Link>
          <Link className={styles.navLink} to="/Admin">Admin</Link>
        </div>
        <ConnectButton />
    </div>
  )
}