import React from 'react'
import moment from 'moment'

const full = 'MMMM D, YYYY'
const contracted = 'MMM D, YYYY'
const tiny = 'MMMM D'

/**
 * Date component
 * @param {Date|String|Moment} props.date
 */
export default function Date (props) {
  const date = moment(props.date)
  const yearDiffers = moment().year() !== date.year()
  const dateFormat = yearDiffers
    ? props.contracted
      ? contracted
      : full
    : tiny
  const formatted = date.format(dateFormat)

  return (
    <span>
      { formatted }
    </span>
  )
}
