// Vendor
import { useQuery } from '@tanstack/react-query';

// Helpers
import { context } from 'src/pages/query';
import { getUrl } from 'src/utils/url';

// Module
import { useAssetsContext } from './context';
import { InvalidInputError } from './errors';
import { OpenSeaAssets, OpenSeaAssetsResponse } from './@types';

const isAssetsResponse = (data: unknown): data is OpenSeaAssetsResponse =>
  typeof data === 'object' &&
  data !== null &&
  'assets' in data &&
  Array.isArray((data as OpenSeaAssetsResponse).assets);

interface FetchAssetsParams {
  queryKey: [string, { address?: string }];
}

/**
 * React-Query query function to fetch assets from OpenSea by address.
 */
const fetchAssets = async ({ queryKey }: FetchAssetsParams): Promise<OpenSeaAssets | null> => {
  if (!queryKey[1].address) {
    return null;
  }

  const url = getUrl('https://testnets-api.opensea.io/api/v1/assets', {
    owner: queryKey[1].address,
    offset: 0,
    limit: 20,
  });
  const response = await fetch(url.href);
  const data = await response.json();

  if (!response.ok) {
    // When a malformed address is used, response returns { owner: [errorMsg] }
    if (data?.owner?.[0].startsWith('Address like string expected but received')) {
      throw new InvalidInputError('owner must be an address-like string');
    }
    console.error(`[fetchAssets] failed with ${response.status}: ${JSON.stringify(data)}`);
    throw new Error('Oops, something went wrong!');
  }

  if (!isAssetsResponse(data)) {
    console.error(`[fetchAssets] unimplemented response: ${JSON.stringify(data)}`);
    throw new Error('Unexpected response...');
  }

  return {
    ...data,
    assets: data.assets.map((asset) => ({
      ...asset,
      imageUrl: asset.image_url,
      tokenId: asset.token_id,
    })),
  };
};

export const useAssetsQuery = () => {
  const { address } = useAssetsContext();

  // Fetch OpenSea API assets via owner address lookup
  return useQuery(['open-sea-assets', { address }], fetchAssets, {
    context, // Necessary since we specify context on provider
    enabled: false, // Fetch data only when the button is clicked
    retry: false, // Disable retries on failure
  });
};

export const useAsset = (tokenId?: string) => {
  const { data } = useAssetsQuery();
  return (tokenId && data?.assets.find((asset) => asset.tokenId === tokenId)) || null;
};
