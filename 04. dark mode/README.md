# **4. dark mode**

- [**4. dark mode**](#4-dark-mode)
  - [**요구사항**](#요구사항)
  - [**useState vs. 일반 변수**](#usestate-vs-일반-변수)
    - [**현상**(Facts)](#현상facts)
    - [**발견**(Discovery)](#발견discovery)
    - [**배운점**(Lessons Learned)](#배운점lessons-learned)
  - [**initializer를 이용한 lazy initialization**](#initializer를-이용한-lazy-initialization)
    - [**현상**(Facts)](#현상facts-1)
    - [**발견**(Discovery)](#발견discovery-1)
    - [**배운점**(Lessons Learned)](#배운점lessons-learned-1)
  - [**theme의 상태를 어떤 형식의 데이터로 관리할까?**](#theme의-상태를-어떤-형식의-데이터로-관리할까)
    - [**현상**(Facts)](#현상facts-2)
    - [**발견**(Discovery)](#발견discovery-2)
    - [**배운점**(Lessons Learned)](#배운점lessons-learned-2)
  - [**모든 컴포넌트는 theme를 props로 받는다.**](#모든-컴포넌트는-theme를-props로-받는다)
    - [**현상**(Facts)](#현상facts-3)
    - [**발견**(Discovery)](#발견discovery-3)
    - [**배운점**(Lessons Learned)](#배운점lessons-learned-3)
  - [**useEffect의 필요성 - document.body.dataset.theme**](#useeffect의-필요성---documentbodydatasettheme)
    - [**현상**(Facts)](#현상facts-4)
    - [**발견**(Discovery)](#발견discovery-4)
    - [**배운점**(Lessons Learned)](#배운점lessons-learned-4)
    - [**선언**(Declation)](#선언declation)

<br>

## **요구사항**

1. 로컬스토리지에 저장되어 있는 테마(다크 모드/라이트 모드)를 기준으로 초기 렌더링한다.
   - `body` 요소에 `dark` 클래스를 추가하면 다크 모드가 적용되고 body 요소에서 `dark` 클래스를 제거하면 라이트 모드가 적용되도록 CSS가 작성되어 있다.
   - 로컬스토리지에 저장되어 있는 테마가 없다면 `window.matchMedia` 메서드로 사용자 OS 테마를 감지해 이를 로컬스토리지에 저장하고 테마를 적용한다.
   - 로컬스토리지에 저장되어 있는 테마가 있다면 사용자 OS 테마보다 이를 우선 적용한다.
2. 토글 버튼을 클릭하면 로컬스토리지에 테마를 저장하고 저장된 테마를 기준으로 다시 렌더링한다.
3. 초기 렌더링 또는 새로 고침 시, 아래와 같이 토글 버튼의 트랜지션과 기존 테마가 변경되어 깜빡거리는 현상이 발생하지 않도록 한다. 이를 위해 `body` 요소에 `hide` 클래스를 추가해 두었다. `.toggle-button` 버튼에서 발생하는 트랜지션이 종료되면 `hide` 클래스를 제거해 `body` 요소를 표시한다.
4. CSS 변수 `—transition-duration`은 변경될 수 있다. 따라서 자바스크립트에서 CSS 변수 `—transition-duration`을 참조해야 한다.

<br>

## **useState vs. 일반 변수**

### **현상**(Facts)

- 이번 미션을 수행할 떄, 바닐라 JS에서 상태를 관리할 때 처럼 일반 변수에 상태를 만들었다. 즉, `useState` 훅을 사용하지 않고도 미션을 구현할 수 있었다.

```js
const useTheme = () => {
  let theme = (() => {
    const localTheme = window.localStorage.getItem('theme');
    const windowTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';

    return localTheme || windowTheme;
  })();

  const changeTheme = () => {
    const nextTheme = theme === 'light' ? 'dark' : 'light';
    theme = nextTheme;
    localStorage.setItem('theme', nextTheme);
    document.body.dataset.theme = theme;
  };

  useEffect(() => {
    document.body.dataset.theme = theme;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return changeTheme;
};
```

<br>

### **발견**(Discovery)

- 하지만 이 방법은 성능상 이점이 없을 뿐만 아니라, 코드의 가독성과 유지보수성도 떨어졌다.
- 일반 변수를 사용하면 상태 변경을 추적하는 부분을 직접 관리해야 하기 때문인데, 실수할 가능성이 높아져서 버그를 발생시키기 쉽다.
- 리액트에서 상태 값을 변경하는 경우, `useState`나 `useReducer`를 사용하고, 이를 통해 리액트는 내부적으로 상태 값을 추적하여 필요한 경우에만 렌더링을 다시하므로 성능과 코드 가독성이 향상되도록 해야한다.

<br>

### **배운점**(Lessons Learned)

- 일반 변수로 상태를 사용하면 상태를 직접 변경하게되고, React가 상태 변경을 감지하지 못하여 컴포넌트가 제대로 업데이트되지 않을 수 있다. 또한, 컴포넌트 외부에서 상태가 변경되는 것은 예측하기 어렵고, 디버깅하기도 어려울 수 있다.(리액트 안티패턴!!)
- React 상태 값이 변경될 때마다 컴포넌트가 리렌더링되는 것은 맞다. 그러나 `useState` 훅을 사용하여 상태를 관리하는 것이 일반 변수를 사용하는 것보다 더 나은 이유는, useState는 리액트의 가상 DOM과 함께 동작하여 성능 최적화를 도와주기 때문이다.
- `useState` 훅은 내부적으로 상태를 비교하여 값이 변경된 경우에만 컴포넌트를 리렌더링한다. 또한, 상태 업데이트를 처리하는 방법을 최적화하여, 필요한 경우에만 리렌더링하도록 설계되어 있다.
- 따라서 `useState`를 사용하여 상태를 관리하는 것이 일반 변수를 사용하는 것보다 코드 가독성, 유지 보수성, 그리고 성능 측면에서 모두 더 나은 선택이다.

<br>

## **initializer를 이용한 lazy initialization**

### **현상**(Facts)

- 상태에 따른 초기 렌더링을 하기 위해서 렌더링 되기 전에 어떻게 localStorage 에서 `theme`값을 가져올 수 있을지에 대해 고민이 되었다.

<br>

### **발견**(Discovery)

- useState에 초기 값으로 initializer를 사용할 수 있음을 발견했다.

  ```js
  const [theme, setTheme] = useState(() => {
    const localTheme = window.localStorage.getItem('theme');
    const windowTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';

    return localTheme || windowTheme;
  });
  ```

<br>

### **배운점**(Lessons Learned)

- initializer를 사용하면 렌더링 될 때마다 함수 객체를 생성하지만, 초기 렌더링 시에만 함수를 호출한다.
- 함수가 실행 된 후 반환 값으로 초기 값을 설정하기 때문에 상태에 따른 초기 렌더링이 가능하다.
- [useState lazy initialization](https://kentcdodds.com/blog/use-state-lazy-initialization-and-function-updates)

<br>

## **theme의 상태를 어떤 형식의 데이터로 관리할까?**

### **현상**(Facts)

- 다크모드 상태 `isDark`를 boolean 값으로 `true`, `false`로 사용하였다.
- boolean 상태로 css 스타일 까지 관리하려고 보니 몇몇 번거로움이 생겼다.
- 예를 들어, `ThemeProvider` 버젼에서는 아래와 같이 `ThemeProvider`에게 넘겨주는 `props` 에 style 객체를 삼항조건연산자로 평가하고 알맞은 객체를 전해주어야 했기 때문에 두 객체를 생성해야했다.

```jsx

return (
  <ThemeProvider theme={darkTheme ? darkThemeStyles : lightThemeStyles}>
  // ...
)

const lightThemeStyles = {
  body: {
    backgroundColor: null,
  },
  switch: {
    left: '2px',
  },
  iconWrapper: {
    backgroundColor: '#3dbf87',
  },
  article: {
    color: null,
  },
};

const darkThemeStyles = {
  body: {
    backgroundColor: '#232323',
  },
  switch: {
    left: '52px',
  },
  iconWrapper: {
    backgroundColor: '#fc3164',
  },
  article: {
    color: '#fff',
  },
};
```

<br>

### **발견**(Discovery)

- 상태를 문자열로 관리하면 직관적이다.
- 상태를 객체의 key로 사용이 가능하다. ( 하나의 객체로 관리 가능 )
  - `isDark ? darkTheme : lightTheme` => `themes[theme]`
- `body`의 data-theme에 값을 전달해줄 때, 삼항조건연산자를 쓰지 않고 theme 값(상태)를 바로 전달할 수 있다.
- style 객체를 하나로 줄일 수 있다.

```jsx
const lightStyleTheme = {
  // ...
};
const darkStyleTheme = {
  // ...
};
```

```jsx
const themes = {
  light: {
    // ...
  },

  dark: {
    // ...
  },
};
```

```css
body[data-theme='light'] {
  --colors-global-background: null;
  --colors-ico-background: #3dbf87;
  --colors-article: null;
  --switch-left-position: 2px;
}

body[data-theme='dark'] {
  --colors-global-background: #232323;
  --colors-ico-background: #fc3164;
  --colors-article: #fff;
  --switch-left-position: 52px;
}
```

<br>

### **배운점**(Lessons Learned)

- theme 상태를 문자열로 관리하면 보다 직관적으로 theme 상태를 알 수 있었으며, 우아하게 theme 객체를 만들 수 있을뿐 아니라 상태로 접근할 수 있었다.
- 이번 프로젝트에서 가장 중요한 상태인 theme은 `'light'`, `'dark'`가 좀 더 상태를 직관적으로 나타내는 방법이라고 생각하게 되었다.

<br>

## **모든 컴포넌트는 theme를 props로 받는다.**

### **현상**(Facts)

- (Theme Switch를 컴포넌트로 분리하면서) `ThemeProvider`에서 제공하는 theme를 어떻게 가져올 수 있을지 생각했다.

<br>

### **발견**(Discovery)

- 직접 props로 theme를 전달하지 않고, `useTheme`를 사용하지 않아도 하위 컴포넌트에서 props에 접근할 수 있었다.

<br>

### **배운점**(Lessons Learned)

- Context API와는 달리 styled-components의 `ThemeProvider`는 자동으로 하위 컴포넌트에게 theme를 props로 전달해준다.
- 따라서 styled-components에서 제공하는 `useTheme` 훅을 사용하지 않고 theme에 접근할 수 있다.

<br>

## **useEffect의 필요성 - document.body.dataset.theme**

### **현상**(Facts)

- `useEffect`는 dependency의 값이 변경될 때 마다 setup 함수가 실행된다.
- 현재 코드에서는 스위치에서 클릭 이벤트가 발생할 때마다 dependency(theme 상태) 가 변경된다.
- 따라서 클릭 이벤트 핸들러를 사용한다면 `useEffect`가 필요하지 않다고 생각했다.

```js
// theme provider ver.
const changeTheme = () => {
  const nextTheme = theme === 'light' ? 'dark' : 'light';

  setTheme(nextTheme);
  localStorage.setItem('theme', nextTheme);
};

// css variable ver.
const changeTheme = () => {
  const nextTheme = theme === 'light' ? 'dark' : 'light';

  setTheme(nextTheme);
  localStorage.setItem('theme', nextTheme);
};

useEffect(() => {
  document.body.dataset.theme = theme;
}, [theme]);
```

<br>

### **발견**(Discovery)

- ThemeProvider을 이용하여 구현하였을 때는 `useEffect`의 필요성을 느끼지 못했다.
- 그러나, CSS variables를 이용하면 body의 `data-theme` 어트리뷰트에 theme를 지정하게 된다.
  - `useEffect`를 사용하지 않고, 이벤트 핸들러에서 처리할 경우 초기 렌더링 후 첫 번째 클릭이벤트 발생 전까지는 `body`의 `data-theme` 어트리뷰트 값이 설정되지 않는다.

<br>

### **배운점**(Lessons Learned)

- `useEffect`를 사용하면 초기 렌더링 후, 그리고 dependency의 값이 변경될 때마다 함수가 실행된다.

### **선언**(Declation)

- `useState`를 사용할 때, lazy initialization이 필요하면 useState의 인수로 해당 함수 로직를 전달하자.
- 훅을 사용할 때 훅이 필요한 상황인지 충분히 생각하고 사용하자.
- 상태로는 직관적으로 알아보기 쉬운 데이터 타입의 상태를 활용하자.
- React에서 일반변수 보단 state나 reducer를 적극 활용하자. 리액트팀은 해당 상태들을 최고로 최적화 해두었다.

<br>

---
