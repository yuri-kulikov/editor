import Autoformat from '@ckeditor/ckeditor5-autoformat/src/autoformat';
import Bold from '@ckeditor/ckeditor5-basic-styles/src/bold';
import Italic from '@ckeditor/ckeditor5-basic-styles/src/italic';
import BlockQuote from '@ckeditor/ckeditor5-block-quote/src/blockquote';
import ClassicEditor from '@ckeditor/ckeditor5-editor-classic/src/classiceditor';
import Essentials from '@ckeditor/ckeditor5-essentials/src/essentials';
import Heading from '@ckeditor/ckeditor5-heading/src/heading';
import AutoImage from '@ckeditor/ckeditor5-image/src/autoimage';
import Link from '@ckeditor/ckeditor5-link/src/link';
import List from '@ckeditor/ckeditor5-list/src/list';
import Paragraph from '@ckeditor/ckeditor5-paragraph/src/paragraph';
import SourceEditing from '@ckeditor/ckeditor5-source-editing/src/sourceediting';
import TextTransformation from '@ckeditor/ckeditor5-typing/src/texttransformation';

import MyMedia from './plugins/MyMedia';

// import MediaEmbed from '@ckeditor/ckeditor5-media-embed/src/mediaembed';
// import Image from '@ckeditor/ckeditor5-image/src/image';
// import ImageInsert from '@ckeditor/ckeditor5-image/src/imageinsert';
// import ImageStyle from '@ckeditor/ckeditor5-image/src/imagestyle';
// import ImageTextAlternative from '@ckeditor/ckeditor5-image/src/imagetextalternative';
// import ImageToolbar from '@ckeditor/ckeditor5-image/src/imagetoolbar';
// import Markdown from '@ckeditor/ckeditor5-markdown-gfm/src/markdown';

class Editor extends ClassicEditor {}

// Plugins to include in the build.
(Editor as any).builtinPlugins = [
  Essentials,
  Paragraph,
  Heading,
  Bold,
  Italic,
  Link,
  List,
  BlockQuote,
  SourceEditing,
  Autoformat,
  AutoImage,
  // Image,
  // ImageInsert,
  // ImageStyle,
  // ImageTextAlternative,
  // ImageToolbar,
  // Markdown,
  // MediaEmbed,
  TextTransformation,
  MyMedia,
];

export default Editor;
