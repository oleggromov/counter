import React from 'react'
import styles from './button.css'

export default ({ onClick, children }) => (
  <button
    className={styles.button}
    onClick={onClick}>
    {children}
  </button>
)
