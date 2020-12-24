import { either } from '@ephox/agar/lib/main/ts/ephox/agar/assertions/ApproxStructures';
import * as tinyMCE from '../../../node_modules/tinymce/tinymce';
import tinymce from '../../../node_modules/tinymce/tinymce';
// declare const tinymce: any;



const setup = (editor: tinyMCE.Editor, url) => {
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
  tinymce.PluginManager.add('page-bulider', setup);
};
