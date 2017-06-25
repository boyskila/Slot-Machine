import React, { Component } from 'react';
// import '../css/winningLine.css';
import winningLine from '../../public/images/winning-line.png' ;

class WinningLine extends Component {
  render() {
      var styles = {
          position: 'absolute',
          top: '95px'
      }
      var imageStyle = {
          float: 'left',
          marginLeft: '5px',
          visibility: 'hidden',
          opacity: '0',
          transition: 'all 0.5s ease-in'
      }

      var firstRing = {};
      Object.assign(firstRing, imageStyle);
      var lastRing = {};
      Object.assign(lastRing, imageStyle);
      firstRing.marginLeft = '4px';
      lastRing.marginLeft = '5.5px'
      setTimeout(function(){
        var images = document.getElementsByClassName('winning')
        console.log ()
        for(let i = 0; i < images.length; i++) {
            let image = images[i];
            image.style.visibility = 'visible';
            image.style.opacity = 1;
        }
       
    }, 5000);
    return (
        <div className="winnig-line" style={styles}>
            <img className='winning' src={winningLine} alt='' style={firstRing}/>
            <img className='winning' src={winningLine} alt='' style={imageStyle}/>
            <img className='winning' src={winningLine} alt='' style={imageStyle}/>
            <img className='winning' src={winningLine} alt='' style={lastRing}/>
            <img className='winning' src={winningLine} alt='' style={imageStyle}/>
        </div>
    );
  }
}
export default WinningLine;