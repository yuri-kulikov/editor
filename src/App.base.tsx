import CKEditorInspector from '@ckeditor/ckeditor5-inspector';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import { classNamesFunction, TextField, ThemeProvider } from '@fluentui/react';
import React, { useRef, useState } from 'react';

import { SelectedMediaPanel } from '@/components/SelectedMediaPanel';
import { EditorContext } from '@/context/Editor';
import { SelectedMediaContext } from '@/context/SelectedMedia';
import Editor from '@/Editor';
import MyMedia from '@/models/MyMedia';

import { IAppProps, IAppStyleProps, IAppStyles } from './App.types';

const getClassNames = classNamesFunction<IAppStyleProps, IAppStyles>();

const initialText =
  '<p>Hello</p><img class="myImg" alt="Alt text!" src="https://b.thumbs.redditmedia.com/B6T8MAxlEYwn27gmOAruEuEnFmP5qgkUZKnQQE8NMSI.png"><img class="myVideo" alt="text" src="https://www.youtube.com/watch?v=dQw4w9WgXcQ" preview="https://img.youtube.com/vi/dQw4w9WgXcQ/default.jpg"><img class="myImg" src="https://zooawesome.com/wp-content/uploads/2019/08/Cat-Blep-Closeup.webp"><img class="myImg" alt="Gif" src="https://cloudinary-res.cloudinary.com/image/upload/c_limit,w_770/f_auto,fl_lossy,q_auto/Mario_1.gif"><p>This is <strong>bold</strong>.</p>';

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
      'myMediaDropdown',
    ],
  },
  language: 'en',
};

const AppBase: React.FC<IAppProps> = ({ styles, theme }) => {
  const classNames = getClassNames(styles, { theme });

  const [text, setText] = useState('');
  const editorRef = useRef<Editor>();

  const [selectedMedia, setSelectedMedia] = useState<Maybe<MyMedia>>();
  const [panelDismissed, setPanelDismissed] = useState<boolean>(false);

  return (
    <ThemeProvider className={classNames.root}>
      <EditorContext.Provider value={editorRef.current}>
        <SelectedMediaContext.Provider
          value={{
            selectedMedia,
            setSelectedMedia,
            panelDismissed,
            setPanelDismissed,
          }}
        >
          <CKEditor
            editor={Editor}
            config={{
              ...editorConfig,
              myMedia: {
                onMyMediaSelect: (media?: Maybe<MyMedia>) => {
                  console.log('zzz onMyMediaSelect:', media);
                  setSelectedMedia(media);
                  setPanelDismissed(false);
                },
                onMyImageClick: () => setPanelDismissed(false),
                onMyVideoClick: () => setPanelDismissed(false),
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
          {selectedMedia && (
            <SelectedMediaPanel key={JSON.stringify(selectedMedia)} />
          )}
        </SelectedMediaContext.Provider>
      </EditorContext.Provider>
    </ThemeProvider>
  );
};

export default AppBase;
