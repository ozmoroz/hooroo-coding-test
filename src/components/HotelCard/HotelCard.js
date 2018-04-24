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
    <div className="card flex-row">
      <div class="card-header border-0">
        <img src={props.image} alt={props.title} />
      </div>
      <div className="card-body">
        <h5 className="card-title">{props.title}</h5>
        <p className="card-text">{props.address}</p>
      </div>
    </div>
  );
};
export default HotelCard;
