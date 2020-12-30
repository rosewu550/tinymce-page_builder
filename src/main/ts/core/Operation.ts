declare const document: any;

const locationTooltip = () => {
    const operationArea = document.querySelector("body#tinymce");

    operationArea.addEventListener('dragenter', (e) => {
        console.log(e);

    }, false);

    // operationArea.forEach((item) => {
     

    // });


}

export {
    locationTooltip
}