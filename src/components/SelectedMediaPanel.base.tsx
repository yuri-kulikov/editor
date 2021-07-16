import {
  classNamesFunction,
  ImageLoadState,
  IProcessedStyleSet,
  Panel,
  PanelType,
  PrimaryButton,
  TextField,
} from '@fluentui/react';
import React, { useContext, useState } from 'react';

import { EditorContext } from '@/context/Editor';
import { SelectedMediaContext } from '@/context/SelectedMedia';
import MyMedia from '@/models/MyMedia';
import { MyMediaCommandName } from '@/plugins/MyMedia/MyMediaEditing';
import cx from '@/utils/classNames';

import { ImagePreview } from './ImagePreview';
import {
  ISelectedMediaPanelProps,
  ISelectedMediaPanelStyleProps,
  ISelectedMediaPanelStyles,
} from './SelectedMediaPanel.types';

const getClassNames = classNamesFunction<
  ISelectedMediaPanelStyleProps,
  ISelectedMediaPanelStyles
>();

export const SelectedMediaPanelBase: React.FC<ISelectedMediaPanelProps> = ({
  styles,
  theme,
}) => {
  const editor = useContext(EditorContext);
  const selectedImageContext = useContext(SelectedMediaContext);

  const [currentSrc, setCurrentSrc] = useState<string | undefined>(
    selectedImageContext?.selectedMedia?.src,
  );
  const [currentAlt, setCurrentAlt] = useState<string | undefined>(
    selectedImageContext?.selectedMedia?.alt,
  );

  const [imageState, setImageState] = useState(ImageLoadState.notLoaded);

  if (!selectedImageContext) {
    return null;
  }
  const {
    selectedMedia: selectedImage,
    panelDismissed,
    setPanelDismissed,
  } = selectedImageContext;
  if (!selectedImage) {
    return null;
  }
  const { src, alt, path } = selectedImage;

  if (!path || panelDismissed) {
    return null;
  }

  const classNames: IProcessedStyleSet<ISelectedMediaPanelStyles> =
    getClassNames(styles, {
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      theme: theme!,
    });

  const updateSelectedImage = ({ src, alt }: Partial<MyMedia>) => {
    editor?.execute(MyMediaCommandName.UpdateSelectedImage, {
      src,
      alt,
    });
  };

  const onSave = () => {
    updateSelectedImage({
      src: currentSrc,
      alt: currentAlt,
    });
    setPanelDismissed(true);
  };

  const onRenderFooterContent = () => (
    <div className={classNames.footerButtonsContainer}>
      <PrimaryButton
        disabled={!currentSrc}
        onClick={onSave}
        className={classNames.button}
      >
        Save
      </PrimaryButton>
      <PrimaryButton
        onClick={() => {
          editor?.execute('delete');
        }}
        className={cx(classNames.button, classNames.removeButton)}
      >
        Remove Image
      </PrimaryButton>
    </div>
  );

  return (
    <Panel
      key={selectedImage.path}
      closeButtonAriaLabel="Close"
      customWidth={'400px'}
      headerText="Image settings"
      isBlocking={false}
      isOpen={!!selectedImage}
      type={PanelType.custom}
      onDismiss={() => setPanelDismissed(true)}
      onRenderFooterContent={onRenderFooterContent}
      isFooterAtBottom={true}
    >
      <TextField
        label="Source"
        defaultValue={src}
        onChange={(_, src) => setCurrentSrc(src)}
      />
      <TextField
        label="Alt Text"
        defaultValue={alt || ''}
        onChange={(_, alt) => setCurrentAlt(alt)}
      />
      <ImagePreview
        classNames={classNames}
        currentAlt={currentAlt}
        currentSrc={currentSrc}
        imageState={imageState}
        selectedImage={selectedImage}
        setImageState={setImageState}
      />
    </Panel>
  );
};