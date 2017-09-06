import React, { Component } from 'react';
import PropTypes from 'prop-types';

export class Link extends Component {
    static contextTypes = {
        route: PropTypes.string,
        linkHandler: PropTypes.func,
    }
     
    handleClick = (event) => {
        event.preventDefault() // eslint-disable-line
        this.context.linkHandler(this.props.to)
    }

    render() {
        const activeClass = this.context.route === this.props.to ? 'active' : '';
        return ( // eslint-disable-next-line
            <a href="#" className={activeClass} onClick={this.handleClick}>{this.props.children}</a>
        )
    }
}
