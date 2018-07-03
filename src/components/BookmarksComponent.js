import React, {Component} from 'react'

const data = [
    {
        "name": "MDN - Javascript",
        "href": "https://developer.mozilla.org/en-US/docs/Web/JavaScript"
    },
    {
        "name": "Scala",
        "href": "https://www.scala-lang.org/api/current/"
    },
    {
        "name": "Regex",
        "href": "https://docs.microsoft.com/en-us/dotnet/standard/base-types/regular-expression-language-quick-reference"

    }
];


class BookmarksComponent extends Component {

    constructor(props) {
        super(props)
        this.state = {
            data: data
        }
    }


    render() {
        return <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                <ul className="navbar-nav">
                    {this.state.data.map(bm => <li><a className="nav-link" href={bm.href} target='_blank'>{bm.name}</a>  </li>)}
                </ul>


        </nav>

    }
}

export {BookmarksComponent}