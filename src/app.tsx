import { CKEditor } from '@ckeditor/ckeditor5-react';
import { DefaultButton, PrimaryButton, TextField, ThemeProvider } from '@fluentui/react';
import React, { useState } from 'react';

import { getClassNames } from './App.classNames';
import Editor from './Editor';

const editorConfig = {
  toolbar: {
    items: [
      'bold',
      'italic',
      'bulletedList',
      'numberedList',
      'imageInsert',
      'link',
      'mediaEmbed',
      'blockQuote',
      'myButton',
    ],
  },
  language: 'en',
};

const App: React.FC = () => {
  const { button } = getClassNames();
  const [text, setText] = useState('');

  return (
    <ThemeProvider
      style={{
        width: '100%',
        height: '100%',
      }}
    >
      <PrimaryButton className={button}>Button</PrimaryButton>
      <DefaultButton className={button}>Button</DefaultButton>
      <CKEditor
        editor={Editor}
        data="<p>Hello from CKEditor 5!</p>"
        config={editorConfig}
        onReady={editor => {
          console.log('Editor is ready to use!', editor);
          const data = editor.getData();
          setText(data);
        }}
        onChange={(event, editor) => {
          const data = editor.getData();
          console.log({ event, editor, data });
          setText(data);
        }}
      />
      <TextField
        value={text}
        readOnly={true}
        multiline
        resizable={false}
        autoAdjustHeight
        style={{
          width: '100%',
          boxSizing: 'border-box',
          fontFamily: 'monospace',
        }}
      />
    </ThemeProvider>
  );
};
export default App;
