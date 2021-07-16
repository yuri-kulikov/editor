import { IStyle, IStyleFunctionOrObject, ITheme } from '@fluentui/react';

export interface ISelectedMediaPanelProps {
  theme?: ITheme;
  styles?: IStyleFunctionOrObject<
    ISelectedMediaPanelStyleProps,
    ISelectedMediaPanelStyles
  >;
}

export interface ISelectedMediaPanelStyleProps {
  theme: ITheme;
  className?: string;
}

export interface ISelectedMediaPanelStyles {
  root?: IStyle;
  image?: IStyle;
  footerButtonsContainer?: IStyle;
  button?: IStyle;
  removeButton?: IStyle;
  errorContainer?: IStyle;
  errorIcon?: IStyle;
  errorMessage?: IStyle;
}
