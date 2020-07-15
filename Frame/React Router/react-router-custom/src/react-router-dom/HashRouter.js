import React, {PureComponent} from 'react';
import {Provider} from './context';

export default class HashRouter extends PureComponent {

    constructor(props) {
        super(props);

        this.state = {
            history: {
                push: (to) => {
                    window.location.hash = to;
                },
            },
            location: {
                pathname: window.location.hash.slice(1) || '/',
            },
            match: {},
        }
    }

    componentDidMount() {
        // 默认hash没有时跳转到'/'
        window.location.hash = window.location.hash || '/';
        // 监听hash值变化 重新设置状态
        window.addEventListener('hashchange', () => {
            this.setState({
                location: {
                    ...this.state.location,
                    pathname: window.location.hash.slice(1) || '/',
                }
            })
        })
    }

    render() {
        return (
            <Provider value={this.state}>
                {this.props.children}
            </Provider>
        );
    }
}