import React from 'react'
import styles from './button.css'

export default ({ mediaType, onClick, children }) => (
  <button
    className={`${styles.button} ${styles[mediaType]}`}
    onClick={onClick}>
    {children}
  </button>
)
