import { useState } from 'react';
import styled from 'styled-components';
import { AiFillStar } from 'react-icons/ai';

// prettier-ignore
const Container = styled.div`
  --main-color: #dcdcdc;
  --hovered-color: #a7a7a7;
  --selected-color: #db5b33;

  width: 300px;
  text-align: center;
  margin: 0px auto;
  user-select: none;
`;

const Star = styled(AiFillStar)`
  font-size: 50px;
  color: var(--main-color);
  cursor: pointer;

  ${props => (props.hovered ? 'color: var(--hovered-color);' : '')}
  ${props => (props.selected ? 'color: var(--selected-color);' : '')}
`;

const Stars = ({ maxRating, selectedRating, setSelectedRating }) => {
  const [hoveredRating, setHoveredRating] = useState(0);

  return (
    <Container>
      {Array.from({ length: maxRating }, (_, i) => (
        <Star
          key={i}
          selected={i < selectedRating}
          hovered={i < hoveredRating ? 'true' : undefined}
          onClick={() => setSelectedRating(i + 1)}
          onMouseEnter={() => setHoveredRating(i + 1)}
          onMouseLeave={() => setHoveredRating(0)}
        />
      ))}
    </Container>
  );
};

export default Stars;
