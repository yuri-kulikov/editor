import { cleanObject } from '@/utils/cleanObject';
import Plugin from '@ckeditor/ckeditor5-core/src/plugin';
import { toWidget } from '@ckeditor/ckeditor5-widget/src/utils';

import InsertMyMediaCommand from './InsertMyMedia';
import { myImgRenderer } from './myImgRenderer';
import UpdateSelectedImage from './UpdateSelectedImage';

export enum SchemaItemName {
  MyMedia = 'myMedia',
}

export enum MyMediaCommandName {
  UpdateSelectedImage = 'updateSeectedImage',
  InsertMyMedia = 'insertMyMedia',
}

export default class MyMediaEditing extends Plugin {
  init() {
    console.log('MyMediaEditing#init() got called');

    this._defineSchema();
    this._defineConverters();

    this.editor.commands.add(
      MyMediaCommandName.UpdateSelectedImage,
      new UpdateSelectedImage(this.editor),
    );

    this.editor.commands.add(
      MyMediaCommandName.InsertMyMedia,
      new InsertMyMediaCommand(this.editor),
    );

    const editor = this.editor;
    // const view = editor.editing.view;
    const editorModel = editor.model;
    const modelDocument = editorModel.document;

    modelDocument.on('change', () => {
      const selectedContent = editorModel
        .getSelectedContent(modelDocument.selection)
        .toJSON();

      const onMyImageSelect = editor.config.get('myMedia').onMyImageSelect;

      if (!Array.isArray(selectedContent) || selectedContent.length !== 1) {
        onMyImageSelect();
        return;
      }

      const node = selectedContent[0];
      if (node.name !== SchemaItemName.MyMedia) {
        return;
      }

      onMyImageSelect({
        src: node.attributes?.src,
        alt: node.attributes?.alt,
        path: JSON.stringify(modelDocument.selection.getFirstPosition()?.path),
      });
    });
  }

  private _defineSchema() {
    const schema = this.editor.model.schema;

    schema.register(SchemaItemName.MyMedia, {
      isLimit: true,
      // Behaves like a self-contained object (e.g. an image).
      isObject: true,

      // Allow in places where other blocks are allowed (e.g. directly in the root).
      allowWhere: '$block',
      allowAttributes: ['alt', 'src'],
    });
  }

  private _defineConverters() {
    // model: <myMedia src="" alt="" />
    // data: <img src="" alt="" class="myImg">
    // editing: <section class="myImg"><Icon /></section>

    const editor = this.editor;
    const conversion = editor.conversion;

    // <myMedia> converters ((data) view → model)
    conversion.for('upcast').elementToElement({
      view: {
        name: 'img',
        classes: 'myImg',
      },
      model: (viewElement, { writer: modelWriter }) => {
        const src = viewElement.getAttribute('src');
        const alt = viewElement.getAttribute('alt');

        return modelWriter.createElement(
          SchemaItemName.MyMedia,
          cleanObject({ src, alt }),
        );
      },
    } as any);

    // <myMedia> converters (model → data view)
    conversion.for('dataDowncast').elementToElement({
      model: SchemaItemName.MyMedia,
      view: (modelElement, { writer: viewWriter }) =>
        viewWriter.createEmptyElement(
          'img',
          cleanObject({
            class: 'myImg',
            src: modelElement.getAttribute('src'),
            alt: modelElement.getAttribute('alt'),
          }),
        ),
    } as any);

    // <myMedia> converters (model → editing view)
    conversion.for('editingDowncast').elementToElement({
      model: SchemaItemName.MyMedia,
      view: (modelElement, { writer: viewWriter }) => {
        const section = viewWriter.createContainerElement('section', {
          class: 'myImg',
        });

        const onMyImageClick = editor.config.get('myMedia').onMyImageClick;

        const reactWrapper = viewWriter.createRawElement(
          'div',
          {
            class: 'myImg__react-wrapper',
          },
          domElement => myImgRenderer(domElement, onMyImageClick),
        );

        viewWriter.insert(
          viewWriter.createPositionAt(section, 0),
          reactWrapper,
        );

        return toWidget(section, viewWriter, { label: 'my widget' });
      },
    } as any);
  }
}
