/* eslint-disable @next/next/no-img-element */
// Vendor
import classNames from 'classnames/bind';
import Image from 'next/image';
import { useCallback } from 'react';
import * as Dialog from '@radix-ui/react-dialog';

// Helpers
import { useArtifactContext } from 'src/features/artifact/context';
import { useAsset } from 'src/features/open-sea/queries';

// Module
import styles from './index.module.scss';

const PLACHOLDER = '/assets/images/placeholder.jpg';

const cx = classNames.bind(styles);

interface Props extends Dialog.DialogContentProps {
  open?: boolean;
  tokenId?: string;
}

export const ArtifactDialogContent = ({ open = false, tokenId, ...props }: Props) => {
  const asset = useAsset(tokenId);
  const { setFocusedCorner } = useArtifactContext();
  const handleClose = useCallback(() => setFocusedCorner(null), [setFocusedCorner]);

  // NOTE: Dialog.Portal > Dialog.Content could be abstracted to a common component
  return (
    <Dialog.Portal>
      <Dialog.Content className={cx('base', { 'base--visible': open })} onInteractOutside={handleClose} {...props}>
        <div>
          <div className={cx('header-row')}>
            {asset?.imageUrl ? (
              <img alt="opensea asset" className={cx('image')} height={128} src={asset.imageUrl} width={128} />
            ) : (
              <Image alt="opensea asset" className={cx('image')} height={128} src={PLACHOLDER} width={128} />
            )}
            <div className={cx('header-data')}>
              <h4>({asset?.collection.name})</h4>
              <h1>{asset?.name}</h1>
            </div>
          </div>
          <div className={cx('description')}>{asset?.description}</div>
        </div>
      </Dialog.Content>
    </Dialog.Portal>
  );
};
