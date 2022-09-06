// Vendor
import camelize from 'camelcase-keys';
import { useCallback } from 'react';
import { useQuery } from '@tanstack/react-query';

// Helpers
import { context } from 'src/utils/query-client';
import { getUrl } from 'src/utils/url';

// Module
import { useSearchContext } from './context';
import { InvalidInputError } from './errors';
import { OpenSeaAssets } from './@types';

const LIMIT = 8;

const isAssetsResponse = (data: unknown): data is OpenSeaAssets =>
  typeof data === 'object' && data !== null && 'assets' in data && Array.isArray((data as OpenSeaAssets).assets);

interface FetchAssetsParams {
  queryKey: [string, { address?: string; cursor?: string }];
}

/**
 * React-Query query function to fetch assets from OpenSea by address.
 */
const fetchAssets = async ({ queryKey }: FetchAssetsParams): Promise<OpenSeaAssets | null> => {
  if (!queryKey[1].address) {
    return null;
  }

  const { address, cursor } = queryKey[1];
  const url = getUrl('https://api.opensea.io/api/v1/assets', {
    owner: address,
    limit: LIMIT,
    ...(cursor ? { cursor } : {}),
  });
  const response = await fetch(url.href);
  const data = camelize((await response.json()) ?? {}, { deep: true });

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

export const useAssetsQuery = () => {
  const { address, cursor, setCursor } = useSearchContext();

  // Fetch OpenSea API assets via owner address lookup
  const result = useQuery(['open-sea-assets', { address, cursor }], fetchAssets, {
    context, // Necessary since we specify context on provider
    enabled: !!address, // Fetch data only when address exists
    keepPreviousData: true, // When paginated data is loading, retain previous data
    retry: false, // Disable retries on failure
    staleTime: 1000 * 60 * 60, // 60 minutes before results are considered stale
  });

  const fetchNextPage = useCallback(() => {
    if (result.data?.next) {
      setCursor(result.data.next);
    }
  }, [result.data?.next, setCursor]);

  const fetchPreviousPage = useCallback(() => {
    if (result.data?.previous) {
      setCursor(result.data.previous);
    }
  }, [result.data?.previous, setCursor]);

  return {
    ...result,
    fetchNextPage,
    fetchPreviousPage,
  };
};

export const useAsset = (tokenId?: string) => {
  const { data } = useAssetsQuery();
  return (tokenId && data?.assets.find((asset) => asset.tokenId === tokenId)) || null;
};
