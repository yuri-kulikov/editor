import { Icon, Image, ImageLoadState, IProcessedStyleSet, Label, Link } from '@fluentui/react';
import React, { useState } from 'react';

import { ISelectedMediaPanelStyles } from '../SelectedMediaPanel.types';

interface Props {
  src: string | undefined;
  alt: string | undefined;
  classNames: IProcessedStyleSet<ISelectedMediaPanelStyles>;
}

export const ImagePreview: React.FC<Props> = ({ src, alt, classNames }) => {
  const [imageState, setImageState] = useState(ImageLoadState.notLoaded);

  return (
    <>
      {imageState !== ImageLoadState.notLoaded ? <Label>Preview</Label> : null}
      <Image
        alt={alt}
        className={classNames.image}
        src={src}
        width={'fit-content'}
        onLoadingStateChange={setImageState}
        style={imageState === ImageLoadState.error ? { display: 'none' } : {}}
      />

      {imageState === ImageLoadState.loaded && (
        <Link target={'_blank'} href={src}>
          Open image in a new window
        </Link>
      )}
      {imageState === ImageLoadState.error && (
        <div className={classNames.errorContainer}>
          <Icon iconName={'ErrorBadge'} className={classNames.errorIcon} />
          <span className={classNames.errorMessage}>
            Couldn't load the image
          </span>
        </div>
      )}
    </>
  );
};
