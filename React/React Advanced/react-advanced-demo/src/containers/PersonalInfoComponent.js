import React, {useState} from "react";
// isMounted 用于记录是否已挂载（是否是首次渲染）
let isMounted = false;

function PersonalInfoComponent() {
    let name, age, career, setName;
    console.log("isMounted is", isMounted);
    // if (!isMounted) {
    //     // eslint-disable-next-line
    //     [name, setName] = useState("修言");
    //     // eslint-disable-next-line
    //     [age] = useState("99");
    //     isMounted = true;
    // }

    [name, setName] = useState("修言");
    [age] = useState("99");

    [career] = useState("我是一个前端，爱吃小熊饼干");
    console.log("career", career);

    return (
        <div>
            <p>姓名：{name}</p>
            <p>年龄：{age}</p>
            <p>职业：{career}</p>
            <button onClick={() => setName("秀妍")}>修改姓名</button>
        </div>
    );
}

export default PersonalInfoComponent;
