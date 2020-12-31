// import { tinymce } from 'tinymce/tinymce';
import * as tinyMCE from 'tinymce/tinymce';
// import tinymce from 'tinymce/tinymce';
import * as Api from './api/Api';
import { Cell } from '@ephox/katamari';
import * as Sidebar from './ui/Sidebar';
import * as Commands from './api/Commands';
import * as Events from './api/Events';
import { ScrollInfo } from './core/Actions';

declare const tinymce: any;

export default () => {
  tinymce.PluginManager.add('page-bulider', (editor: tinyMCE.Editor) => {
    const fullscreenState = Cell<ScrollInfo | null>(null);

    if (editor.inline) {
      return Api.get(fullscreenState);
    }
    
    Events.operationInit(editor);
    Sidebar.register(editor,fullscreenState);
  });

};
