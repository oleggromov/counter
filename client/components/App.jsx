import React from 'react';
import Layout from './Layout/Layout.jsx';
import DateDisplay from './DateDisplay/DateDisplay.jsx';
import SpentForm from './SpentForm/SpentForm.jsx';
import SpentList from './SpentList/SpentList.jsx';

export default class App extends React.Component {
	render () {
		return (
			<Layout>
				<div>
					<DateDisplay />
					<SpentForm />
					<SpentList />
				</div>
			</Layout>
		);
	}
}
