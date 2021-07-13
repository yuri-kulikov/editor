import { mergeStyleSets } from '@fluentui/merge-styles';

export const getClassNames = () =>
  mergeStyleSets({
    image: {
      marginTop: 16,
      maxWidth: '100%',
    },
  });
