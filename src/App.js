import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import CurrentTempComponent from "./components/weather";

class App extends Component {
  render() {
    return (
      <div className="App">
          <CurrentTempComponent temp="10"/>

      </div>
    );
  }
}

export default App;
