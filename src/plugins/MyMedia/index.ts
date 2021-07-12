import Plugin from '@ckeditor/ckeditor5-core/src/plugin';

import MyMediaEditing from './MyMediaEditing';
import MyMediaUI from './MyMediaUI';

export default class MyMedia extends Plugin {
  static get requires() {
    return [MyMediaEditing, MyMediaUI];
  }
}
