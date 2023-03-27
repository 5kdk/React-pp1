# **1. scrolling goto top**

- [**1. scrolling goto top**](#1-scrolling-goto-top)
  - [**요구사항**](#요구사항)
  - [**src="./assets/react.svg"**](#srcassetsreactsvg)
    - [**현상**(Facts)](#현상facts)
    - [**발견**(Discovery)](#발견discovery)
    - [**배운점**(Lessons Learned)](#배운점lessons-learned)
  - [**조건부 렌더링 vs props**](#조건부-렌더링-vs-props)
    - [**현상**(fact)](#현상fact)
    - [**발견**(Discovery)](#발견discovery-1)
    - [**배운점** (Lessons Learned)](#배운점-lessons-learned)
  - [**자식 컴포넌트 TopButton**](#자식-컴포넌트-topbutton)
    - [**현상**(Facts)](#현상facts-1)
    - [**발견**(Discovery)](#발견discovery-2)
    - [**배운점**(Lessons Learned)](#배운점lessons-learned-1)
  - [**Keyframes를 이용한 애니메이션**](#keyframes를-이용한-애니메이션)
  - [**선언**(Declation)](#선언declation)

<br>

## **요구사항**

1. 수직으로 스크롤한 거리가 300px 보다 크거나 같으면 `.scroll-icon` 버튼을 활성화한다.
2. 수직으로 스크롤한 거리가 300px 보다 작으면 `.scroll-icon` 버튼을 비활성화한다.
3. `.scroll-icon` 버튼을 클릭하면 맨 위로 스크롤한다.
4. scroll 이벤트는 짧은 시간 간격으로 연속해서 발생한다. 이벤트 핸들러가 과도하게 호출되지 않도록 한다.
   - <41장 3.디바운스와 스로틀>을 참고한다. 단, 직접 구현하지 말고 lodash를 사용한다.

<br>

## **src="./assets/react.svg"**

### **현상**(Facts)

- `<img>` 태그에 `src`로 `react.svg` svg 파일의 경로를 주었으나 화면에 제대로 이미지가 나오지 않는 문제가 있었다.

<br>

### **발견**(Discovery)

- `<img>` 태그의 src 속성은 index.html 기준으로 경로를 잡는게되어 이미지를 제대로 불러오지 못하 것을 확인했다.
- 이를 해결할 방법으로 두가지 대안을 발견했다.
  - 첫번쨰 index.html 기준으로 이미지 경로를 넘겨주는 방법
  - `import` 문으로 이미지를 가져오는 방법

```jsx
import reactLogo from './assets/react.svg';

// ...

return (
  // <img src={'./assets/react.svg'} alt="go up button" />  // path를 찾지 못함
  // <img src={'src/assets/react.svg'} alt="go up button" />
  <img src={reactLogo} alt="go up button" />
);
```

<br>

### **배운점**(Lessons Learned)

- 컴포넌트안에서 직관적으로 경로를 나타내기 위해, 경로를 `src`로 넘겨주는 것 보다 이미지를 `import`해서 넘겨줬다.
- jsx는 파싱되어 하나의 html이 되기 때문에, 표현식을 쓰거나 혹은 경로를 문자열로 줄 때는 html 파일을 기준으로 작성해야 한다는 점을 배웠다.

<br>

## **조건부 렌더링 vs props**

<br>

### **현상**(fact)

- 아이콘 컴포넌트를 `isPassed` 상태에 따라 UI에 보여주려할때, 조건부 렌더링으로 처리할지 혹은 `props`를 이용해서 styled-components에서 처리할지에 대한 고민이 있었다.

### **발견**(Discovery)

```jsx
// ...

return (
  <Icon
    role="button"
    visible={isPassed}
    onClick={() => {
      window.scrollTo({ top: 100, left: 100, behavior: 'smooth' });
    }}>
    <img src={reactLogo} alt="go up button" />
  </Icon>
);
```

```jsx
// ...

return (
  <>
    {isPassed && (
      <Icon
        role="button"
        onClick={() => {
          window.scrollTo({ top: 100, left: 100, behavior: 'smooth' });
        }}>
        <img src={reactLogo} alt="go up button" />
      </Icon>
    )}
  </>
);
```

- `props` 를 이용하면 `visible` 프로퍼티에 `true` / `false` 값을 넘겨주면 된다.
- 따라서 조건부 렌더링을 이용하는 것보다 `props`를 이용할 때 가독성이 좋다고 판단했다.
- 그러나 props를 이용해 display를 설정하려면 해당 컴포넌트가 이미 Dom tree에 존재해야 한다.

<br>

### **배운점** (Lessons Learned)

- 다른 컴포넌트(Title, Section)가 포함된 App에서 상태를 관리하면 상태 변경 시 다른 컴포넌트들 까지 re-render가 발생한다.
- 이미지 요소의 상위 컴포넌트(TopButton)를 생성하면 컴포넌트 내부에서 상태 관리를 할 수 있으며, 조건부 렌더링을 통해 Icon 컴포넌트가 생성되기 전에 렌더링 여부를 결정할 수 있다.

<br>

## **자식 컴포넌트 TopButton**

### **현상**(Facts)

- `isPassed` 상태는 `TopButton`(Icon)의 `display`에만 영향을 준다. 그러나 `isPassed` 상태가 변경될 때마다 `Title`과 `Section` 요소도 함께 리렌더링된다.

<br>

### **발견**(Discovery)

- 조건부 렌더링 방식을 선택했다면 부모 컴포넌트에서 자식 컴포넌트의 렌더링 여부를 결정해야하므로 상위 컴포넌트에서 상태를 가지고 있어야 했다.
- 현재 우리는 `props`를 이용하여 `display`를 결정한다. 따라서 `TopButton`(하위) 컴포넌트가 있다면 직접 상태를 가지고 있으며 `TopButton`만 렌더링된다.

<br>

### **배운점**(Lessons Learned)

- 화면을 re-rander하는 React hook들을 사용할때, re-rander가 필요하지 않은 컴포넌트들에게 최대한 영향이 가지 않도록 구조를 짜는 방법에 대해 고민할 수 있었다.

<br>

## **Keyframes를 이용한 애니메이션**

styled-components에서 제공하는 `keyframes` 메서드를 이용하여 애니메이션의 keyframes를 생성할 수 있다.

아래와 같이 생성한 keyframes모델을 animation 선언에 사용한다.

`styled.keyframes` ❌

`import { keyframes } from 'styled-components'` ⭕

```js
const glow = keyframes`
  0% {
    opacity: 1;
  }

  50% {
    opacity: 0.3;
    transform: translate3D(-50%, 10px, 0);
  }
`;

const Icon = styled.div`
  ...
  animation: ${glow} 4s infinite;
  ...
`;
```

<br>

## **선언**(Declation)

- 컴포넌트가 조건에 따라 렌더링되어야 할 때 DOM tree에 생성되었는지에 대한 여부를 고려해야겠다.
- 코드가 깔끔해진다고 좋은게 아니라는 것을 다시한번 느꼈다.
- React 컴포넌트들을 다룰땐 re-render가 최대한 적게 일어나도록 구조를 짜야겠다.

<br>

---
