declare const tinymce: any;

const setup = (editor, url) => {
  editor.ui.registry.addButton('page-bulider', {
    text: 'page-bulider button',
    onAction: () => {
      // tslint:disable-next-line:no-console
      editor.setContent('<p>content added from page-bulider</p>');
    }
  });
};

export default () => {
  tinymce.PluginManager.add('page-bulider', setup);
};
