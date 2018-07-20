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
        fetch("api/getQuote")
            .then(value => value.text())
            .then(value => this.setState({quote: value}))

    }

    render() {
        return <div>Quote: {this.state.quote}</div>
    }
}

export {QuoteComponent}