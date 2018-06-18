import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import BomWeatherComponent from "./components/weather";

class App extends Component {
  render() {
    return (
      <div className="App">
        <BomWeatherComponent/>
      </div>
    );
  }
}

export default App;
