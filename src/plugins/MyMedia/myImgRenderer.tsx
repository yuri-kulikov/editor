import React from 'react';
import ReactDOM from 'react-dom';

import { Icon } from '@fluentui/react/lib/Icon';

const MyIcon = () => (
  <Icon iconName="FileImage" styles={{ root: { fontSize: 36 } }} />
);

export const myImgRenderer = domElement => {
  ReactDOM.render(<MyIcon />, domElement);
};
