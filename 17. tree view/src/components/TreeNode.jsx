import { useState } from 'react';
import styled from 'styled-components';

import TreeLeafNode from './TreeLeafNode';

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

// prettier-ignore
const TreeSwitcher = styled.span`
  display: inline-block;
  width: 14px;

  :before {
    content: '▶ ';
    ${props => props.isOpen ? `
    display: inline-block;
    transform: rotate(90deg);` : ''}
  }
`;

const SubTreeContainer = styled.ul`
  padding-left: 16px;
`;

const TreeNode = ({ name, subTree, isOpen }) => {
  const [isOpenState, setIsOpenState] = useState(isOpen);

  return (
    <Container>
      <Link
        href="/"
        onClick={e => {
          e.preventDefault();
          setIsOpenState(!isOpenState);
        }}>
        <TreeSwitcher isOpen={isOpenState} />
        <span>{name}</span>
      </Link>
      {isOpenState && (
        <SubTreeContainer>
          {subTree.map(({ id, name, children, isOpen }) =>
            children ? (
              <TreeNode key={id} name={name} subTree={children} isOpen={isOpen} />
            ) : (
              <TreeLeafNode key={id} name={name} />
            )
          )}
        </SubTreeContainer>
      )}
    </Container>
  );
};

export default TreeNode;
