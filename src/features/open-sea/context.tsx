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

export const SearchContext = createContext<ContextParams | undefined>(undefined);

export const SearchProvider = ({ children }: PropsWithChildren<{}>) => {
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

  return <SearchContext.Provider value={value}>{children}</SearchContext.Provider>;
};

export const useSearchContext = () => {
  const searchContext = useContext(SearchContext);
  if (!searchContext) {
    // Better type safety around ContextParams defaults.
    throw new Error('No SearchContext.Provider found...');
  }
  return searchContext;
};
