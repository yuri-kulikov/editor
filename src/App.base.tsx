import CKEditorInspector from '@ckeditor/ckeditor5-inspector';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import { classNamesFunction, TextField, ThemeProvider } from '@fluentui/react';
import React, { useRef, useState } from 'react';

import { SelectedImagePanel } from '@/components/SelectedImagePanel';
import { EditorContext } from '@/context/Editor';
import { SelectedImageContext } from '@/context/SelectedImage';
import Editor from '@/Editor';
import Image from '@/models/Image';

import { IAppProps, IAppStyleProps, IAppStyles } from './App.types';

const getClassNames = classNamesFunction<IAppStyleProps, IAppStyles>();

const initialText =
  '<p>Hello</p><img class="myImg" alt="Alt text!" src="https://b.thumbs.redditmedia.com/B6T8MAxlEYwn27gmOAruEuEnFmP5qgkUZKnQQE8NMSI.png"><img class="myImg" src="https://zooawesome.com/wp-content/uploads/2019/08/Cat-Blep-Closeup.webp"><p>This is <strong>bold</strong>.</p>';

const editorConfig = {
  toolbar: {
    items: [
      'sourceEditing',
      'bold',
      'italic',
      'bulletedList',
      'numberedList',
      'imageTextAlternative',
      'link',
      'myButton',
    ],
  },
  language: 'en',
};

const AppBase: React.FC<IAppProps> = ({ styles, theme }) => {
  const classNames = getClassNames(styles, { theme });

  const [text, setText] = useState('');
  const editorRef = useRef<Editor>();

  const [selectedImage, setSelectedImage] = useState<Maybe<Image>>();
  const [panelDismissed, setPanelDismissed] = useState<boolean>(false);

  return (
    <ThemeProvider className={classNames.root}>
      <EditorContext.Provider value={editorRef.current}>
        <SelectedImageContext.Provider
          value={{
            selectedImage,
            setSelectedImage,
            panelDismissed,
            setPanelDismissed,
          }}
        >
          <CKEditor
            editor={Editor}
            config={{
              ...editorConfig,
              selectedImage: {
                setSelectedImage: (image: Maybe<Image>) => {
                  setSelectedImage(image);
                  setPanelDismissed(false);
                },
              },
            }}
            onReady={(editor: Editor) => {
              editor.focus();
              editor.setData(initialText);
              console.log('Editor is ready to use!', editor);
              CKEditorInspector.attach(editor);
              editorRef.current = editor;
            }}
            onChange={(event, editor) => {
              const data = editor.getData();
              setText(data);
            }}
          />
          <TextField
            value={text}
            readOnly={true}
            multiline
            resizable={false}
            autoAdjustHeight
            className={classNames.dataPreview}
          />
          {selectedImage && (
            <SelectedImagePanel key={JSON.stringify(selectedImage)} />
          )}
        </SelectedImageContext.Provider>
      </EditorContext.Provider>
    </ThemeProvider>
  );
};

export default AppBase;
