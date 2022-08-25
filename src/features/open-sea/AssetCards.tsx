// Vendor
import classNames from 'classnames/bind';

// Helpers
import { OpenSeaAssetsResponse } from 'src/features/open-sea/@types';

// Module
import { AssetCard } from './AssetCard';
import styles from './AssetCards.module.scss';

const cx = classNames.bind(styles);

interface Props {
  data: OpenSeaAssetsResponse;
}

export const AssetCards = ({ data }: Props) => {
  if (!data) {
    return null;
  }

  console.log('rendering assets: ', data.assets.length);

  return (
    <div className={cx('base')}>
      {data.assets.map((asset) => (
        <AssetCard asset={asset} key={asset.token_id} />
      ))}
    </div>
  );
};
