import { CKEditor } from '@ckeditor/ckeditor5-react';
import { DefaultButton, PrimaryButton, ThemeProvider } from '@fluentui/react';
import React from 'react';

import { getClassNames } from './App.classNames';
import Editor from './Editor';

const App: React.FC = () => {
  const { button } = getClassNames();

  return (
    <ThemeProvider
      style={{
        width: '100%',
        height: '100%',
      }}
    >
      <PrimaryButton className={button}>Button</PrimaryButton>
      <DefaultButton className={button}>Button</DefaultButton>
      <div className="editor">
        <CKEditor
          editor={Editor}
          data="<p>Hello from CKEditor 5!</p>"
          config={{
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
              ],
            },
            language: 'en',
          }}
          onReady={editor => {
            // You can store the "editor" and use when it is needed.
            console.log('Editor is ready to use!', editor);
          }}
          onChange={(event, editor) => {
            const data = editor.getData();
            console.log({ event, editor, data });
          }}
        />
      </div>
    </ThemeProvider>
  );
};
export default App;
