import React, {PureComponent} from 'react';
import {Consumer} from './context';

export default class Switch extends PureComponent {

    render() {
        return (
            <Consumer>
                {
                    value => {
                        console.log('Switch state', value);
                        const {location} = value;
                        const {pathname} = location;
                        let children = this.props.children;

                        for (let i = 0; i < children.length; ++i) {
                            let child = children[i];
                            let path = child.props.path;
                            let to = child.props.to;
                            // 这样处理有一定的局限性 需要用正则来处理
                            if (pathname.startsWith(path) || to) {
                                return child;
                            }
                        }
                        return null;
                    }
                }
            </Consumer>
        );
    }
}