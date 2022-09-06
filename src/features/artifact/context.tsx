// Vendors
import { createContext, Dispatch, PropsWithChildren, SetStateAction, useContext, useMemo, useState } from 'react';

// Module
import { Coordinates } from './constants';

interface CornerData {
  id: keyof Coordinates;
  position: [number, number, number];
  tokenId: string;
}

interface ContextParams {
  // Address of ETH owner currently being queried
  focusedCorner?: CornerData | null;
  // Set state function
  setFocusedCorner: Dispatch<SetStateAction<CornerData | undefined | null>>;
}

export const ArtifactContext = createContext<ContextParams | undefined>(undefined);

export const ArtifactProvider = ({ children }: PropsWithChildren<{}>) => {
  const [focusedCorner, setFocusedCorner] = useState<CornerData | null>();
  const value = useMemo(
    () => ({
      focusedCorner,
      setFocusedCorner,
    }),
    [focusedCorner],
  );

  return <ArtifactContext.Provider value={value}>{children}</ArtifactContext.Provider>;
};

export const useArtifactContext = () => {
  const artifactContext = useContext(ArtifactContext);
  if (!artifactContext) {
    // Better type safety around ContextParams defaults.
    throw new Error('No ArtifactContext.Provider found...');
  }
  return artifactContext;
};
