import * as React from 'react';

import { styled } from '@fluentui/react/lib/Utilities';

import AppBase from './App.base';
import { getStyles } from './App.styles';
import { IAppProps, IAppStyleProps, IAppStyles } from './App.types';

export const App: React.FC = styled<IAppProps, IAppStyleProps, IAppStyles>(
  AppBase,
  getStyles,
);

export default App;
