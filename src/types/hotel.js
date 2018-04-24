// @flow

// Hotel flow types

export type Hotel = {
  id: string,
  title: string,
  address: string,
  image: string,
  rating: number,
  ratingType: string,
  promotion: string,
  name: string,
  price: number,
  savings: number,
  freeCancellation: boolean
};

export type Hotels = Array<Hotel>;
