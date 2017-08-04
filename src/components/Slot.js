import React, { Component } from 'react';
import '../css/slot.css';
import Animations from '../animations/imageAnimations';

class Image extends Component {

	render() {
		var animationDuration = this.props.duration;
		var animationDelay = this.props.delay;
		var images = this.props.images;

		var Animation = Animations(animationDuration, animationDelay);

		let generateList = images.map((img, index) => {
			var animation = index === 0 || index === 2 ? Animation.darkAnimationRules : index === 1
							? Animation.pulseAnimationRules : {};
				return  <li key={index}>
							<img src={img} alt='a' style={animation}/>
						</li>
			});
		return (
			<ul id={this.props.id} className='slots spin' style={Animation.animationDurationStyle}>
				{generateList}
			</ul>
		);
	}
}
export default Image;
