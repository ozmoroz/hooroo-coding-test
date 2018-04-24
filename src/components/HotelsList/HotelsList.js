// @flow

import * as React from 'react';
import type { Hotels } from '../../types/hotel';
import HotelCard from '../HotelCard';

type Props = {
  hotels: Hotels
};

const HotelsList = (props: Props) => {
  const { hotels } = props;
  if (!hotels) return null;
  // We assume that hotels has been pre-filtered on location
  // and all of them are in Sydney
  return (
    <div>
      <img src="images/qantas-logo.png" alt="Quantas logo" />
      <div>{hotels.length} hotels in Sydney</div>
      {hotels.map(hotel => <HotelCard {...hotel} />)}
    </div>
  );
};

HotelsList.defaultProps = {
  hotels: []
};

export default HotelsList;
