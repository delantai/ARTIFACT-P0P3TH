// Helpers
import { getUrl } from 'src/utils/url';

// Module
import { InvalidInputError } from './errors';
import { OpenSeaAssetsResponse } from './@types';

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
export const fetchAssets = async ({ queryKey }: FetchAssetsParams): Promise<OpenSeaAssetsResponse | null> => {
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

  return data;
};
