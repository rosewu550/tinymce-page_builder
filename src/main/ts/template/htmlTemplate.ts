const rightSideBarTemplate = () => {
    let template = `
    <div class = 'multiTab'>
        <ul>
            <li>组件</li>
            <li>属性</li>
            <li>其他</li>
        </ul>
    </div> 
    <div class = 'component'>
        <div draggable = "true" build-type = "three_container"><h1>1行1列</h1></div>
        <div draggable = "true" build-type = "three_container"><h1>1行2列</h1></div>
        <div draggable = "true" build-type = "three_container"><h1>1行3列</h1></div>
        <div draggable = "true" build-type = "three_container"><h1>普通文本</h1></div>
        <div draggable = "true" build-type = "three_container"><h1>表格</h1></div>
        <div draggable = "true" build-type = "three_container"><h1>代码块</h1></div>
    </div>
    `;
    return template.trim();
}

const oneRowOneColum = () => {
    let template = `<div id = 'three_container'>
                        <div class = 'left'></div>
                        <div class = 'center'></div>
                        <div class = 'right'></div>
                    </div>`;
    return template.trim();
}

export {
    rightSideBarTemplate,
    oneRowOneColum
};