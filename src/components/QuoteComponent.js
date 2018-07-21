import React, {Component} from "react";

class QuoteComponent extends Component
{
    constructor()
    {
        super()
        this.state = {
            quote: ""
        }
    }

    componentWillMount() {
        fetch("/api/Quotes/getQuoteOfDay")
            .then(value => value.text())
            .then(value => this.setState({quote: value}))

    }

    render() {

        return <div className="card">
            <h2 className="card-title">Quotes of the Day</h2>
            <div className="card-body">
                <table className="table table-sm">
                    <tbody>
                        <tr>
                            <th scope="row">About Struggle and Death</th>
                            <td>{this.state.quote}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    }
}

export {QuoteComponent}