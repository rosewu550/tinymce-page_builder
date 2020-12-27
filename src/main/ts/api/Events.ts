import * as tinyMCE from 'tinymce/tinymce';



const fireFullscreenStateChanged = function (editor: tinyMCE.Editor, state) {
    editor.fire('FullscreenStateChanged', { state });
  };
  
  export {
    fireFullscreenStateChanged
  };
  