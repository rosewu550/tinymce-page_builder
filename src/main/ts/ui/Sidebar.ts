import * as tinyMCE from "tinymce/tinymce";
import * as threeContainer from './threeContainer';
import { Css, SugarElement, Attribute, SugarElements } from '@ephox/sugar';

const component_name = '表格';

const register = (editor: tinyMCE.Editor) => {
    editor.ui.registry.addSidebar('content_template', {
        tooltip: '新建模板',
        icon: 'new-document',
        onSetup: (api: tinyMCE.Ui.Sidebar.SidebarInstanceApi) => {

            const box = SugarElement.fromTag('div');
            var child_box_str = '';
            var template = `<div draggable = "true" build-type = "three_container"><h1>${component_name}</h1></div>`;
            for (let i = 0; i < 8; i++) {
                child_box_str += template
            }
            const child_boxs = SugarElements.fromHtml(child_box_str);
            child_boxs.forEach(child_box => {
                box.dom.append(child_box.dom);
            })

            Attribute.setAll(box, {
                id: 'template_main'
            });

            Css.setAll(box, {
                width: '300' + 'px',
                background: '#dcdfe6',
                border: '1px solid #dcdfe6'
            });

            editor.execCommand('mceFullScreen');//默认开启全屏
            api.element().appendChild(box.dom);

            threeContainer.register();
            return () => {
                api.element().removeChild(box.dom);
            };
        },
        onShow: () => {
           
        }
    })
};


export {
    register
};