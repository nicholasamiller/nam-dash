import React, {Component} from 'react';
import './App.css';
import BomWeatherComponent from "./components/weather";

class App extends Component {
    render() {
        return (
            <div className="App">
                <div className="container-fluid">
                    <div className="row">
                            <BomWeatherComponent/>
                    </div>
                </div>
            </div>
        );
    }
}

export default App;
