import { DefaultButton, PrimaryButton, ThemeProvider } from '@fluentui/react';
import React from 'react';

import { getClassNames } from './App.classNames';

const App: React.FC = () => {
  const { button } = getClassNames();

  return (
    <ThemeProvider>
      <PrimaryButton className={button}>Button</PrimaryButton>
      <DefaultButton className={button}>Button</DefaultButton>
    </ThemeProvider>
  );
};
export default App;
