// Vendor
import classNames from 'classnames/bind';
import { ButtonHTMLAttributes, ComponentProps } from 'react';

// Components
import { Icon } from 'src/common/Icon';

// Module
import styles from './index.module.scss';

const cx = classNames.bind(styles);

type Props = ComponentProps<typeof Icon> & Pick<ButtonHTMLAttributes<HTMLButtonElement>, 'onClick'>;

export const IconButton = ({ className, onClick, size, variant }: Props) => (
  <button className={cx('base', className)} onClick={onClick} type="button">
    <Icon size={size} variant={variant} />
  </button>
);
