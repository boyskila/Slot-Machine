import React, { Component } from 'react';
import winningLine from '../../public/images/winning-line.png' ;
import '../css/winning-line.css'
import WinningLineAnimation from '../animations/winningLineAnimations';
import _times from 'lodash.times'

class WinningLine extends Component {

	componentWillMount() {
		this.winningLines = _times(5,(i) => <img key={i} className='winning' src={winningLine} alt='winning-ring'/>)
	}
	render() {
		var Animation = WinningLineAnimation(this.props.delay);
		return (
			<div className="winning-line hide-at-beginning fade-in" style={Animation.fadeInRules}>
				{this.winningLines}
			</div>
		);
	}
}
export default WinningLine;
