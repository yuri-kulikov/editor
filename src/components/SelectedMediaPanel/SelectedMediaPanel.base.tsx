import { classNamesFunction, IProcessedStyleSet, Panel, PanelType, PrimaryButton, TextField } from '@fluentui/react';
import React, { useContext, useState } from 'react';

import { EditorContext } from '@/context/Editor';
import { SelectedMediaContext } from '@/context/SelectedMedia';
import MyMedia, { MediaType } from '@/models/MyMedia';
import { MyMediaCommandName } from '@/plugins/MyMedia/MyMediaEditing';
import cx from '@/utils/classNames';
import { getPreviewImgByLink } from '@/utils/youtube';

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
  const selectedMediaContext = useContext(SelectedMediaContext);

  const [currentSrc, setCurrentSrc] = useState<string | undefined>(
    selectedMediaContext?.selectedMedia?.src,
  );
  const [currentAlt, setCurrentAlt] = useState<string | undefined>(
    selectedMediaContext?.selectedMedia?.alt,
  );

  if (!selectedMediaContext) {
    return null;
  }
  const { selectedMedia, panelDismissed, setPanelDismissed } =
    selectedMediaContext;
  if (!selectedMedia) {
    return null;
  }
  const { src, alt, path } = selectedMedia;

  if (!path || panelDismissed) {
    return null;
  }

  const classNames: IProcessedStyleSet<ISelectedMediaPanelStyles> =
    getClassNames(styles, {
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      theme: theme!,
    });

  const updateSelectedMedia = ({ src, alt }: Partial<MyMedia>) => {
    editor?.execute(MyMediaCommandName.UpdateSelectedMedia, {
      src,
      alt,
    });
  };

  const onSave = () => {
    updateSelectedMedia({
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
        {selectedMedia.type === MediaType.Img ? 'Remove Image' : 'Remove Video'}
      </PrimaryButton>
    </div>
  );

  return (
    <Panel
      key={selectedMedia.path}
      closeButtonAriaLabel="Close"
      customWidth={'400px'}
      headerText={
        selectedMedia.type === MediaType.Img
          ? 'Image settings'
          : 'Video settings'
      }
      isBlocking={false}
      isOpen={!!selectedMedia}
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
        defaultValue={alt}
        onChange={(_, alt) => setCurrentAlt(alt)}
      />
      <ImagePreview
        classNames={classNames}
        alt={currentAlt}
        src={
          selectedMedia.type === MediaType.Video
            ? getPreviewImgByLink(currentSrc)
            : currentSrc
        }
      />
    </Panel>
  );
};
