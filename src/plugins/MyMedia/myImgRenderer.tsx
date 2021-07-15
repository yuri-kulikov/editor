import React from 'react';
import ReactDOM from 'react-dom';

import { Icon } from '@fluentui/react/lib/Icon';

export const myImgRenderer = (domElement: Element, onClick?: () => void) => {
  ReactDOM.render(
    <div onClick={onClick}>
      <Icon iconName="FileImage" styles={{ root: { fontSize: 36 } }} />
    </div>,
    domElement,
  );
};
