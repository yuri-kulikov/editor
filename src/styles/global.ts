import { IStyle } from '@fluentui/merge-styles';

const globalStyles: IStyle = {
  selectors: {
    ':global(body)': {
      display: 'flex',
      flexDirection: 'column',
      margin: 0,
      padding: 0,
    },
    ':global(#root)': {
      alignSelf: 'center',
      display: 'flex',
      maxWidth: '1000px',
      width: '100%',
    },
    ':global(.myImg.ck-widget, .myVideo.ck-widget)': {
      width: 'fit-content',
      margin: 4,
      padding: 4,
    },
  },
};

export default globalStyles;
