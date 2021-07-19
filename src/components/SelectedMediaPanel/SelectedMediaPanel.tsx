import { styled } from '@fluentui/react/lib/Utilities';

import { SelectedMediaPanelBase } from './SelectedMediaPanel.base';
import { getStyles } from './SelectedMediaPanel.styles';
import {
  ISelectedMediaPanelProps,
  ISelectedMediaPanelStyleProps,
  ISelectedMediaPanelStyles,
} from './SelectedMediaPanel.types';

export const SelectedMediaPanel = styled<
  ISelectedMediaPanelProps,
  ISelectedMediaPanelStyleProps,
  ISelectedMediaPanelStyles
>(SelectedMediaPanelBase, getStyles);
