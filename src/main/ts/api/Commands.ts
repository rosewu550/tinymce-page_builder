import * as Actions from '../core/Actions';
import { Cell } from '@ephox/katamari';

const register = (editor, fullscreenState: Cell<any>) => {
  editor.addCommand('mceFullScreen', () => {
    Actions.toggleFullscreen(editor, fullscreenState);
  });
};

export {
  register
};
