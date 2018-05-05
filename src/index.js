import React, { Component } from 'react';
import ReactDOM from 'react-dom';
 
class App extends Component {
    render() {
        return pug`
        div
            h1 My Component
            p This is my component using pug.
        `;
    }
}
 
ReactDOM.render( <App />, document.querySelector( '#app' ) );