import React, { Component } from 'react';
import moment from 'moment';

const full = 'MMMM D, YYYY'
const tiny = 'MMMM D';

/**
 * Date component
 * @param {Date|String|Moment} props.date
 */
export default function Date (props) {
	const date = moment(props.date);
	const yearDiffers = moment().year() !== date.year();
	const formatted = date.format(yearDiffers ? full : tiny);

	return (<span>
		{ formatted }
	</span>);
}
