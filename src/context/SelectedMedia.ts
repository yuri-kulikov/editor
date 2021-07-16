import React from 'react';

import MyMedia from '@/models/MyMedia';

interface SelectedMediaContextState {
  selectedMedia: Maybe<MyMedia>;
  setSelectedMedia(image: Maybe<MyMedia>): void;
  panelDismissed: boolean;
  setPanelDismissed(dismissed: boolean): void;
}

export const SelectedMediaContext =
  React.createContext<Maybe<SelectedMediaContextState>>(undefined);
