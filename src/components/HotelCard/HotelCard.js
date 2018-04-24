import * as React from 'react';

type Props = {
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

const HotelCard = (props: Props) => {
  if (!props.id) return null;
  return (
    <div>
      <div>{props.title}</div>
      <div>{props.address}</div>
    </div>
  );
};
export default HotelCard;
