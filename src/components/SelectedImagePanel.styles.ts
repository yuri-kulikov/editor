import { ISelectedImagePanelStyleProps, ISelectedImagePanelStyles } from './SelectedImagePanel.types';

export const getStyles = (
  props: ISelectedImagePanelStyleProps,
): ISelectedImagePanelStyles => {
  const { className, theme } = props;

  return {
    root: [
      className,
      {
        width: '100%',
        padding: 20,
      },
    ],
    image: [
      {
        marginTop: 4,
        maxWidth: '100%',
      },
    ],
    footerButtonsContainer: [{ display: 'flex', gap: '4px' }],
    button: [{ flexBasis: 0, flexGrow: 1 }],
    removeButton: [
      {
        backgroundColor: theme.palette.red,
        border: 'none',
        selectors: {
          ':hover': { border: 'none', backgroundColor: theme.palette.redDark },
        },
      },
    ],
  };
};
