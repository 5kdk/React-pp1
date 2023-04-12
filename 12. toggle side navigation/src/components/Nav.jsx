import styled from 'styled-components';

// prettier-ignore
const Container = styled.nav`
  left: -300px;
  width: 300px;
  background: #20232a;
  ${props => props.isOpened ? `
  transform: translate3d(300px, 0, 0);
  ` : ''}
`;

const Nav = ({ isOpened }) => <Container isOpened={isOpened} />;

export default Nav;
