import React, { Component } from 'react';
import Slot from './Slot';
import Scores from './Scores';
import WinningLine from './WinningLine';
import _ from 'lodash';

class SlotContainer extends Component {

	shuffleImages(){
		return _.shuffle(this.props.images)
	}

	render() {
		var slotContainerStyles = {
			height: '355px',
			overflow: 'hidden',
			marginTop: '152px',
			marginLeft: '142px'
		}
		var speed = this.props.speed;
		return (
			<div className="SlotContainer" style={slotContainerStyles}>
				<Slot id={'slot-one'} duration={speed} delay={0} images={this.shuffleImages()}/>
				<Slot id={'slot-two'} duration={speed} delay={0.8} images={this.shuffleImages()}/>
				<Slot id={'slot-three'} duration={speed} delay={1} images={this.shuffleImages()}/>
				<Slot id={'slot-four'} duration={speed} delay={1.2} images={this.shuffleImages()}/>
				<Slot id={'slot-five'} duration={speed} delay={1.4} images={this.shuffleImages()}/>
				<WinningLine delay={speed}/>
				<Scores />
			</div>
		);
	}
}

export default SlotContainer;
