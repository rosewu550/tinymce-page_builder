import * as Template from "../template/htmlTemplate";
declare const document: any;

const register = () => {
    const threeContainerDoms = document.querySelectorAll('div[build-type = "three_container"]');

    threeContainerDoms.forEach((item) => {
        item.addEventListener('dragstart', (e) => {
            e.currentTarget.style.opacity = '0.4';
            e.dataTransfer.effectAllowed = 'move';
            e.dataTransfer.setData('text/html', Template.oneRowOneColum());
        }, false);

        item.addEventListener('dragenter',(e) => {
            console.log(e);

        });

        item.addEventListener('dragend', (e) => {
            e.currentTarget.style.opacity = '1';
        }, false);
    });
};

export {
    register
};