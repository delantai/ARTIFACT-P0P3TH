// Vendor
import classNames from 'classnames/bind';
import { ReactNode } from 'react';

// Module
import styles from './InputContainer.module.scss';

const cx = classNames.bind(styles);

interface Props {
  // Components to be rendered within the input container
  children?: ReactNode;
  // Custom styles
  className?: string;
}

export const InputContainer = ({ children, className }: Props) => (
  <div className={cx('base', className)}>{children}</div>
);
