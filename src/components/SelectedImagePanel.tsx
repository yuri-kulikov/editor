import { styled } from '@fluentui/react/lib/Utilities';

import { SelectedImagePanelBase } from './SelectedImagePanel.base';
import { getStyles } from './SelectedImagePanel.styles';
import {
  ISelectedImagePanelProps,
  ISelectedImagePanelStyleProps,
  ISelectedImagePanelStyles,
} from './SelectedImagePanel.types';

// Create a PieChart variant which uses these default styles and this styled subcomponent.
export const SelectedImagePanel = styled<
  ISelectedImagePanelProps,
  ISelectedImagePanelStyleProps,
  ISelectedImagePanelStyles
>(SelectedImagePanelBase, getStyles);
