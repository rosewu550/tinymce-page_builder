import Plugin from '../../main/ts/Plugin';
import tinymce from 'tinymce/tinymce';

declare const window: any;
// declare const tinymce: any;

Plugin();

tinymce.init({
  selector: 'div.tinymce',
  plugins: 'code page-bulider',
  toolbar: 'content_template',
  content_css: '../../asset/sass/template.css',
  menubar: false,
  height:'600px'
});
