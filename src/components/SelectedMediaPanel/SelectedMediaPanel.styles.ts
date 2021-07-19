import { ISelectedMediaPanelStyleProps, ISelectedMediaPanelStyles } from './SelectedMediaPanel.types';

export const getStyles = (
  props: ISelectedMediaPanelStyleProps,
): ISelectedMediaPanelStyles => {
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
    footerButtonsContainer: [{ display: 'flex', gap: '8px' }],
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
    errorContainer: {
      margin: 8,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: '6px',
    },
    errorIcon: {
      fontSize: '60px',
      color: theme.palette.red,
    },
    errorMessage: { color: theme.palette.red, fontWeight: 'bold' },
  };
};
