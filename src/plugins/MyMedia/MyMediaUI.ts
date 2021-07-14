import Plugin from '@ckeditor/ckeditor5-core/src/plugin';
import imageIcon from '@ckeditor/ckeditor5-core/theme/icons/image.svg';
import ButtonView from '@ckeditor/ckeditor5-ui/src/button/buttonview';

import { MyMediaCommandName } from './MyMediaEditing';

export default class MyMediaUI extends Plugin {
  init() {
    console.log('MyMediaUI#init() got called');

    const editor = this.editor;

    editor.ui.componentFactory.add('myButton', locale => {
      const view = new ButtonView(locale);

      view.set({
        label: 'Insert Image',
        icon: imageIcon,
        tooltip: true,
      });

      const command = editor.commands.get(MyMediaCommandName.InsertMyMedia);
      if (!command) {
        return;
      }

      view.bind('isEnabled').to(command as any);

      this.listenTo(view, 'execute', () =>
        editor.execute(MyMediaCommandName.InsertMyMedia),
      );

      return view;
    });
  }
}
