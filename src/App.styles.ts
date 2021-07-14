import { IAppStyleProps, IAppStyles } from './App.types';

export const getStyles = (props: IAppStyleProps): IAppStyles => {
  const { className } = props;

  return {
    root: [
      className,
      {
        width: '100%',
        padding: 20,
      },
    ],
    dataPreview: [
      {
        width: '100%',
        boxSizing: 'border-box',
        fontFamily: 'monospace',
      },
    ],
  };
};
