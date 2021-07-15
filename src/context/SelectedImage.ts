import React from 'react';

import MyImage from '@/models/MyImage';

interface SelectedImageContextState {
  selectedImage: Maybe<MyImage>;
  setSelectedImage(image: Maybe<MyImage>): void;
  panelDismissed: boolean;
  setPanelDismissed(dismissed: boolean): void;
}

export const SelectedImageContext =
  React.createContext<Maybe<SelectedImageContextState>>(undefined);
