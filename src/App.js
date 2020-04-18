import React from 'react';
import './App.css';
import GameController from './services/GameController.js';
import MatrioTable from './components/MatrioTable.jsx';

export default class App extends React.Component {
  constructor() {
    super();
    this.gc = new GameController(this);
    this.state = this.gc.gameState;
    this.backdrop = true;
  }

  conceal() {
    this.backdrop = true;
    this.setState(this.gc.gameState);
  }

  reveal() {
    this.backdrop = false;
    this.setState(this.gc.gameState);
  }

  render() {
    return (
    <div className="App">
       {/* <header className="App-header"> */}
      {/* </header> */}

      <MatrioTable gc={this.gc} gameState={this.state}/>

      { this.backdrop ? <div className='backdrop'></div> : ''}
    </div>
    );
  }
}
