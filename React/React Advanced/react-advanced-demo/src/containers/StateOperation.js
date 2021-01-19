import React from 'react';

export default class StateOperation extends React.Component {

    state = {
        count: 0
    }

    increment = () => {
        console.log('increment setState前的count', this.state.count)
        this.setState({count: this.state.count + 1});
        console.log('increment setState后的count', this.state.count)
    }

    triple = () => {
        console.log('triple setState前的count', this.state.count)
        this.setState({count: this.state.count + 1});
        this.setState({count: this.state.count + 1});
        this.setState({count: this.state.count + 1});
        console.log('triple setState后的count', this.state.count)
    }

    reduce = () => {
        setTimeout(() => {
            console.log('reduce setState前的count', this.state.count)
            this.setState({count: this.state.count - 1});
            console.log('reduce setState后的count', this.state.count)
        }, 0);
    }

    render() {
        return <div>
            <button onClick={this.increment}>点我增加</button>
            <button onClick={this.triple}>点我增加三倍</button>
            <button onClick={this.reduce}>点我减少</button>
        </div>
    }
}
