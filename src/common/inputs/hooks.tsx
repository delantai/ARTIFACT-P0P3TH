import { ChangeEventHandler, useCallback, useState } from 'react';

/**
 * Simple hook to maintain internal state and provide onChange handler for inputs
 */
export const useInputProps = (defaultValue?: string): [string | undefined, ChangeEventHandler<HTMLInputElement>] => {
  const [value, setValue] = useState(defaultValue);
  const onChange: ChangeEventHandler<HTMLInputElement> = useCallback((e) => setValue(e.target.value), []);

  return [value, onChange];
};
