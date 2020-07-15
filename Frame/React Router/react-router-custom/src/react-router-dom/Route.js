import React, {PureComponent} from 'react';
import {Consumer} from './context';

export default class Route extends PureComponent {

    render() {
        const {path, component: Component} = this.props;
        return (
            <Consumer>
                {
                    value => {
                        console.log('Route state', value);
                        const {location} = value;
                        const {pathname} = location;
                        // 可以用正则来处理判断
                        if (pathname.startsWith(path)) {
                            return <Component {...value}/>
                        }
                    }
                }
            </Consumer>
        );
    }
}