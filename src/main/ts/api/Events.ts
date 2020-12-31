import * as Utils from '../utils/Utils';
import * as tinyMCE from 'tinymce/tinymce';
import { SugarElement } from '@ephox/sugar';
import * as Operation from '../core/Operation';

const fireFullscreenStateChanged = function (editor, state) {
  editor.fire('FullscreenStateChanged', { state });
};

const operationInit = (editor: tinyMCE.Editor) => {
  editor.on('init', (e) => {
    const $tinymce = e.target.$(),
    tinymceBody = e.target.getBody(),
    tinymceBodyHeight = tinymceBody.offsetHeight;

    $tinymce.attr('draggable', 'true');
    $tinymce.on('dragover', (e) => {
      if (e.preventDefault) {
        e.preventDefault();
      }
      return false;
    });

    $tinymce.on('drop', (e) => {
      if (e.stopPropagation) {
        e.stopPropagation();
      }
      const htmlStr = e.dataTransfer.getData('text/html');
      const threeContainer = SugarElement.fromHtml(htmlStr);
      const $current = e.toElement;
      Operation.dropComponent($current,threeContainer.dom);
      return false;
    });

    $tinymce.on('dragenter', Utils.debounce((e) => {
    }, 500));
  });

  editor.on('ToggleSidebar',(e) => {
    editor.execCommand('mceFullScreen');
  });
}

export {
  operationInit,
  fireFullscreenStateChanged
};
