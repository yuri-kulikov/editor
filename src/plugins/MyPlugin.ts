import Plugin from '@ckeditor/ckeditor5-core/src/plugin';
import imageIcon from '@ckeditor/ckeditor5-core/theme/icons/image.svg';
import Image from '@ckeditor/ckeditor5-image/src/image';
import ButtonView from '@ckeditor/ckeditor5-ui/src/button/buttonview';

class MyPlugin extends Plugin {
  static get pluginName() {
    return 'MyPlugin';
  }

  static get requires() {
    return [Image];
  }

  init() {
    const editor = this.editor;
    const modelDocument = editor.model.document;

    editor.ui.componentFactory.add('myButton', locale => {
      const view = new ButtonView(locale);

      view.set({
        label: 'Insert Image',
        icon: imageIcon,
        tooltip: true,
      });

      // Callback executed once the image is clicked.
      view.on('execute', () => {
        // eslint-disable-next-line no-alert
        const imageUrl = prompt('Image Url');

        editor.model.change(writer => {
          if (!imageUrl) {
            return;
          }

          const imageElement = writer.createElement('image', {
            src: imageUrl,
          });

          // Inserting an image might've failed due to schema regulations.
          if (imageElement.parent) {
            writer.setSelection(imageElement, 'on');
          }

          // Insert the image in the current selection location.
          editor.model.insertContent(imageElement, modelDocument.selection);
        });
      });

      return view;
    });
  }
}

export default MyPlugin;
