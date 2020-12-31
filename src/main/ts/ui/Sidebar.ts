import * as Api from '../api/Api';
import { Cell } from '@ephox/katamari';
import * as Utils from '../utils/Utils';
import * as tinyMCE from 'tinymce/tinymce';
import * as Commands from '../api/Commands';
import * as threeContainer from './threeContainer';
import * as Template from '../template/htmlTemplate';
import { Css, SugarElement, Attribute, SugarElements } from '@ephox/sugar';
import { either } from '@ephox/agar/lib/main/ts/ephox/agar/assertions/ApproxStructures';

const makeSetupHandler = (editor, fullscreenState: Cell<object>) => (api) => {
    Commands.register(editor, fullscreenState); // 启用全屏显示

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
        'min-width': '200px',
        background: 'rgba(243, 243, 247,.3)'
    });
    api.element().appendChild(box.dom);
    threeContainer.register();

    return () => {
        api.element().removeChild(box.dom);
    }
};

const register = (editor: tinyMCE.Editor, fullscreenState: Cell<object>) => {
    editor.ui.registry.addSidebar('content_template', {
        tooltip: '新建模板',
        icon: 'new-document',
        onSetup: makeSetupHandler(editor, fullscreenState),
        onShow: Utils.debounce((api) => {
            Api.holdOnBody(editor);
        }, 500),
        onHide: (api) => {
            if (editor.initialized) {
                Api.resetBody(editor);
            }
        }
    });
};

export {
    register
};