import { mergeStyleSets } from '@fluentui/merge-styles';
import { FontSizes } from '@fluentui/react';

export interface IComponentClassNames {
  button: string;
}

export const getClassNames = (): IComponentClassNames => {
  return mergeStyleSets({
    button: {
      width: 60,
      fontSize: FontSizes.small,
    },
  });
};
