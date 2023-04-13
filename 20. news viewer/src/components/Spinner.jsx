import styled from 'styled-components';

const Container = styled.div`
  text-align: center;
  margin: 10px;
`;

const Spinner = () => (
  <Container>
    <img src="./src/img/ball-triangle.svg" alt="Loading..." />
  </Container>
);

export default Spinner;
