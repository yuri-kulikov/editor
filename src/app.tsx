import CKEditorInspector from '@ckeditor/ckeditor5-inspector';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import { Panel, PanelType, PrimaryButton, TextField, ThemeProvider } from '@fluentui/react';
import { useBoolean } from '@fluentui/react-hooks';
import React, { useState } from 'react';

import { getClassNames } from './App.classNames';
import Editor from './Editor';

const editorConfig = {
  toolbar: {
    items: [
      'sourceEditing',
      'bold',
      'italic',
      'bulletedList',
      'numberedList',
      'link',
      'myButton',
    ],
  },
  language: 'en',
};

const App: React.FC = () => {
  const { button, panelText } = getClassNames();
  const [text, setText] = useState('');
  const [isOpen, { setTrue: openPanel, setFalse: dismissPanel }] =
    useBoolean(false);
  const togglePanel = isOpen ? dismissPanel : openPanel;

  return (
    <ThemeProvider
      style={{
        width: '100%',
        padding: 20,
      }}
    >
      <PrimaryButton className={button} onClick={togglePanel}>
        Toggle Panel
      </PrimaryButton>
      <CKEditor
        editor={Editor}
        config={editorConfig}
        onReady={(editor: Editor) => {
          editor.focus();
          editor.setData('This is **bold**.');
          console.log('Editor is ready to use!', editor);
          CKEditorInspector.attach(editor);
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
      <Panel
        closeButtonAriaLabel="Close"
        customWidth={'400px'}
        headerText="Sample panel"
        isBlocking={false}
        isOpen={isOpen}
        onDismiss={dismissPanel}
        type={PanelType.custom}
      >
        <p className={panelText}>{text}</p>
      </Panel>
    </ThemeProvider>
  );
};

export default App;
