import {
  classNamesFunction,
  IProcessedStyleSet,
  Label,
  Panel,
  PanelType,
  PrimaryButton,
  TextField,
} from '@fluentui/react';
import React, { useContext, useState } from 'react';

import { EditorContext } from '@/context/Editor';
import { SelectedImageContext } from '@/context/SelectedImage';
import Image from '@/models/Image';
import { MyMediaCommandName } from '@/plugins/MyMedia/MyMediaEditing';
import cx from '@/utils/classNames';

import {
  ISelectedImagePanelProps,
  ISelectedImagePanelStyleProps,
  ISelectedImagePanelStyles,
} from './SelectedImagePanel.types';

const getClassNames = classNamesFunction<
  ISelectedImagePanelStyleProps,
  ISelectedImagePanelStyles
>();

export const SelectedImagePanelBase: React.FC<ISelectedImagePanelProps> =
  props => {
    const selectedImageContext = useContext(SelectedImageContext);

    if (!selectedImageContext) {
      return null;
    }
    const { selectedImage, panelDismissed, setPanelDismissed } =
      selectedImageContext;
    if (!selectedImage) {
      return null;
    }
    const { src, alt, path } = selectedImage;

    if (!path || panelDismissed) {
      return null;
    }

    const { styles, theme } = props;
    const classNames: IProcessedStyleSet<ISelectedImagePanelStyles> =
      getClassNames(styles, {
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        theme: theme!,
      });

    const editor = useContext(EditorContext);

    const [currentSrc, setCurrentSrc] = useState<string | undefined>(src);
    const [currentAlt, setCurrentAlt] = useState<string | undefined>(alt);

    const updateSelectedImage = ({ src, alt }: Partial<Image>) => {
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
        <Label>Image Preview</Label>
        <img
          key={selectedImage.src}
          className={classNames.image}
          src={currentSrc}
          alt={currentAlt}
        />
      </Panel>
    );
  };
