import React from 'react';
import styles from './spent-list.css';

export default class SpentList extends React.Component {
	render () {
		return (
			<table><tbody>
				{this.renderItems()}
			</tbody></table>
		);
	}

	renderItems () {
		return this.props.items.map(item => {
			return (
				<tr key={item.id}>
					<td>$ {item.amount}</td>
					<td>{item.type}</td>
				</tr>
			);
		});
	}
}
