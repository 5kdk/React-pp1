import { useState } from 'react';
import styled from 'styled-components';

import SelectedContext from '../context/SelectedContext';

import { TreeNode, TreeLeafNode } from '.';

import tree from '../constants/tree';

const Container = styled.div`
  display: flex;
  padding: 15px;
`;

const TreeNavigation = styled.nav`
  width: 200px;
`;

const TreeContainer = styled.ul`
  padding: 0;
  margin: 0;
`;

const TreeView = () => {
  const [selectedText, setSelectedText] = useState('');

  return (
    <SelectedContext.Provider value={[selectedText, setSelectedText]}>
      <Container>
        <TreeNavigation>
          <TreeContainer>
            {tree.map(({ id, name, children, isOpen }) =>
              children ? (
                <TreeNode key={id} name={name} subTree={children} isOpen={isOpen} />
              ) : (
                <TreeLeafNode key={id} name={name} />
              )
            )}
          </TreeContainer>
        </TreeNavigation>
        <main>{selectedText}</main>
      </Container>
    </SelectedContext.Provider>
  );
};

export default TreeView;
