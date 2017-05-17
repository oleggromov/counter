import React from 'react'
import styles from './login.css'

export default (params) => {
  return (
    <div className={styles.login}>
      <a className={styles.button} href={params.url}>Login via Facebook</a>
      <p className={styles.message}>We will use your name and profile picture. You could remove all your data from the Counter server later.</p>
    </div>
  )
}
