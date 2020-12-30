import * as tinyMCE from 'tinymce/tinymce';
import * as threeContainer from './threeContainer';
import * as Template from '../template/htmlTemplate';
import { Css, SugarElement, Attribute, SugarElements } from '@ephox/sugar';

const register = (editor: tinyMCE.Editor) => {
    editor.ui.registry.addSidebar('content_template', {
        tooltip: '新建模板',
        icon: 'new-document',
        onSetup: (api) => {
            const box = SugarElement.fromTag('div');
            Attribute.setAll(box, {
                id: 'template_main'
            });

            const childBoxes = SugarElements.fromHtml(Template.rightSideBarTemplate());
            childBoxes.forEach((childBox) => {
                box.dom.append(childBox.dom);
            });

            Css.setAll(box, {
                width: '20vw',
                'min-width':'200px',
                background: 'rgba(243, 243, 247,.3)'
            });

            editor.execCommand('mceFullScreen'); // 默认开启全屏
            api.element().appendChild(box.dom);

            threeContainer.register();
            return () => {
                api.element().removeChild(box.dom);
            };
        }
    });
};

export {
    register
};