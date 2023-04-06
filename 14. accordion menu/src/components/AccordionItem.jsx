import React from 'react';
import styled from 'styled-components';
import { MdArrowDropDown } from 'react-icons/md';

const SubMenuList = styled.ul`
  height: 0;
  overflow: hidden;
  margin: 0;
  padding: 0;
  background: #444359;
  font-size: 14px;
  list-style-type: none;
`;

const Title = styled.h1`
  position: relative;
  margin: 0;
  padding: 15px 15px 15px 45px;
  font-size: 1em;
  color: #4d4d4d;
  border-bottom: 1px solid #ccc;
  cursor: pointer;
`;

const SubMenuItem = styled.li`
  height: 44px;
  border-bottom: 1px solid #4b4a5e;
`;

const Link = styled.a`
  display: block;
  padding: 12px;
  padding-left: 48px;
  text-decoration: none;
  color: #d9d9d9;
  transition: all 0.2s ease-in-out;

  :hover {
    color: #fff;
    background: #b63b4d;
  }
`;

const ArrowIcon = styled(MdArrowDropDown)`
  position: absolute;
  top: 1.2rem;
  left: 1rem;
  color: #595959;
  pointer-events: none;
`;

// prettier-ignore
const Container = styled.article`
  ${props => props.active ? `
    ${Title} > ${ArrowIcon} {
      transform: rotate(180deg);
      color: #b63b4d;
    }

    ${Title} {
      color: #b63b4d;
    }

    ${SubMenuList} {
      height: auto;
    }` : ''}

  ${props => props.isLastChild ? `
    ${Title} {
        border-bottom: 0;
    }

    ${SubMenuList} {
        border-radius: 0 0 4px 4px;
    }` : ''}
`;

const AccordionItem = ({ id, title, subMenu, active, toggleMenu, isLastChild }) => (
  <Container active={active} isLastChild={isLastChild}>
    <Title onClick={() => toggleMenu(id)}>
      <ArrowIcon />
      {title}
    </Title>
    {active && (
      <SubMenuList>
        {subMenu.map((item, idx) => (
          <SubMenuItem key={`${idx}-${subMenu.title}`}>
            <Link href={item.path}>{item.title}</Link>
          </SubMenuItem>
        ))}
      </SubMenuList>
    )}
  </Container>
);

export default AccordionItem;
