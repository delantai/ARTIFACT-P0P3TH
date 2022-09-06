// OpenSea API typings
// These typings are not comprehensive, and for the sake of the exercise
// cover only the values that will be used.

// export interface OpenSeaAssetTrait {
//   display_type?: 'number' | 'boost_percentage' | 'boost_number' | 'date';
//   trait_type?: string | null;
//   value: string | number | null;
// }

interface OpenSeaCollection {
  name: string;
}

export interface OpenSeaAsset {
  collection: OpenSeaCollection;
  description: string | null;
  imageUrl: string | null;
  name: string | null;
  tokenId: string;
  // OpenSea also supports Enjin Metadata standard which is not included here
  // traits: OpenSeaAssetTrait[];
}

export interface OpenSeaAssets {
  assets: OpenSeaAsset[];
  next: string | null;
  previous: string | null;
}
