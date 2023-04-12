import { useMemo, useState } from 'react';
import styled from 'styled-components';
import AccordionItem from './AccordionItem';

const Container = styled.div`
  width: 300px;
  margin: 20px 0;
`;

const AccordionList = styled.div`
  background: #fff;
  border-radius: 5px;
  box-shadow: 0 7px 8px -4px rgba(0, 0, 0, 0.2), 0 13px 19px 2px rgba(0, 0, 0, 0.14), 0 5px 24px 4px rgba(0, 0, 0, 0.12);
`;

const initialize = (showMultiple, menuList) =>
  showMultiple
    ? menuList.reduce((ids, { id, isOpen }) => (isOpen ? [...ids, id] : ids), [])
    : [menuList.find(menu => menu.isOpen).id];

const Accordion = ({ menuList = [], showMultiple = false }) => {
  const [activeMenuIds, setActiveMenuIds] = useState(initialize(showMultiple, menuList));

  const toggleMenu = useMemo(() => {
    if (showMultiple) {
      return id =>
        setActiveMenuIds(activeMenuIds =>
          activeMenuIds.includes(id) ? activeMenuIds.filter(_id => _id !== id) : [...activeMenuIds, id]
        );
    }
    return id => setActiveMenuIds(activeMenuIds => (activeMenuIds.includes(id) ? [] : [id]));
  }, []);

  return (
    <Container>
      <AccordionList>
        {menuList.map(({ id, title, subMenu }) => (
          <AccordionItem
            key={id}
            title={title}
            subMenu={subMenu}
            isActive={activeMenuIds.includes(id)}
            toggleMenu={() => {
              toggleMenu(id);
            }}
            isLastChild={id === menuList.at(-1).id}
          />
        ))}
      </AccordionList>
    </Container>
  );
};

export default Accordion;
