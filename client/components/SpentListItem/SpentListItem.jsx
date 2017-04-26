import React from 'react'
import styles from './spent-list-item.css'

const currency = '$'
const precisePrice = /\.00$/

function renderPrice (price) {
  const fixedPoint = price.toFixed(2)
  const matchResult = fixedPoint.match(precisePrice)

  if (matchResult) {
    return (
      <span>
        {fixedPoint.slice(0, matchResult.index)}
        <span className={styles.amountInvisible}>
          {matchResult[0]}
        </span>
      </span>
    )
  }

  return fixedPoint
}

export default function SpentListItem (props) {
  const item = props.item

  return (
    <div className={`${styles.row} ${styles[props.mediaType]}`}>
      <div className={styles.currency}>
        {currency}
      </div>
      <div className={styles.amount}>
        {renderPrice(item.amount)}
      </div>
      <div className={styles.name}>
        {item.type}
      </div>
      <div className={styles.delete}>
        <span onClick={props.onDelete}>Delete</span>
      </div>
    </div>
  )
}
