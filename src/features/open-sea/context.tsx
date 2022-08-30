// Vendors
import { createContext, Dispatch, PropsWithChildren, SetStateAction, useContext, useMemo, useState } from 'react';

interface ContextParams {
  // Address of ETH owner currently being queried
  address?: string;
  // Search bar focus state
  isInputFocused: boolean;
  // Set address value
  setAddress: Dispatch<SetStateAction<string | undefined>>;
  // Set search bar focus state
  setIsInputFocused: Dispatch<SetStateAction<boolean>>;
  // TODO: Add pagination data
}

export const AssetsContext = createContext<ContextParams | undefined>(undefined);

export const AssetsProvider = ({ children }: PropsWithChildren<{}>) => {
  const [address, setAddress] = useState<string>();
  const [isInputFocused, setIsInputFocused] = useState(false);
  const value = useMemo(
    () => ({
      address,
      isInputFocused,
      setAddress,
      setIsInputFocused,
    }),
    [address, isInputFocused],
  );

  return <AssetsContext.Provider value={value}>{children}</AssetsContext.Provider>;
};

export const useAssetsContext = () => {
  const assetsContext = useContext(AssetsContext);
  if (!assetsContext) {
    // Better type safety around ContextParams defaults.
    throw new Error('No AssetsContext.Provider found...');
  }
  return assetsContext;
};
