import React, { Component } from 'react';

export class Link extends Component {
    handleClick = (event) => {
        event.preventDefault() // eslint-disable-line
        window.history.pushState(null, '', this.props.to)
    }
    render() {
        return ( // eslint-disable-next-line
            <a href="#" onClick={this.handleClick}>{this.props.children}</a>
        )
    }
}
