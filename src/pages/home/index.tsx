// Vendor
import classNames from 'classnames/bind';
import type { NextPage } from 'next';
import { useCallback, useEffect } from 'react';
import toast from 'react-hot-toast';
import { useQuery } from '@tanstack/react-query';

// Components
import { IconVariant } from 'src/common/Icon';
import { IconButton } from 'src/common/IconButton';
import { InputBase, InputContainer, useInputProps } from 'src/common/Input';

// Helpers
import { InvalidInputError } from 'src/features/open-sea/errors';
import { fetchAssets } from 'src/features/open-sea/queries';

// Module
import { AssetCards } from './AssetCards';
import { Header } from './Header';
import styles from './index.module.scss';

const cx = classNames.bind(styles);

const Home: NextPage = () => {
  const [address, handleChange] = useInputProps('0xB35eC98Ba0A1Cf6b5C1d836A818D041A7CD9AA19');

  // Fetch OpenSea API assets via owner address lookup
  const { data, error, isFetching, refetch } = useQuery(['open-sea-assets', { address }], fetchAssets, {
    enabled: false, // Fetch data only when the button is clicked
    retry: false, // Disable retries on failure
  });

  // When search button is clicked, setAddress and execute the OpenSea assets query
  const handleClick = useCallback(() => address && refetch(), [address, refetch]);

  // Display a toast for expected errors
  useEffect(() => {
    if (error instanceof InvalidInputError) {
      toast.error('Invalid address, please try again', {
        style: {
          background: '#2f3236',
          borderRadius: '8px',
          color: '#f4f6f7',
        },
      });
    }
  }, [error]);

  console.log('data: ', data);
  console.log('fetching:', isFetching);

  return (
    <div className={styles.container}>
      <Header />
      <main className={styles.main}>
        <InputContainer>
          <InputBase
            className={cx('input')}
            onChange={handleChange}
            placeholder="What is your ETH address?"
            value={address}
          />
          <IconButton onClick={handleClick} variant={IconVariant.Search} />
        </InputContainer>

        {data ? <AssetCards data={data} /> : null}
      </main>
    </div>
  );
};

export default Home;
