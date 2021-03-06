import MyMedia, { MediaType } from '@/models/MyMedia';
import { cleanObject } from '@/utils/cleanObject';
import Plugin from '@ckeditor/ckeditor5-core/src/plugin';
import { toWidget } from '@ckeditor/ckeditor5-widget/src/utils';

import { InsertMyImgCommand, InsertMyVideoCommand } from './InsertMyMedia';
import { myImgRenderer, myVideoRenderer } from './renderers';
import UpdateSelectedMedia from './UpdateSelectedMedia';

export enum SchemaItemName {
  MyImg = 'myImg',
  MyVideo = 'myVideo',
}

export enum MyMediaCommandName {
  UpdateSelectedMedia = 'updateSelectedMedia',
  InsertMyImg = 'insertMyImg',
  InsertMyVideo = 'insertMyVideo',
}

export default class MyMediaEditing extends Plugin {
  init() {
    console.log('MyMediaEditing#init() got called');

    this._defineSchema();
    this._defineConverters();

    this.editor.commands.add(
      MyMediaCommandName.UpdateSelectedMedia,
      new UpdateSelectedMedia(this.editor),
    );

    this.editor.commands.add(
      MyMediaCommandName.InsertMyImg,
      new InsertMyImgCommand(this.editor),
    );

    this.editor.commands.add(
      MyMediaCommandName.InsertMyVideo,
      new InsertMyVideoCommand(this.editor),
    );

    const editor = this.editor;
    const editorModel = editor.model;
    const modelDocument = editorModel.document;

    modelDocument.on('change', () => {
      const selectedContent = editorModel
        .getSelectedContent(modelDocument.selection)
        .toJSON();

      const onMyMediaSelect: (media?: Maybe<MyMedia>) => void =
        editor.config.get('myMedia').onMyMediaSelect;

      if (!Array.isArray(selectedContent) || selectedContent.length !== 1) {
        onMyMediaSelect();
        return;
      }

      const node = selectedContent[0];
      if (
        node.name !== SchemaItemName.MyImg &&
        node.name !== SchemaItemName.MyVideo
      ) {
        return;
      }
      if (node.name === SchemaItemName.MyImg) {
        onMyMediaSelect({
          type: MediaType.Img,
          src: node.attributes?.src,
          alt: node.attributes?.alt,
          path: JSON.stringify(
            modelDocument.selection.getFirstPosition()?.path,
          ),
        });
      } else if (node.name === SchemaItemName.MyVideo) {
        onMyMediaSelect({
          type: MediaType.Video,
          src: node.attributes?.src,
          alt: node.attributes?.alt,
          path: JSON.stringify(
            modelDocument.selection.getFirstPosition()?.path,
          ),
        });
      }
    });
  }

  private _defineSchema() {
    const schema = this.editor.model.schema;

    schema.register(SchemaItemName.MyImg, {
      isLimit: true,
      isObject: true,
      allowWhere: '$block',
      allowAttributes: ['alt', 'src'],
    });

    schema.register(SchemaItemName.MyVideo, {
      isLimit: true,
      isObject: true,
      allowWhere: '$block',
      allowAttributes: ['alt', 'src'],
    });
  }

  private _defineConverters() {
    // model: <myImg src="" alt="" />
    // data: <img src="" alt="" class="myImg">
    // editing: <section class="myImg"><Icon /></section>

    const editor = this.editor;
    const conversion = editor.conversion;

    // <myImg> converters ((data) view ??? model)
    conversion.for('upcast').elementToElement({
      view: {
        name: 'img',
        classes: 'myImg',
      },
      model: (viewElement, { writer: modelWriter }) => {
        const src = viewElement.getAttribute('src');
        const alt = viewElement.getAttribute('alt');

        return modelWriter.createElement(
          SchemaItemName.MyImg,
          cleanObject({ src, alt }),
        );
      },
    } as any);

    // <myImg> converters (model ??? data view)
    conversion.for('dataDowncast').elementToElement({
      model: SchemaItemName.MyImg,
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

    // <myImg> converters (model ??? editing view)
    conversion.for('editingDowncast').elementToElement({
      model: SchemaItemName.MyImg,
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

        return toWidget(section, viewWriter, { label: 'Image' });
      },
    } as any);

    // model: <myVideo alt="" src="" />
    // data: <img src="" alt="" class="myVideo">
    // editing: <section class="myVideo"><Icon /></section>

    // <myVideo> converters ((data) view ??? model)
    conversion.for('upcast').elementToElement({
      view: {
        name: 'img',
        classes: 'myVideo',
      },
      model: (viewElement, { writer: modelWriter }) => {
        const src = viewElement.getAttribute('src');
        const alt = viewElement.getAttribute('alt');

        return modelWriter.createElement(
          SchemaItemName.MyVideo,
          cleanObject({
            alt,
            src,
          }),
        );
      },
    } as any);

    // <myVideo> converters (model ??? data view)
    conversion.for('dataDowncast').elementToElement({
      model: SchemaItemName.MyVideo,
      view: (modelElement, { writer: viewWriter }) =>
        viewWriter.createEmptyElement(
          'img',
          cleanObject({
            class: 'myVideo',
            src: modelElement.getAttribute('src'),
            alt: modelElement.getAttribute('alt'),
          }),
        ),
    } as any);

    // <myVideo> converters (model ??? editing view)
    conversion.for('editingDowncast').elementToElement({
      model: SchemaItemName.MyVideo,
      view: (modelElement, { writer: viewWriter }) => {
        const section = viewWriter.createContainerElement('section', {
          class: 'myVideo',
        });

        const onMyVideoClick = editor.config.get('myMedia').onMyVideoClick;

        const reactWrapper = viewWriter.createRawElement(
          'div',
          {
            class: 'myVideo__react-wrapper',
          },
          domElement => myVideoRenderer(domElement, onMyVideoClick),
        );

        viewWriter.insert(
          viewWriter.createPositionAt(section, 0),
          reactWrapper,
        );

        return toWidget(section, viewWriter, { label: 'Video' });
      },
    } as any);
  }
}
