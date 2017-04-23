import React from 'react';
import styles from './spent-form.css';

export default class SpentForm extends React.Component {
	render () {
		return (
			<form className={styles.spentForm}>
				<span className={styles.currency}>$</span>

				<input autoFocus className={styles.amount} />
				for
				<input className={styles.type} />

				<button>Save</button>
			</form>
		);
	}
}
