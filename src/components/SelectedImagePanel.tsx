import { Panel, PanelType, TextField } from '@fluentui/react';
import React, { useContext } from 'react';

import { SelectedImageContext } from '@/context/SelectedImage';
import Editor from '@/Editor';
import Image from '@/models/Image';

import { getClassNames } from './SelectedImagePanel.classNames';

const classNames = getClassNames();

interface Props {
  editor: Maybe<Editor>;
}

const SelectedImagePanel: React.FC<Props> = ({ editor }) => {
  const selectedImageContext = useContext(SelectedImageContext);
  if (!selectedImageContext) {
    return null;
  }
  const { selectedImage, panelDismissed, setPanelDismissed } =
    selectedImageContext;
  if (!selectedImageContext || !selectedImage) {
    return null;
  }
  const { src, alt } = selectedImage;

  if (!src || panelDismissed) {
    return null;
  }

  const changeSelectedImage = ({ src, alt }: Partial<Image>) => {
    editor?.execute('updateSelectedImage', {
      src,
      alt,
    });
  };

  return (
    <Panel
      key={selectedImage.src}
      closeButtonAriaLabel="Close"
      customWidth={'400px'}
      headerText="Image settings"
      isBlocking={false}
      isOpen={!!selectedImage}
      type={PanelType.custom}
      onDismiss={() => setPanelDismissed(true)}
    >
      <TextField
        label="Source"
        defaultValue={src}
        onChange={(_, src) => changeSelectedImage({ src })}
      />
      <TextField
        label="Alt Text"
        defaultValue={alt || ''}
        onChange={(_, alt) => changeSelectedImage({ alt })}
      />
      <img className={classNames.image} src={selectedImage.src} />
    </Panel>
  );
};

export default SelectedImagePanel;
