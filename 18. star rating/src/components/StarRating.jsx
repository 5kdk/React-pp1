import { useState } from 'react';
import styled from 'styled-components';
import Stars from './Stars';

const CurrentRating = styled.div`
  margin: 20px;
  text-align: center;
`;

const StarRating = ({ maxRating }) => {
  const [selectedRating, setSelectedRating] = useState(0);

  return (
    <>
      <Stars maxRating={maxRating} selectedRating={selectedRating} setSelectedRating={setSelectedRating} />
      <CurrentRating>
        current rating: <span>{selectedRating}</span>
      </CurrentRating>
    </>
  );
};

export default StarRating;
