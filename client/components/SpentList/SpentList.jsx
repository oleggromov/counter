import React from 'react';
import styles from './spent-list.css';

export default class SpentList extends React.Component {
	render () {
		return (
			<table>
				{this.renderItems()}
			</table>
		);
	}

	renderItems () {
		return this.props.data.map(item => {
			return (
				<tr>
					<td>$ {item.amount}</td>
					<td>{item.type}</td>
				</tr>
			);
		});
	}
}
