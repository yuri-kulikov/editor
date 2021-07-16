import { Icon, Image, ImageLoadState, IProcessedStyleSet, Label, Link } from '@fluentui/react';
import React from 'react';

import { ISelectedMediaPanelStyles } from '../SelectedMediaPanel.types';

interface Props {
  currentSrc: string | undefined;
  currentAlt: string | undefined;
  classNames: IProcessedStyleSet<ISelectedMediaPanelStyles>;
  setImageState: React.Dispatch<React.SetStateAction<ImageLoadState>>;
  imageState: ImageLoadState;
}

const renderError = (errorText, classNames) => {
  return (
    <div className={classNames.errorContainer}>
      <Icon iconName={'ErrorBadge'} className={classNames.errorIcon} />
      <span className={classNames.errorMessage}>{errorText}</span>
    </div>
  );
};

export const ImagePreview: React.FC<Props> = ({
  currentSrc,
  currentAlt,
  classNames,
  setImageState,
  imageState,
}) => {
  return (
    <>
      <Label>Image Preview</Label>
      <Image
        alt={currentAlt}
        className={classNames.image}
        src={currentSrc}
        width={'fit-content'}
        onLoadingStateChange={setImageState}
        style={imageState === ImageLoadState.error ? { display: 'none' } : {}}
      />

      {imageState === ImageLoadState.loaded && (
        <Link target={'_blank'} href={currentSrc}>
          Open image in a new window
        </Link>
      )}
      {imageState === ImageLoadState.error &&
        renderError("Couldn't load the image", classNames)}
    </>
  );
};
