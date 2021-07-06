import { mergeStyles } from '@fluentui/react';
import React from 'react';
import * as ReactDOM from 'react-dom';

import globalStyles from '@/styles/global';
import { initializeIcons } from '@fluentui/react/lib/Icons';

import App from './App';

initializeIcons();

mergeStyles(globalStyles);

ReactDOM.render(<App />, document.getElementById('root'));
