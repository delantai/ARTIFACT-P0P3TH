// Vendor
import classNames from 'classnames/bind';
import { Leva } from 'leva';
import type { NextPage } from 'next';
import { ChangeEvent, useCallback, useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { Stats } from '@react-three/drei';

// Components
import { SearchInput } from 'src/common/inputs';
import { Canvas } from 'src/features/artifact-scene/Canvas';

// Helpers
import { useAssetsContext } from 'src/features/open-sea/context';
import { InvalidInputError } from 'src/features/open-sea/errors';
import { useAssetsQuery } from 'src/features/open-sea/queries';

// Module
import { Header } from './Header';
import styles from './index.module.scss';

const cx = classNames.bind(styles);

const Home: NextPage = () => {
  const [isInputFocused, setIsInputFocused] = useState(false);

  // Fetch OpenSea API assets via owner address lookup
  // Test with: 0xB35eC98Ba0A1Cf6b5C1d836A818D041A7CD9AA19
  const { address, setAddress } = useAssetsContext(); // Assets global app state
  const { error } = useAssetsQuery();

  // When search button is clicked, setAddress and execute the OpenSea assets query
  const handleChange = useCallback((e: ChangeEvent<HTMLInputElement>) => setAddress?.(e.target.value), [setAddress]);
  const handleFocus = useCallback(() => setIsInputFocused(true), []);
  const handleBlur = useCallback(() => setIsInputFocused(false), []);

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

  return (
    <>
      <Header />
      <main className={cx('main')}>
        <Canvas />
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
