import { IStyle } from '@fluentui/merge-styles';

const globalStyles: IStyle = {
  selectors: {
    ':global(body)': {
      display: 'flex',
      flexDirection: 'column',
      margin: 0,
      padding: 0,
      height: '100vh',
      width: '100vw',
    },
    ':global(#root)': {
      display: 'flex',
      maxWidth: '1000px',
      alignSelf: 'center',
      width: '100%',
      height: '100%',
    },
  },
};

export default globalStyles;
