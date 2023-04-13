import { useContext } from 'react';
import styled from 'styled-components';

import SelectedContext from '../context/SelectedContext';

const Container = styled.li`
  list-style-type: none;
`;

const Link = styled.a`
  display: inline-block;
  width: 100%;
  margin: 2px 0;
  color: #000;
  text-decoration: none;

  :hover {
    text-decoration: underline;
  }
`;

const TreeSwitcher = styled.span`
  display: inline-block;
  width: 14px;
`;

const Content = styled.span`
  ${props => (props.isSelected ? 'text-decoration: underline;' : '')}
`;

const TreeLeafNode = ({ name }) => {
  const [selectedText, setSelectedText] = useContext(SelectedContext);

  return (
    <Container>
      <Link
        href="/"
        onClick={e => {
          e.preventDefault();
          setSelectedText(name);
        }}>
        <TreeSwitcher />
        <Content isSelected={name === selectedText}>{name}</Content>
      </Link>
    </Container>
  );
};

export default TreeLeafNode;
