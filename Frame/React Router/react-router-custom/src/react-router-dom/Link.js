import React, {PureComponent} from 'react';
import {Consumer} from './context';

export default class Link extends PureComponent {

    render() {
        const {to} = this.props;
        return (
            <Consumer>
                {
                    value => {
                        console.log('Link state', value);
                        const {history} = value;
                        const {push} = history;
                        return <a onClick={() => push(to)}>{this.props.children}</a>
                    }
                }
            </Consumer>
        );
    }
}