import React from 'react';
import LifeCycle15 from '../components/lifeCycle15';
import LifeCycle16 from '../components/lifeCycle16';

export default class LifeCycleContainer extends React.Component {

    // state 也可以像这样用属性声明的形式初始化
    state = {
        text: "父组件的文本",
        //新增的只与父组件有关的 state
        ownText: "仅仅和父组件有关的文本",
        hideChild: false,
    };

    // 点击按钮，修改父组件文本的方法
    changeText = () => {
        this.setState({
            text: "修改后的父组件文本"
        });
    };

    // 点击按钮，隐藏（卸载）LifeCycle15 组件的方法
    hideChild = () => {
        this.setState({
            hideChild: true
        });
    };

    changeOwnText = e => {
        console.log('原生 DOM 事件是', e.nativeEvent);
        this.setState({
            ownText: "修改后的父组件自有文本"
        });
    };

    render() {

        return (
            <div className="fatherContainer">
                <button onClick={this.changeOwnText} className="changeText">
                    修改父组件自有文本内容
                </button>
                <button onClick={this.changeText} className="changeText">
                    修改父组件文本内容
                </button>
                <button onClick={this.hideChild} className="hideChild">
                    隐藏子组件
                </button>
                <p>{this.state.ownText}</p>
                {this.state.hideChild ? null : <LifeCycle16 text={this.state.text}/>}
            </div>
        );
    }
}