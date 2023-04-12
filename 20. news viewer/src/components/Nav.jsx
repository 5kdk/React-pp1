import React from 'react';
import styled from 'styled-components';
import { useRecoilState } from 'recoil';
import selectedNavState from '../recoil/atoms/selectedNavState';

const CategoryList = styled.nav`
  width: 768px;
  margin: 0 auto;
  padding: 1rem;
`;

const Categories = styled.ul`
  display: flex;
  justify-content: space-between;
  margin: 0;
  padding: 0;
  list-style-type: none;
`;

const CategoryItem = styled.li`
  font-size: 1.125rem;
  cursor: pointer;
  text-decoration: none;
  color: inherit;
  padding-bottom: 0.25rem;

  :hover {
    color: #495057;
  }

  ${props =>
    props.isActive
      ? `
        font-weight: 600;
        border-bottom: 2px solid #22b8cf;
        color: #22b8cf;

        :hover {
            color: #3bc9db;
        }
    `
      : ''}
`;

const categories = [
  { id: 'all', title: '전체보기' },
  { id: 'business', title: '비즈니스' },
  { id: 'entertainment', title: '엔터테인먼트' },
  { id: 'health', title: '건강' },
  { id: 'science', title: '과학' },
  { id: 'sports', title: '스포츠' },
  { id: 'technology', title: '기술' },
];

const Nav = () => {
  const [selectedNav, setSelectedNav] = useRecoilState(selectedNavState);

  return (
    <CategoryList>
      <Categories>
        {categories.map(({ id, title }) => (
          <CategoryItem key={id} isActive={id === selectedNav} onClick={() => setSelectedNav(id)}>
            {title}
          </CategoryItem>
        ))}
      </Categories>
    </CategoryList>
  );
};

export default Nav;
