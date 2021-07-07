import Autoformat from '@ckeditor/ckeditor5-autoformat/src/autoformat';
import Bold from '@ckeditor/ckeditor5-basic-styles/src/bold';
import Italic from '@ckeditor/ckeditor5-basic-styles/src/italic';
import BlockQuote from '@ckeditor/ckeditor5-block-quote/src/blockquote';
import ClassicEditor from '@ckeditor/ckeditor5-editor-classic/src/classiceditor';
import Essentials from '@ckeditor/ckeditor5-essentials/src/essentials';
import Heading from '@ckeditor/ckeditor5-heading/src/heading';
import AutoImage from '@ckeditor/ckeditor5-image/src/autoimage';
import Image from '@ckeditor/ckeditor5-image/src/image';
import ImageInsert from '@ckeditor/ckeditor5-image/src/imageinsert';
import ImageStyle from '@ckeditor/ckeditor5-image/src/imagestyle';
import Link from '@ckeditor/ckeditor5-link/src/link';
import List from '@ckeditor/ckeditor5-list/src/list';
import Markdown from '@ckeditor/ckeditor5-markdown-gfm/src/markdown';
import MediaEmbed from '@ckeditor/ckeditor5-media-embed/src/mediaembed';
import Paragraph from '@ckeditor/ckeditor5-paragraph/src/paragraph';
import TextTransformation from '@ckeditor/ckeditor5-typing/src/texttransformation';

import MyPlugin from './plugins/MyPlugin';

class Editor extends ClassicEditor {}

// Plugins to include in the build.
(Editor as any).builtinPlugins = [
  Autoformat,
  AutoImage,
  BlockQuote,
  Bold,
  Essentials,
  Heading,
  Image,
  ImageInsert,
  ImageStyle,
  Italic,
  Link,
  List,
  Markdown,
  MediaEmbed,
  MyPlugin,
  Paragraph,
  TextTransformation,
];

export default Editor;
