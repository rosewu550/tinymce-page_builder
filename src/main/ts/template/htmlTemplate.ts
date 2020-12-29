const rightSideBarTemplate = () => {
    let template = `
    <div draggable = "true" build-type = "three_container"><h1>1行1列</h1></div>
    <div draggable = "true" build-type = "three_container"><h1>1行2列</h1></div>
    <div draggable = "true" build-type = "three_container"><h1>1行3列</h1></div>
    <div draggable = "true" build-type = "three_container"><h1>普通文本</h1></div>
    <div draggable = "true" build-type = "three_container"><h1>表格</h1></div>
    <div draggable = "true" build-type = "three_container"><h1>代码块</h1></div>
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