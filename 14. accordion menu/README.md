# **14. Accordion menu🪗**

- [**14. Accordion menu🪗**](#14-accordion-menu)
  - [**showMultiple에 따른 상태 관리**](#showmultiple에-따른-상태-관리)
    - [**현상**(Facts)](#현상facts)
    - [**발견**(Discovery)](#발견discovery)
    - [**배운점**(Lessons Learned)](#배운점lessons-learned)
  - [**선언**(Declation)](#선언declation)

## **showMultiple에 따른 상태 관리**

### **현상**(Facts)

- `Accordion` 컴포넌트는 props로 menuList와 showMultiple을 상위 컴포넌트로부터 전달 받는다.
- `Accordion` 컴포넌트 하위에 있는 `AccordionItem`을 클릭했을 때 하위 subMenuList을 open / close 시킬 수 있다.
  - showMultiple이 `true`이면
    - 다른 `AccordionItem`의 open 여부와 상관없이 클릭된 요소의 하위 컴포넌트 `subMenuList`를 open / close 시킨다.
  - showMultiple이 `false`이면
    - close 상태인 `AccordionItem`을 클릭하였을 때, 기존에 open되어있던 `AccordionItem`은 close 시키고, 클릭된 `AccordionItem`은 open시킨다. ( 단 하나의 `AccordionItem`만 open 상태 )
    - open 상태인 `ACcordionItem`을 클릭하였을 때, close 시킨다. ( 모든 `AccordionItem`은 close 상태 )

<br>

### **발견**(Discovery)

- showMultiple이 `true`인 `Accordion`은 하위 컴포넌트인 `AccordionItem`들의 open 상태를 가지고 있을 필요가 없지만 showMultiple이 `false`인 `Accordion`은 open 중인 `AccordionItem`을 알아야 한다.
- Accordion 컴포넌트를 showMultiple이 true인 경우와 false인 경우 모두 사용하기 위해 activeMenuIds 상태를 가지고 있도록 구현하였다.

  ```js
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

    // ...
  };
  ```

- 상태로 관리가 필요한 값은 isOpen값들이기 때문에, initializer를 통해 menuList에서 isOpen 프로퍼티만 갖고 와서 관리하였다.

<br>

### **배운점**(Lessons Learned)

- `showMultiple`을 props로 넘겨 받아 필요한 함수를 구분하여 정의해주면 컴포넌트를 따로 생성하지 않고 하나의 컴포넌트를 재사용하여 구현할 수 있다.
- 또한, `useMemo`로 최초 렌더링 시에만 함수를 메모제이션 해주면, 또 다시 구분하여 정의할 필요없이 메모제이션된 함수를 계속 사용가능하다.

<br>

## **선언**(Declation)

- `showMultiple`에 따라 상태의 초기 값이 달라지고, 상태 update 함수도 달라진다. 이 때, 컴포넌트를 분리해서 사용하면 좋을지, 하나의 컴포넌트를 재사용해서 사용할지 잘 고민하고 사용하자.
  - 만약, `showMultiple`에 따라 컴포넌트를 분리한다면 `showMultiple`이 `true`인 컴포넌트는 `activeMenuIds` 상태가 아니라 하위의 `<AccordionItem>`마다 `isOpen` 상태를 가지고 있게 된다.
  - 그렇다면 `showMultiple`에 따라 하위 컴포넌트인 `<AccordionItem>`도 각각 만들어야 하므로 컴포넌트의 재사용성이 떨어지게된다.
  - 따라서 `showMultiple`을 props로 넘겨받아 `<Accordion>` 컴포넌트를 재사용하였다.

<br>

---
