import React, {Component} from 'react';
import './App.css';
import BomWeatherComponent from "./components/weather";
import {Moon} from './components/Moon';
import {getMoonDetailForCanberra} from "./components/Moon";
import {BookmarksComponent} from "./components/BookmarksComponent";

class App extends Component {


    render() {
        return (
            <div className="App">
                <div className="container-fluid">
                    <BookmarksComponent/>
                    <div className="row">
                        <div className="col-sm">
                            <BomWeatherComponent/>
                        </div>
                        <div className="col-sm">
                            <Moon data={getMoonDetailForCanberra()}/>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default App;
