import React from 'react'
import styles from './title.css'

export default (props) => {
  return (
    <div className={`${styles.title} ${styles[props.mediaType]}`}>
      <h1 className={styles.text}>{props.children}</h1>
      {props.back && (
        <div className={styles.back}>
          {props.back}
        </div>
      )}
    </div>
  )
}
