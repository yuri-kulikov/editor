import { mergeStyleSets } from '@fluentui/merge-styles';

export const getClassNames = () =>
  mergeStyleSets({
    image: {
      marginTop: 4,
      maxWidth: '100%',
    },
  });
