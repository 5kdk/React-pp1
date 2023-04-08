# **0. 미션명**

- [**0. 미션명**](#0-미션명)
  - [**요구사항**](#요구사항)
  - [**showMultiple에 따른 상태 관리**](#showmultiple에-따른-상태-관리)
    - [**현상**(Facts)](#현상facts)
    - [**발견**(Discovery)](#발견discovery)
    - [**배운점**(Lessons Learned)](#배운점lessons-learned)
  - [**선언**(Declation)](#선언declation)

<br>

## **요구사항**

- menuList constants로 빼기?

<br>

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

- 또한, showMultiple에 따라 activeMenuIds의 initialize 함수와 update 함수가 다르기 때문에 각 함수를 객체로 묶어서 관리하였다.

```js
const initializer = {
  multiple(menuList) {
    return menuList.reduce((ids, { id, isOpen }) => (isOpen ? [...ids, id] : ids), []);
  },
  nonMultiple(menuList) {
    return [menuList.find(menu => menu.isOpen).id];
  },
};

const Accordion = ({ menuList = [], showMultiple = false }) => {
  const type = showMultiple ? 'multiple' : 'nonMultiple';

  const [activeMenuIds, setActiveMenuIds] = useState(initializer[type](menuList));

  const menuToggler = {
    multiple(id) {
      setActiveMenuIds(activeMenuIds =>
        activeMenuIds.includes(id) ? activeMenuIds.filter(_id => _id !== id) : [...activeMenuIds, id]
      );
    },
    nonMultiple(id) {
      setActiveMenuIds(activeMenuIds.includes(id) ? [] : [id]);
    },
  };

  // ...
};
```

- 상태로 관리가 필요한 값은 isOpen값들이기 때문에, initializer를 통해 menuList에서 isOpen 프로퍼티만 갖고 와서 관리하였다.

<br>

### **배운점**(Lessons Learned)

-

<br>

## **선언**(Declation)

-

<br>

---
