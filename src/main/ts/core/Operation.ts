import tinymce from 'tinymce/tinymce';
import * as tinyMCE from 'tinymce/tinymce';
import { SugarElement } from '@ephox/sugar';


declare const document: any;


const locationTooltip = () => {
    const operationArea = document.querySelector("body#tinymce");

    operationArea.addEventListener('dragenter', (e) => {
        console.log(e);

    }, false);
};

const dropComponent = (targetElement, templateElement: SugarElement) => {
    if (targetElement && templateElement) {  
        targetElement.after(templateElement);
    }
}

export {
    dropComponent,
    locationTooltip
}