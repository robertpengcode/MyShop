import React from 'react'
import ConnectButton from './ConnectButton'
import styles from '../styles'

export default function Navbar() {
  return (
    <div className={styles.navContainer}>
        <div className={styles.navLogo}>MyShop</div>
        <ConnectButton />
    </div>
  )
}