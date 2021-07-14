import { IStyle, IStyleFunctionOrObject, ITheme } from '@fluentui/react';

export interface IAppProps {
  theme: ITheme;
  styles?: IStyleFunctionOrObject<IAppStyleProps, IAppStyles>;
}

export interface IAppStyleProps {
  theme: ITheme;
  className?: string;
}

export interface IAppStyles {
  root?: IStyle;
  dataPreview?: IStyle;
}
