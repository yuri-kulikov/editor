import { IStyle, IStyleFunctionOrObject, ITheme } from '@fluentui/react';

export interface ISelectedImagePanelProps {
  theme?: ITheme;
  styles?: IStyleFunctionOrObject<
    ISelectedImagePanelStyleProps,
    ISelectedImagePanelStyles
  >;
}

export interface ISelectedImagePanelStyleProps {
  theme: ITheme;
  className?: string;
}

export interface ISelectedImagePanelStyles {
  root?: IStyle;
  image?: IStyle;
  footerButtonsContainer?: IStyle;
  button?: IStyle;
  removeButton?: IStyle;
  errorContainer?: IStyle;
  errorIcon?: IStyle;
  errorMessage?: IStyle;
}
