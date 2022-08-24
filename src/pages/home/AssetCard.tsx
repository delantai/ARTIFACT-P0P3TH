/* eslint-disable @next/next/no-img-element */
// Vendor
import classNames from 'classnames/bind';

// Helpers
import { OpenSeaAsset } from 'src/features/open-sea/@types';

// Module
import styles from './AssetCard.module.scss';

const cx = classNames.bind(styles);

interface Props {
  asset: OpenSeaAsset;
}

export const AssetCard = ({ asset }: Props) => (
  <div className={classNames(cx('base'))}>
    {asset.image_url ? <img alt="opensea asset" height={40} src={asset.image_url} width={40} /> : null}
    <div>
      {asset.name} ({asset.token_id})
    </div>
    <div>{asset.description}</div>
  </div>
);
