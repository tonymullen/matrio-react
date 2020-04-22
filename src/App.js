import React from 'react';
import './App.css';
import GameController from './services/GameController.js';

import MatrioTable from './components/MatrioTable.jsx';
import MatrioTableMobile from './components/MatrioTableMobile.jsx';


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

  componentDidMount() {
    window.addEventListener("resize", this.reveal.bind(this));
  }

  render() {
    const isMobile = window.innerWidth < 850;
    return (
    <div className="App">
      { isMobile ? (
        <MatrioTableMobile gc={this.gc} gameState={this.state}/>
      ) : (
        <MatrioTable gc={this.gc} gameState={this.state}/>
      )}
      { this.backdrop ? <div className='backdrop'></div> : ''}
    </div>
    );
  }
}
