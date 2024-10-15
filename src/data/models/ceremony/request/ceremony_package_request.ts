export type CeremonyPackageRequest = {
  id?: string;
  name: string;
  ceremonyServiceId: number | string;
  description: string;
  price: number;
};

export type CeremonyPackagesRequest = {
  packages: CeremonyPackageRequest[];
};
