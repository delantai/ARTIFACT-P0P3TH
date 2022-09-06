// Vendor
import classNames from 'classnames/bind';
import { ChangeEvent, FocusEvent, InputHTMLAttributes, useCallback, useState } from 'react';

// Components
import { IconVariant } from 'src/common/icons';
import { IconButton } from 'src/common/icon-button';

// Module
import { InputBase } from './InputBase';
import styles from './SearchInput.module.scss';

const cx = classNames.bind(styles);

type Props = InputHTMLAttributes<HTMLInputElement>;

export const SearchInput = ({ className, onBlur, onChange, onFocus, ...props }: Props) => {
  const [isActive, setIsActive] = useState(false);
  const [value, setValue] = useState<string>();

  // Track value internally to manage blur behavior when text exists.
  const handleChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      setValue(e.target.value);
      onChange?.(e);
    },
    [onChange],
  );

  // Event handlers
  const handleActivateInput = useCallback(() => setIsActive(true), []);

  const handleFocus = useCallback(
    (e: FocusEvent<HTMLInputElement>) => {
      onFocus?.(e);
      setIsActive(true); // Input won't disappear until blur when emptying field
    },
    [onFocus],
  );

  const handleBlur = useCallback(
    (e: FocusEvent<HTMLInputElement>) => {
      onBlur?.(e);
      setIsActive(false);
    },
    [onBlur],
  );

  return (
    <div className={cx('base', className)}>
      <div className={cx('container', className)}>
        {isActive || value ? (
          <InputBase
            {...props}
            autoFocus
            className={cx('field')}
            onBlur={handleBlur}
            onChange={handleChange}
            onFocus={handleFocus}
          />
        ) : (
          <IconButton className={cx('button')} onClick={handleActivateInput} variant={IconVariant.Search} />
        )}
      </div>
      <div className={cx('footer', { 'footer--active': isActive })} />
    </div>
  );
};
