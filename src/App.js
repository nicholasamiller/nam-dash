import React, {Component} from 'react';
import './App.css';
import BomWeatherComponent from "./components/weather";
import {Moon, Sun} from './components/Moon';
import {getMoonDetailForCanberra} from "./components/Moon";
import {BookmarksComponent} from "./components/BookmarksComponent";
import {QuoteComponent} from "./components/QuoteComponent";
import UltraVioletComponent from "./components/UvComponent";

class App extends Component {


    render() {
        return (
            <div className="App">
                <div className="container-fluid">
                    <BookmarksComponent/>
                    <div className="row">
                        <div className="col-sm">
                            <QuoteComponent/>
                        </div>
                        <div className="col-sm">
                       //     <BomWeatherComponent/>
                        </div>
                        <div className="col-sm">
                            <Sun/>
                        </div>
                        <div className="col-sm">
                            <Moon data={getMoonDetailForCanberra()}/>
                        </div>
                    </div>
                    <div className="row">
                        <UltraVioletComponent/>
                    </div>
                </div>
            </div>
        );
    }
}

export default App;
