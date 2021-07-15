import {
  classNamesFunction,
  Icon,
  Image,
  ImageLoadState,
  IProcessedStyleSet,
  Label,
  Link,
  Panel,
  PanelType,
  PrimaryButton,
  TextField,
} from '@fluentui/react';
import React, { useContext, useState } from 'react';

import { EditorContext } from '@/context/Editor';
import { SelectedImageContext } from '@/context/SelectedImage';
import MyImage from '@/models/MyImage';
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
    const editor = useContext(EditorContext);
    const selectedImageContext = useContext(SelectedImageContext);

    const [currentSrc, setCurrentSrc] = useState<string | undefined>(
      selectedImageContext?.selectedImage?.src,
    );
    const [currentAlt, setCurrentAlt] = useState<string | undefined>(
      selectedImageContext?.selectedImage?.alt,
    );

    const [imageState, setImageState] = useState(ImageLoadState.notLoaded);

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

    const updateSelectedImage = ({ src, alt }: Partial<MyImage>) => {
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
        {!!currentSrc && (
          <Image
            alt={currentAlt}
            className={classNames.image}
            key={selectedImage.src}
            src={currentSrc}
            width={'fit-content'}
            onLoadingStateChange={setImageState}
            style={
              imageState === ImageLoadState.error ? { display: 'none' } : {}
            }
          />
        )}
        {!!currentSrc && imageState === ImageLoadState.loaded && (
          <Link target={'_blank'} href={currentSrc}>
            Open image in a new window
          </Link>
        )}
        {!!currentSrc && imageState === ImageLoadState.error && (
          <div className={classNames.errorContainer}>
            <Icon iconName={'ErrorBadge'} className={classNames.errorIcon} />
            <span className={classNames.errorMessage}>
              Couldn't load the image
            </span>
          </div>
        )}
      </Panel>
    );
  };
