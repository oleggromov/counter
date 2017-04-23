import React from 'react';
import Layout from './Layout/Layout.jsx';
import DateDisplay from './DateDisplay/DateDisplay.jsx';
import SpentForm from './SpentForm/SpentForm.jsx';
import SpentList from './SpentList/SpentList.jsx';
import { cloneDeep, reverse } from 'lodash';

const spentItems = [
	{
		id: 0,
		amount: 24.3,
		type: 'books'
	},
	{
		id: 1,
		amount: 6.5,
		type: 'coffee'
	},
	{
		id: 2,
		amount: 101.19,
		type: 'car rental'
	}
];

export default class App extends React.Component {
	constructor (props) {
		super(props);
		this.state = { spentItems };

		this.addItem = this.addItem.bind(this);
	}

	addItem (item) {
		this.setState(prevState => {
			let newState = cloneDeep(prevState);

			newState.spentItems.push({
				id: this.state.spentItems.length,
				amount: item.amount,
				type: item.type
			});

			return newState;
		});
	}

	deleteItem () {
		console.log('delete item');
	}

	render () {
		return (
			<Layout>
				<div>
					<DateDisplay />
					<SpentForm onItemAdd={this.addItem} />
					<SpentList onItemDelete={this.deleteItem} items={reverse(this.state.spentItems)} />
				</div>
			</Layout>
		);
	}
}