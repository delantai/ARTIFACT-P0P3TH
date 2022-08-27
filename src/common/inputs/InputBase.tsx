// Vendor
import classNames from 'classnames/bind';
import { InputHTMLAttributes } from 'react';

// Module
import styles from './InputBase.module.scss';

const cx = classNames.bind(styles);

type Props = InputHTMLAttributes<HTMLInputElement>;

export const InputBase = ({ className, ...props }: Props) => (
  <input {...props} className={cx('base', className)} type="text" />
);
