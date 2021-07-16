import Plugin from '@ckeditor/ckeditor5-core/src/plugin';
import imageIcon from '@ckeditor/ckeditor5-core/theme/icons/image.svg';
import mediaIcon from '@ckeditor/ckeditor5-media-embed/theme/icons/media.svg';
import ButtonView from '@ckeditor/ckeditor5-ui/src/button/buttonview';
import { addToolbarToDropdown, createDropdown } from '@ckeditor/ckeditor5-ui/src/dropdown/utils';

import { MyMediaCommandName } from './MyMediaEditing';

export default class MyMediaUI extends Plugin {
  init() {
    console.log('MyMediaUI#init() got called');

    const editor = this.editor;

    editor.ui.componentFactory.add('myMediaDropdown', locale => {
      const dropdown = (createDropdown as any)(locale);

      dropdown.buttonView.set({
        label: 'Insert Media',
        withText: true,
      });

      // Insert Image
      const insertImageButton = new ButtonView(locale);

      insertImageButton.set({
        label: 'Insert Image',
        icon: imageIcon,
        tooltip: true,
        withText: true,
      });

      const insertMyImgCommand = editor.commands.get(
        MyMediaCommandName.InsertMyImg,
      );
      if (!insertMyImgCommand) {
        return;
      }

      insertImageButton.bind('isEnabled').to(insertMyImgCommand as any);

      this.listenTo(insertImageButton, 'execute', () =>
        editor.execute(MyMediaCommandName.InsertMyImg),
      );

      // Insert Image
      const insertVideoButton = new ButtonView(locale);

      insertVideoButton.set({
        label: 'Insert Video',
        icon: mediaIcon,
        tooltip: true,
        withText: true,
      });

      const insertMyVideoCommand = editor.commands.get(
        MyMediaCommandName.InsertMyVideo,
      );
      if (!insertMyVideoCommand) {
        return;
      }

      insertVideoButton.bind('isEnabled').to(insertMyVideoCommand as any);

      this.listenTo(insertVideoButton, 'execute', () =>
        editor.execute(MyMediaCommandName.InsertMyVideo),
      );

      addToolbarToDropdown(dropdown, [insertImageButton, insertVideoButton]);

      dropdown.toolbarView.isVertical = true;

      return dropdown;
    });
  }
}
