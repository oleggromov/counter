import React from 'react';
import styles from './spent-form.css';
import { cloneDeep } from 'lodash';

function getInitialState () {
	return {
		amount: '',
		type: '',
		validity: {
			amount: false,
			type: false
		},
		shake: false,
		showErrDecoration: false
	};
}

const shakeAnimDelay = 1000;

export default class SpentForm extends React.Component {
	constructor (props) {
		super(props);

		this.state = getInitialState();

		this.setAmount = this.setAmount.bind(this);
		this.setType = this.setType.bind(this);
		this.saveItem = this.saveItem.bind(this);
	}

	setAmount (e) {
		const isNumber = /^\d+(\.\d{1,2})?$/;
		const value = e.target.value;

		this.setState(prevState => {
			let newState = cloneDeep(prevState);

			newState.showErrDecoration = true;
			newState.validity.amount = isNumber.test(value);
			newState.amount = value;

			return newState;
		});
	}

	setType (e) {
		const isEmpty = /^\s+$/;
		const value = e.target.value;

		this.setState(prevState => {
			let newState = cloneDeep(prevState);

			newState.showErrDecoration = true;
			newState.validity.type = !isEmpty.test(value);
			newState.type = value;

			return newState;
		});
	}

	saveItem (e) {
		const validity = this.state.validity.amount && this.state.validity.type;

		if (validity) {
			this.props.onItemAdd({
				amount: this.state.amount,
				type: this.state.type.trim()
			});

			this.setState(getInitialState());
			this.amountInput.focus();
		} else {
			this.setState({
				shake: true,
				showErrDecoration: true
			});
		}

		e.preventDefault();
	}

	finishShaking () {
		setTimeout(() => {
			this.setState({ shake: false });
		}, shakeAnimDelay);
	}

	render () {
		// This is an ugly way to remove animation class afterwards.
		if (this.state.shake) {
			this.finishShaking();
		}

		return (
			<form className={`${styles.spentForm} ${this.state.shake ? styles.shake : '' }`}>
				<span className={styles.currency}>$</span>

				<input
					className={`${styles.amount} ${this.state.showErrDecoration && !this.state.validity.amount ? styles.error : ''}`}
					autoFocus
					ref={(input) => { this.amountInput = input; }}
					onChange={this.setAmount}
					value={this.state.amount} />
				for
				<input
					className={`${styles.type} ${this.state.showErrDecoration && !this.state.validity.type ? styles.error : ''}`}
					onChange={this.setType}
					value={this.state.type} />

				<button onClick={this.saveItem}>Save</button>
			</form>
		);
	}
}
