import { mergeStyles } from '@fluentui/react';
import { initializeIcons } from '@fluentui/react/lib/Icons';
import React from 'react';
import * as ReactDOM from 'react-dom';

import App from './App';

initializeIcons();

mergeStyles({
  selectors: {
    ':global(body)': {
      display: 'flex',
      flexDirection: 'column',
      margin: 0,
      padding: 0,
    },
    ':global(#root)': {
      display: 'flex',
      maxWidth: '1000px',
      alignSelf: 'center',
    },
  },
});

ReactDOM.render(<App />, document.getElementById('root'));
