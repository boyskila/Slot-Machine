import React, { Component } from 'react';
import '../css/imageItems.css';
import Utils from '../util/Util';
import Animations from '../animations/imageAnimations'

class Image extends Component {
  render() {
    let animationDuration = this.props.duration;
    let animationDelay = this.props.delay;
    let Animation = Animations(animationDuration, animationDelay);
    let generateList = Utils.getImages().map((img, index) =>{
                            /*first and third rows will change their opacity after animation end */
                            if(index === 0 || index === 2) {
                                return  <li key={index}>
                                            <img src={img} alt='a' style={Animation.darkAnimationRules}/>
                                        </li>
                            } else if (index === 1) {
                                return  <li key={index}>
                                            <img src={img} alt='a' style={Animation.pulseAnimationRules}/>
                                        </li>
                            }
                            return  <li key={index}>
                                        <img src={img} alt='a' />
                                    </li>
                        });
    return (
      <ul id={this.props.id} className='slots spin' style={Animation.animationDirationStyle}>
            {generateList}
      </ul>
    );
  }
}
export default Image;