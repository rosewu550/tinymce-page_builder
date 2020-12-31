import * as tinyMCE from 'tinymce/tinymce';

const get = function (fullscreenState) {
  return {
    isFullscreen() {
      return fullscreenState.get() !== null;
    }
  };
};

const holdOnBody = (editor:tinyMCE.Editor):void => {
  const $tinymce = editor.$(),
  container = editor.getContainer(),
  containerHeight = container.offsetHeight;
  $tinymce.css('height',`${containerHeight}px`);
}

const resetBody = (editor:tinyMCE.Editor):void => {
  const tinymceBody = editor.getBody();
  tinymceBody.style.cssText = `height:0px`;
}

export {
  get,
  resetBody,
  holdOnBody
};