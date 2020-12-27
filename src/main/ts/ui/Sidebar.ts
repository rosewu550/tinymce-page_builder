import * as tinyMCE from "tinymce/tinymce";

const register = (editor: tinyMCE.Editor) => {
    editor.ui.registry.addSidebar('mysidebar',{
        tooltip: 'my siderbar',
        icon: 'comment',
        onSetup: () => (api) => {
           return () => {
            console.log(api.element());
            console.log("test");
           }
        }

    })
};


export {
    register
};