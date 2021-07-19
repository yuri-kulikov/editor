import { Icon, Image, ImageLoadState, IProcessedStyleSet, Label, Link } from '@fluentui/react';
import React, { useState } from 'react';

import cx from '@/utils/classNames';

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
        className={cx(classNames.image, {
          [classNames.hidden as string]: imageState === ImageLoadState.error,
        })}
        src={src}
        width={'fit-content'}
        onLoadingStateChange={setImageState}
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
