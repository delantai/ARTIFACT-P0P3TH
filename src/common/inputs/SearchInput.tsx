// Vendor
import classNames from 'classnames/bind';
import { FocusEvent, InputHTMLAttributes, useCallback, useState } from 'react';

// Components
import { IconVariant } from 'src/common/Icon';
import { IconButton } from 'src/common/IconButton';

// Module
import { InputBase } from './InputBase';
import styles from './SearchInput.module.scss';

const cx = classNames.bind(styles);

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  // Active state should be used when input has focus
  active: boolean;
}

export const SearchInput = ({ className, onBlur, onFocus, value, ...props }: Props) => {
  const [active, setActive] = useState(false);

  // Event handlers
  const handleActivateInput = useCallback(() => setActive(true), []);

  const handleFocus = useCallback(
    (e: FocusEvent<HTMLInputElement>) => {
      onFocus?.(e);
      setActive(true); // Input won't disappear until blur when emptying field
    },
    [onFocus],
  );

  const handleBlur = useCallback(
    (e: FocusEvent<HTMLInputElement>) => {
      onBlur?.(e);
      setActive(false);
    },
    [onBlur],
  );

  return (
    <div className={cx('base', className)}>
      <div className={cx('container', className)}>
        {active || value ? (
          <InputBase
            {...props}
            autoFocus
            className={cx('field')}
            onBlur={handleBlur}
            onFocus={handleFocus}
            value={value}
          />
        ) : (
          <IconButton onClick={handleActivateInput} variant={IconVariant.Search} />
        )}
      </div>
      <div className={cx('footer', { 'footer--active': active })} />
    </div>
  );
};
