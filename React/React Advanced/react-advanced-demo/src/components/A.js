import React from 'react';

export default class A extends React.Component {
    // 这里省略掉其他业务逻辑
    state = {
        infoToB: "哈哈哈哈我来自A"
    };
    reportToB = () => {
        // 这里的 infoToB 表示 A 自身状态中需要让 B 感知的那部分数据
        //发布
        global.eventEmitter.emit("someEvent", this.state.infoToB);
    };

    render() {
        return <button onClick={this.reportToB}>点我把state传递给B</button>;
    }
}