export type ObjectAPIData = {
  objectID: number;
  isHighlight?: boolean;
  accessionNumber?: string;
  accessionYear?: string;
  isPublicDomain?: boolean;
  primaryImage?: string;
  primaryImageSmall?: string;
  additionalImages?: Array<string>;
  constituents?: Array<any>;
  department?: string;
  objectName?: string;
  title?: string;
  culture?: string;
  period?: string;
  dynasty?: string;
  reign?: string;
  portfolio?: string;
  artistRole?: string;
  artistPrefix?: string;
  artistDisplayName?: string;
  artistDisplayBio?: string;
  artistSuffix?: string;
  artistAlphaSort?: string;
  artistNationality?: string;
  artistBeginDate?: string;
  artistEndDate?: string;
  artistGender?: string;
  artistWikidataURL?: string;
  artistULAN_URL?: string;
  objectDate?: string;
  objectBeginDate?: number;
  objectEndDate?: number;
  medium?: string;
  dimensions?: string;
  dimensionsParsed?: number;
  measurements?: Array<any>;
  creditLine?: string;
  geographyType?: string;
  city?: string;
  state?: string;
  county?: string;
  country?: string;
  region?: string;
  subregion?: string;
  locale?: string;
  locus?: string;
  excavation?: string;
  river?: string;
  classification?: string;
  rightsAndReproduction?: string;
  linkResource?: string;
  metadataDate?: Date;
  repository?: string;
  objectURL?: string;
  tags?: Array<any>;
  objectWikidata_URL?: string;
  isTimelineWork?: boolean;
  GalleryNumber?: string;
}

export type ObjectsAPIData = {
  total: number;
  objectIDs: Array<number>;
}

export interface MetaData {
  currentPage: number;
  totalPages: number;
  itemsPerPage: number;
  totalItems: number;
}