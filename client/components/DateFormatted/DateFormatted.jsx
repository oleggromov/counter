import React from 'react'
import { isCurrentYear, format, FORMATS } from '../../modules/date-helpers'

/**
 * Date component
 * @param {Date|String} props.date
 */
export default function DateFormatted (props) {
  const dateFormat = isCurrentYear(props.date)
    ? FORMATS.TINY
    : props.contracted
      ? FORMATS.CONTRACTED
      : FORMATS.FULL
  const formatted = format(props.date, dateFormat)

  return (
    <span>
      { formatted }
    </span>
  )
}
