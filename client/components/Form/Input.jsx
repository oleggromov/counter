import React from 'react'
import styles from './input.css'

const Input = ({ value, isInvalid, autoFocus, onChange }) => {
  let classes = styles.input
  if (isInvalid) {
    classes = `${classes} ${styles.error}`
  }

  return (
    <input
      className={classes}
      autoFocus={autoFocus}
      onChange={e => onChange(e.target.value)}
      value={value}
    />
  )
}

export default Input
