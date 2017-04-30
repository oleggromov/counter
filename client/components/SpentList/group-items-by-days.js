import moment from 'moment'

function getDay (dateStr) {
  return moment(dateStr).date()
}

/**
 * Splits items into arrays by day.
 * @param {Array} items
 * @return {Array}
 */
export default function groupByDays (items) {
  let prevDay = null

  return items.reduce((acc, cur) => {
    const curDay = getDay(cur.date)

    if (curDay !== prevDay) {
      acc.push([])
    }

    acc[acc.length - 1].push(cur)
    prevDay = curDay

    return acc
  }, [])
}
