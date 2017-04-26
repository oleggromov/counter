import React from 'react'
import styles from './spent-list-item.css'

export default function SpentListItem (props) {
  const item = props.item

  return (
    <tr className={`${styles.item} ${styles[props.mediaType]}`}>
      <td className={styles.currency}>
        $
      </td>
      <td className={styles.amount}>
        {item.amount.toFixed(2)}
      </td>
      <td className={styles.type}>
        {item.type}
      </td>
      <td className={styles.delete}>
        <span onClick={props.onDelete}>Delete</span>
      </td>
    </tr>
  )
}
