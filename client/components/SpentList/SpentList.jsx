import React from 'react';
import styles from './spent-list.css';
import moment from 'moment';
import DateFormatted from '../DateFormatted/DateFormatted.jsx';

function getDay (dateStr) {
	return moment(dateStr).date();
}

export default class SpentList extends React.Component {
	/**
	 * Splits items into arrays by day.
	 * @param {Array} items
	 * @return {Array}
	 */
	groupByDays (items) {
		let prevDay = null;

		return items.reduce((acc, cur) => {
			const curDay = getDay(cur.date);

			if (curDay !== prevDay) {
				acc.push([]);
			}

			acc[acc.length-1].push(cur);
			prevDay = curDay;

			return acc;
		}, []);
	}

	render () {
		const days = this.groupByDays(this.props.items);

		return (
			<table className={styles.table}>
				{this.renderDays(days)}
			</table>
		);
	}

	renderDays (days) {

		return days.map(day => {
			const currentDay = day[0].date;
			const items = this.renderItems(day);
			const key = moment(currentDay).valueOf();

			return (
				<tbody key={key}>
					<tr key={key}><th colSpan="2" className={styles.caption}>
						<DateFormatted date={currentDay} />
					</th></tr>
					{items}
				</tbody>
			);
		});
	}

	renderItems (items) {
		return items.map(item => {
			return (
				<tr key={item.id}>
					<td className={styles.amount}>
						$ {item.amount.toFixed(2)}
					</td>
					<td className={styles.type}>
						{item.type}
					</td>
				</tr>
			);
		});
	}
}
