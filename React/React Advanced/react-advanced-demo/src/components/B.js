// 注意这个 myEvent 是提前实例化并挂载到全局的，此处不再重复示范实例化过程
import React from 'react';

export default class B extends React.Component {

    // 这里省略掉其他业务逻辑
    state = {
        newParams: ""
    };

    handler = (params) => {
        this.setState({
            newParams: params
        });
    };

    bindHandler = () => {
        //订阅
        global.eventEmitter.on("someEvent", this.handler);
    };

    render() {

        return (
            <div>
                <button onClick={this.bindHandler}>点我监听A的动作</button>
                <div>A传入的内容是[{this.state.newParams}]</div>
            </div>
        );
    }
}
