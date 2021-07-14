import Command from '@ckeditor/ckeditor5-core/src/command';

import { SchemaItemName } from './MyMediaEditing';

export default class InsertMyMediaCommand extends Command {
  execute() {
    this.editor.model.change(writer => {
      // Insert <simpleBox>*</simpleBox> at the current selection position
      // in a way that will result in creating a valid model structure.
      this.editor.model.insertContent(
        writer.createElement(SchemaItemName.MyMedia),
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
