import React, { Component } from 'react';
import SlotContainer from './SlotContainer';
import Utils from '../util/Util';
import Socket from '../util/SocketListener'

const defaultSpeed = 3;
let SocketListener = null;
const buttonStyles = {
	margin: '30px 370px',
	width: '100px',
	height: '45px',
	background: '#FFD700',
	padding: '0',
	border: '0',
	borderRadius: '5px'
}

class SlotOverlay extends Component {
	constructor(props) {
		super(props);
		SocketListener = new Socket();
		SocketListener.onDisconnect(() => this.setState({
			speed:defaultSpeed
		}));
		this.setNewGame = this.setNewGame.bind(this);
		this.runNewGame = this.runNewGame.bind(this);
		this.images = Utils.getImages();
		this.state = {
			speed: defaultSpeed,
			game: () => <SlotContainer speed={this.state.speed} images={this.images}/>
		}
	}

	runNewGame(){
		this.setNewGame()
	}
	setNewGame (duration){
		this.setState({
			speed: duration || this.state.speed,
			game: () => <SlotContainer speed={this.state.speed} images={this.images}/>
		});
	}

	componentWillMount(){
		SocketListener.onListenOnMessage((data) => {
			this.setNewGame(data.speed);
		});
	}

	render() {
		var SlotContainer = this.state.game;

		return (
			<div className="App" >
				<SlotContainer images={this.images}/>
				<button id="button-play" onClick={this.runNewGame} style={buttonStyles}> Play Again</button>
			</div>
		)
	}
}

export default SlotOverlay;
