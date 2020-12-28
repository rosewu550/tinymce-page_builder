declare const document: any;


const register = () => {
    let threeContainerDoms = document.querySelectorAll('div[build-type = "three_container"]')

    threeContainerDoms.forEach((item) => {
        item.addEventListener('dragstart', (e) => {
            
            e.currentTarget.style.opacity = '0.4';
            e.dataTransfer.effectAllowed = 'move';
            e.dataTransfer.setData('text/html', "");
        }, false);

        item.addEventListener('dragend', (e) => {
            e.currentTarget.style.opacity = '1';
        }, false);

        item.addEventListener('drop', (e) => {
            if (e.stopPropagation) {
                e.stopPropagation();
            }

            const htmlStr = e.dataTransfer.getData('text/html');
            e.currentTarget.append(htmlStr);

            return false;
        }, false);
    });


}


export {
    register
};