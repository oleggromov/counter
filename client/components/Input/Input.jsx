import React from 'react'
import styles from './input.css'

const Input = props => {
  const {
    mediaType,
    value,
    isInvalid,
    autoFocus
  } = props

  let classes = `${styles.input} ${styles[mediaType]}`
  if (isInvalid) {
    classes = `${classes} ${styles.error}`
  }

  const onChange = e => props.onChange(e.target.value)

  return (
    <input
      className={classes}
      autoFocus={autoFocus}
      onChange={onChange}
      value={value}
    />
  )
}

export default Input
