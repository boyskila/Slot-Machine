import React, { Component } from 'react';
import '../css/scores.css';
import _times from 'lodash.times'

class Scores extends Component {
	render() {
		return (
			<div className="Scores">
				{
					_times(8, (i) => <img key={i} src={`images/symbol${i+1}.png`} alt="a" />)
				}
			</div>
		);
	}
}
export default Scores;
