import React from "react";

export default class LifeCycle16 extends React.Component {

    constructor(props) {
        console.log("进入constructor");
        super(props);
        // state 可以在 constructor 里初始化
        this.state = {text: "子组件的文本"};
    }

    // 初始化/更新时调用
    static getDerivedStateFromProps(props, state) {
        console.log("getDerivedStateFromProps方法执行");
        return {
            fatherText: props.text
        }
    }

    // 初始化渲染时调用
    componentDidMount() {
        console.log("componentDidMount方法执行");
    }

    // 组件更新时调用
    shouldComponentUpdate(prevProps, nextState) {
        console.log("shouldComponentUpdate方法执行");
        return true;
    }

    // 组件更新时调用
    getSnapshotBeforeUpdate(prevProps, prevState) {
        console.log("getSnapshotBeforeUpdate方法执行");
        return "haha";
    }

    // 组件更新后调用
    componentDidUpdate(preProps, preState, valueFromSnapshot) {
        console.log("componentDidUpdate方法执行");
        console.log("从 getSnapshotBeforeUpdate 获取到的值是", valueFromSnapshot);
    }

    // 组件卸载时调用
    componentWillUnmount() {
        console.log("子组件的componentWillUnmount方法执行");
    }

    // 点击按钮，修改子组件文本内容的方法
    changeText = () => {
        this.setState({
            text: "修改后的子组件文本"
        });
    };

    render() {
        console.log("render方法执行");

        return (
            <div className="container">
                <button onClick={this.changeText} className="changeText">
                    修改子组件文本内容
                </button>
                <p className="textContent">{this.state.text}</p>
                <p className="fatherContent">{this.props.text}</p>
            </div>
        );
    }
}
