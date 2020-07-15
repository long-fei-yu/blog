import React, {PureComponent} from 'react';
import {Consumer} from './context';

export default class Redirect extends PureComponent {

    render() {
        const {to} = this.props;
        return (
            <Consumer>
                {
                    value => {
                        console.log('Redirect state', value);
                        const {history} = value;
                        const {push} = history;
                        push(to);
                        return null;
                    }
                }
            </Consumer>
        );
    }
}