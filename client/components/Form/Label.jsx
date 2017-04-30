import React from 'react'
import styles from './label.css'

export default props => (
  <span className={styles.label}>
    {props.children}
  </span>
)
