import Plugin from '../../main/ts/Plugin';
// import tinymce from 'tinymce/tinymce';
import { SugarElements } from '@ephox/sugar';
import * as Utils from '../../main/ts/utils/Utils';

declare const window: any;
declare const tinymce: any;

Plugin();

tinymce.init({
  selector: 'div.tinymce',
  plugins: 'code fullscreen',
  toolbar: 'content_template',
  content_css: '../../asset/sass/template.css',
  menubar: false
});




window.onload = () => {
  const $tinymce = tinymce.activeEditor.$();
  $tinymce.css('height', '80vh');

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

    e.dataTransfer.dropEffect = 'copy';
    const htmlStr = e.dataTransfer.getData('text/html');
    const threeContainer = SugarElements.fromHtml(htmlStr);

    const $current = e.toElement;
    threeContainer.forEach((childBox) => {
      $current.append(childBox.dom);
    });

    return false;
  });

  $tinymce.on('dragenter', Utils.debounce((e) => {
    console.log(e);
  }, 500), false);

};