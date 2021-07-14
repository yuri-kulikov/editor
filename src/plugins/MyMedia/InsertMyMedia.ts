import Command from '@ckeditor/ckeditor5-core/src/command';

import { SchemaItemName } from './MyMediaEditing';

export default class InsertMyMediaCommand extends Command {
  execute() {
    const model = this.editor.model;

    model.change(writer => {
      const selection = model.document.selection;

      const element = writer.createElement(SchemaItemName.MyMedia);

      writer.setSelection(
        model.insertContent(element, selection.getLastPosition(), 'after'),
      );
    });
  }

  refresh() {
    const model = this.editor.model;
    const selection = model.document.selection;
    const allowedIn = model.schema.findAllowedParent(
      selection.getFirstPosition() as any,
      SchemaItemName.MyMedia,
    );

    this.isEnabled = allowedIn !== null;
  }
}
