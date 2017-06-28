import React, { Component } from 'react';
import '../css/scores.css';
class Scores extends Component {
  render() {
    var helper = [1,2,3,4,5,6,7,8];
    var images = helper.map((i) => <img src={`images/symbol${i}.png`} alt="a" />);
    return (
      <div className="Scores">
            {images}
      </div>
    );
  }
}
export default Scores;