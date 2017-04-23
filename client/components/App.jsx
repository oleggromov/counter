import React from 'react';
import Layout from './Layout/Layout.jsx';
import DateDisplay from './DateDisplay/DateDisplay.jsx';
import SpentForm from './SpentForm/SpentForm.jsx';
import SpentList from './SpentList/SpentList.jsx';

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
	}

	addItem (item) {
		console.warn('adding ', item);
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
					<SpentList onItemDelete={this.deleteItem} items={this.state.spentItems} />
				</div>
			</Layout>
		);
	}
}
