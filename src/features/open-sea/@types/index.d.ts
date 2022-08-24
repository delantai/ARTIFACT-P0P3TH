// OpenSea API typings
// These typings are not comprehensive, and for the sake of the exercise
// cover only the values that will be used.

export interface OpenSeaAssetTrait {
  display_type?: 'number' | 'boost_percentage' | 'boost_number' | 'date';
  trait_type?: string | null;
  value: string | number | null;
}

export interface OpenSeaAsset {
  description: string | null;
  name: string | null;
  token_id: string;
  image_url: string | null;
  // OpenSea also supports Enjin Metadata standard which is not included here
  traits: OpenSeaAssetTrait[];
}

export interface OpenSeaAssetsResponse {
  assets: OpenSeaAsset[];
}
