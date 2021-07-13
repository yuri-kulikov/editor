import { cleanObject } from '@/utils/cleanObject';
import Command from '@ckeditor/ckeditor5-core/src/command';

import { SchemaItemName } from './MyMediaEditing';

export default class UpdateSelectedImage extends Command {
  refresh() {
    const selection = this.editor.model.document.selection;
    const element = selection.getSelectedElement();

    this.isEnabled = this._isMyMediaElement(element);

    if (element && this.isEnabled) {
      this.value = cleanObject({
        src: element.getAttribute('src'),
        alt: element.getAttribute('alt'),
      });
    } else {
      this.value = undefined;
    }
  }

  /**
   * Executes the command.
   *
   * @fires execute
   * @param {Object} options
   * @param {String} options.src The new value of the `src` attribute to set.
   * @param {String} options.alt The new value of the `alt` attribute to set.
   */
  execute(options) {
    if (
      !options ||
      (typeof options.src !== 'string' && typeof options.alt !== 'string')
    )
      {return;}
    const editor = this.editor;
    const model = editor.model;
    const selection = this.editor.model.document.selection;
    const element = selection.getSelectedElement();

    if (!this._isMyMediaElement(element) || !element) {return;}

    model.change(writer => {
      if (typeof options.src === 'string') {
        writer.setAttribute('src', options.src, element);
      }
      if (typeof options.alt === 'string') {
        writer.setAttribute('alt', options.alt, element);
      }
    });
  }

  _isMyMediaElement(element) {
    return !!element && element.name === SchemaItemName.MyMedia;
  }
}
