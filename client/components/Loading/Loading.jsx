import React from 'react'
import loadingIcon from './loading.svg'
import styles from './loading.css'

const Loading = props => {
  return (
    <div className={styles.loading} dangerouslySetInnerHTML={{ __html: loadingIcon }} />
  )
}

export default Loading
