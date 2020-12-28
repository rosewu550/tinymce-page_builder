import * as tinyMCE from 'tinymce/tinymce';
import tinymce from 'tinymce/tinymce';
import { Cell } from '@ephox/katamari';
import * as Api from './api/Api';
import * as Commands from './api/Commands';
import * as Buttons from './ui/Buttons';
import * as Sidebar from './ui/Sidebar';



const setup = (editor: tinyMCE.Editor, url:String) => {
  editor.ui.registry.addButton('page-bulider', {
    text: 'page-builder button',
    onAction: () => {
      editor.windowManager.open({
        title: 'test',
        size: 'large',
        body: {
            type:"panel",
            items:[]
          }                                                           
        ,
        buttons:[{
          type: 'submit',
          text:'确认'
        }],
        onSubmit: e => {
          editor.insertContent('Title: ' + e.getData.name);
         e.close();
        }

      });
      editor.setContent('<p>haha content added from page-bulider</p>');
    }
  });
};

export default () => {
  // tinymce.PluginManager.add('page-bulider', setup);

  tinymce.PluginManager.add('fullscreen', (editor) => {
    const fullscreenState: Cell<any> = Cell(null);

    if (editor.inline) {
      return Api.get(fullscreenState);
    }

    Commands.register(editor, fullscreenState);
    Buttons.register(editor, fullscreenState);
    Sidebar.register(editor);
    editor.addShortcut('Meta+Shift+F', '', 'mceFullScreen');
    
    return Api.get(fullscreenState);
  });

  // tinymce.activeEditor.$()
};
