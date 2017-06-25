import React, { Component } from 'react';
import images from '../data/data';
import '../css/imageItems.css';

class Image extends Component {
  render() {
    var domElements = [];
    for(var i = 0; i < images.length; i++){
        var ctr = Math.floor(Math.random()*images.length);
        domElements.push('images/'+images[ctr]);
    }
    var st = {
        animationDuration: '3s'
    }
      this.componentDidMount = function() {
            // var $this = ReactDOM.findDOMNode('');
            //console.log(document.getElementById("slot-one"))
            var slotOne = document.getElementById(this.props.id);
        slotOne.addEventListener("animationend", function() {
            console.log("animation end")
        }, false);
    }
    return (
      <ul id={this.props.id} className={this.props.class} style={st}>
            {domElements.map(function(img, index){
                return <li key={index}><img src={img} alt='a'/></li>
            })}
      </ul>
    );
  }
}
export default Image;