import * as tinyMCE from 'tinymce/tinymce';
import * as Actions from '../core/Actions';
import { Cell } from '@ephox/katamari';
;

const register = (editor: tinyMCE.Editor, fullscreenState: Cell<any>) => {
  editor.addCommand('mceFullScreen', () => {
    Actions.toggleFullscreen(editor, fullscreenState);
  });
};

export {
  register
};
