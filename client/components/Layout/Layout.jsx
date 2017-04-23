import React from 'react';
import styles from './layout.css';

export default class Layout extends React.Component {
	render () {
		return (
			<div className={styles.layout}>
				<div className={styles.header}>
					<div className={styles.logo}>Counter <sup>0.1</sup></div>
				</div>
				<div className={styles.content}>
					{this.props.children}
				</div>
				<div className={styles.footer}>
					Copyright 2017, Oleg Gromov
				</div>
			</div>
		);
	}
}
