import * as React from 'react';

type Props = {
  foo: number,
  bar?: string
};

const HotelsList = (props: Props) => {
  //props.doesNotExist; // Error! You did not define a `doesNotExist` prop.

  return null;
};

export default HotelsList;
