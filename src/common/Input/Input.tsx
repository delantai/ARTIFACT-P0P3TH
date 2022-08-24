// Vendor
import { InputHTMLAttributes } from 'react';

// Module
import { InputBase } from './InputBase';
import { InputContainer } from './InputContainer';

type Props = InputHTMLAttributes<HTMLInputElement>;

export const Input = ({ className, ...props }: Props) => (
  <InputContainer className={className}>
    <InputBase {...props} />
  </InputContainer>
);
