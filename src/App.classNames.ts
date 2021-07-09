import { mergeStyleSets } from '@fluentui/merge-styles';
import { FontSizes } from '@fluentui/react';

export const getClassNames = () =>
  mergeStyleSets({
    button: {
      width: 140,
      fontSize: FontSizes.small,
      marginBottom: 16,
    },
    panelText: {
      overflow: 'hidden',
      whiteSpace: 'pre-wrap',
      wordBreak: 'break-word',
    },
  });
