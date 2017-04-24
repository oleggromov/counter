import React from 'react';
import Layout from './Layout/Layout.jsx';
import DateDisplay from './DateDisplay/DateDisplay.jsx';
import SpentForm from './SpentForm/SpentForm.jsx';
import SpentList from './SpentList/SpentList.jsx';
import { cloneDeep } from 'lodash';
import { spentItems } from '../mocks/spent-items.json';

export default class App extends React.Component {
	constructor (props) {
		super(props);
		this.state = { spentItems };

		this.addItem = this.addItem.bind(this);
	}

	addItem (item) {
		this.setState(prevState => {
			let newState = cloneDeep(prevState);

			newState.spentItems.unshift({
				id: this.state.spentItems.length,
				amount: Number(item.amount),
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
					<SpentList onItemDelete={this.deleteItem} items={this.state.spentItems} />
				</div>
			</Layout>
		);
	}
}
