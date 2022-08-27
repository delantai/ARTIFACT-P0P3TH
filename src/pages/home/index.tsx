// Vendor
import classNames from 'classnames/bind';
import { Leva } from 'leva';
import type { NextPage } from 'next';
import { useCallback, useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { Stats } from '@react-three/drei';
import { useQuery } from '@tanstack/react-query';

// Components
import { SearchInput, useInputProps } from 'src/common/inputs';
import { Canvas } from 'src/features/artifact-scene/Canvas';

// Helpers
import { AssetCards } from 'src/features/open-sea/AssetCards';
import { InvalidInputError } from 'src/features/open-sea/errors';
import { fetchAssets } from 'src/features/open-sea/queries';

// Module
import { Header } from './Header';
import styles from './index.module.scss';

const cx = classNames.bind(styles);

const Home: NextPage = () => {
  const [isInputFocused, setIsInputFocused] = useState(false);
  const [address, handleChange] = useInputProps('0xB35eC98Ba0A1Cf6b5C1d836A818D041A7CD9AA19');

  // Fetch OpenSea API assets via owner address lookup
  const { data, error, isFetching, refetch } = useQuery(['open-sea-assets', { address }], fetchAssets, {
    enabled: false, // Fetch data only when the button is clicked
    retry: false, // Disable retries on failure
  });

  // When search button is clicked, setAddress and execute the OpenSea assets query
  const handleFocus = useCallback(() => setIsInputFocused(true), []);
  const handleBlur = useCallback(() => setIsInputFocused(false), []);
  const handleClick = useCallback(
    (state) => {
      if (address) {
        refetch();
      }
    },
    [address, refetch],
  );

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
    <>
      <Header />
      <main className={cx('main')}>
        <Canvas onClick={handleClick} />
        <Leva collapsed />
        <Stats />
        <div className={cx('footer', { 'footer--active': isInputFocused })}>
          <div className={cx('footer-bg', { 'footer-bg--active': isInputFocused })} />
          <SearchInput
            active={isInputFocused}
            className={cx('input-container')}
            onBlur={handleBlur}
            onChange={handleChange}
            onFocus={handleFocus}
            placeholder="What is your ETH address?"
            value={address}
          />
        </div>

        {/* {data ? <AssetCards data={data} /> : null} */}
      </main>
    </>
  );
};

export default Home;
