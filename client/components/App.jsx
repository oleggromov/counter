import React from 'react';
import Layout from './Layout/Layout.jsx';
import DateDisplay from './DateDisplay/DateDisplay.jsx';
import SpentForm from './SpentForm/SpentForm.jsx';
import SpentList from './SpentList/SpentList.jsx';

const spentItems = [
	{
		amount: 24.3,
		type: 'books'
	},
	{
		amount: 6.5,
		type: 'coffee'
	},
	{
		amount: 101.19,
		type: 'car rental'
	}
];

export default class App extends React.Component {
	render () {
		return (
			<Layout>
				<div>
					<DateDisplay />
					<SpentForm />
					<SpentList data={spentItems} />
				</div>
			</Layout>
		);
	}
}
