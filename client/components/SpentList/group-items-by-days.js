/**
 * Splits items into arrays by day.
 * @param {Array} items
 * @return {Array}
 */
export default function groupByDays (items) {
  let prevDay = null

  return items.reduce((acc, cur) => {
    const curDay = new Date(cur.date).getDate()

    if (curDay !== prevDay) {
      acc.push([])
    }

    acc[acc.length - 1].push(cur)
    prevDay = curDay

    return acc
  }, [])
}
