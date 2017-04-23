import React from 'react';
import styles from './date-display.css';
import moment from 'moment';

export default class DateDisplay extends React.Component {
	constructor () {
		super();
		this.state = {
			date: moment()
		};
	}

	componentDidMount () {
		this.timer = setInterval(() => {
			this.tick()
		}, 1000);
	}

	componentWillUnmount () {
		clearInterval(this.timer);
	}

	tick () {
		this.setState({
			date: moment()
		});
	}

	render () {
		return (
			<div className={styles.dateDisplay}>
				<div className={styles.date}>
					{this.state.date.format('MMMM D')}
				</div>
				<div className={styles.time}>
					{this.state.date.format('h')}
					<span className={styles.timeDivider}>:</span>
					{this.state.date.format('mm a')}
				</div>
			</div>
		);
	}
}
