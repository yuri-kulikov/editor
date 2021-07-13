import React from 'react';

import Image from '@/models/Image';

interface SelectedImageContextState {
  selectedImage: Maybe<Image>;
  setSelectedImage(image: Maybe<Image>): void;
  panelDismissed: boolean;
  setPanelDismissed(dismissed: boolean): void;
}

export const SelectedImageContext =
  React.createContext<Maybe<SelectedImageContextState>>(undefined);
