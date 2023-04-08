# **07. tabs**

- [**07. tabs**](#07-tabs)
  - [**요구사항**](#요구사항)
  - [**useEffect를 이용하여 TabsData 가져오기**](#useeffect를-이용하여-tabsdata-가져오기)
    - [**현상**(Facts)](#현상facts)
    - [**발견**(Discovery)](#발견discovery)
    - [**배운점**(Lessons Learned)](#배운점lessons-learned)
  - [**ErrorBoundary와 Suspense 하위 컴포넌트에서 useQuery 사용**](#errorboundary와-suspense-하위-컴포넌트에서-usequery-사용)
    - [**현상**(Facts)](#현상facts-1)
    - [**발견**(Discovery)](#발견discovery-1)
    - [**배운점**(Lessons Learned)](#배운점lessons-learned-1)
  - [**선언**(Declation)](#선언declation)

<br>

## **요구사항**

1. `fetchTabsData` 함수를 사용해 탭 정보를 담고 있는 배열을 전달받아 `Tabs`를 동적 생성한다.
2. 탭 정보를 담고 있는 배열의 `length`는 가변적이다. 즉, 탭 정보를 담고 있는 배열의 길이를 취득해 `Tabs`를 생성할 필요가 있다.
3. `fetchTabsData` 함수는 프로미스를 반환하며 이 프로미스는 `fulfilled` 상태가 될 때까지 1초 소요된다. 프로미스가 `fulfilled` 상태가 될 때까지 스피너(`.spinner` 요소)를 표시한다.

<br>

---

## **useEffect를 이용하여 TabsData 가져오기**

### **현상**(Facts)

- 초기 렌더링 시 tabs Data를 가져오기 위해 `useEffect` 훅을 사용하였다
- `fetchTabsData` 함수는 Promise를 반환하므로 `async`/`await`를 사용하여 데이터를 가져온다.

  ```
  Warning: useEffect must not return anything besides a function, which is used for clean-up.

  It looks like you wrote useEffect(async () => ...) or returned a Promise. Instead, write the async function inside your effect and call it immediately:

  useEffect(() => {
    async function fetchData() {
      // You can await here
      const response = await MyAPI.getData(someId);
      // ...
    }
    fetchData();
  }, [someId]); // Or [] if effect doesn't need props or state

  Learn more about data fetching with Hooks: https://reactjs.org/link/hooks-data-fetching
      at App (http://127.0.0.1:5173/src/App.jsx?t=1680084955447:23:27)

  ```

<br>

### **발견**(Discovery)

1. async 함수를 setup 함수로 구현 ❌

```js
useEffect(async() => {
  try{
    //...
    const data = await fetchTabsData();
  }
  //...
},[]);
```

`async` 함수는 Promise 객체를 반환한다. 그러나 `useEffect`의 setup 함수의 반환 값은 cleanup 함수여야 한다. 따라서 위와 같이 setup 함수로 async 함수를 사용하면 안된다.

2. setup함수가 `async` 함수를 반환하도록 구현 ❌

```js
useEffect(() => async() => {
  try{
    //...
    const data = await fetchTabsData();
  }
  //...
},[]);
```

위 코드의 경우 `async` 함수는 cleanup 함수가 된다. cleanup 함수는 컴포넌트가 언마운트될 때 실행된다. 그러나 언마운트 되기 전에 정상적으로 tabsData를 가져오는 것을 확인하였다. 정상적으로 동작하는 이유는 React에서 제공하는 `Strict Mode` 이다. `Strict Mode`로 인해서 컴포넌트가 다시 re-render 되기 때문에 컴포넌트가 마운트 되면서 cleanup 함수가 실행된다.

3. async 함수를 즉시 실행 함수로 감싼 함수 정의 ⭕

```js
useEffect(() => {
  (async() => {
    try{
      //...
      const data = await fetchTabsData();
    }
    //...
  })()
}, []);
```

1번과 2번에서 보았듯이 현재 상황에서는 `useEffect`의 인수로 전달하는 setup함수가 `undefined`를 반환해야 하며, 내부에서 `fetchTabsData`를 실행하고 그 결과를 `await`로 받아와야 한다.
따라서 `async` 함수를 즉시 실행함수로 감싼 함수를 정의하여 setup 함수로 전달하였다.

<br>

### **배운점**(Lessons Learned)

- `useEffect` 의 setup 함수는 cleanup 함수 또는 `undefined`를 반환한다.
- 선언하고 호출하는 반면, 함수를 직접 정의하고 호출(즉시 실행함수)하면 더 간결하게 처리할 수 있다.
- Strict 모드에서는 re-render가 발생하기 때문에 cleanup 함수가 실행된다.

<br>

## **ErrorBoundary와 Suspense 하위 컴포넌트에서 useQuery 사용**

### **현상**(Facts)

- ReactQuery를 사용하면서 `ErrorBoundary`와 `Suspense`를 사용하였다.
- 처음에 컴포넌트를 분리하지 않고 루트 컴포넌트(App)에서 모든 기능을 구현하였고, App 컴포넌트 내부에서 하위의 모든 컴포넌트들을 `<ErrorBoundary>`와 `<Suspense>`로 감쌌다.
- 이 때, Loader가 출력되지 않는 현상이 발생했다.

<br>

### **발견**(Discovery)

- 위와 같이 구현했을 때, Suspense가 `isLoading` 상태를 캐치하지 못했다.
- 루트(App) 컴포넌트에서 useQuery를 사용하였기 때문에, 루트 컴포넌트 하위에 있는 Suspense는 상위 컴포넌트의 `isLoading`을 캐치하지 못하고 있다는 것을 발견했다.

<br>

### **배운점**(Lessons Learned)

- `ErrorBoundary`와 `Suspense`는 하위 컴포넌트에서 사용한 ReactQuery에 대한 `isLoading`과 `error`를 캐치한다.
- 따라서 루트 컴포넌트 뿐만 아니라 하위 컴포넌트에서도 `error`나 `isLoading`에 대한 처리를 위해 `ErrorBoundary`와 `Suspense`를 사용할 수 있다.

<br>

## **선언**(Declation)

- `Strict mode`에서는 re-render가 발생하기 때문에 예기치 못한 오류를 만날 수 있다.
  - 특히, 이번 미션의 실수(useEffect, cleanup func)는 배포까지 넘어간다면 바로 오류를 만날 수 있었다. 주의하자!
  - Hook이나 함수, 라이브러리의 사용법을 잘 숙지하고 사용하자!
  - 오류 메세지를 잘 읽자!
- 바닐라 js를 다루던 습관에서 벗어나 관리하고 있는 상태를 잘 활용하여 UI를 그리자.

<br>

---

**0️⃣7️⃣ Tabs 수업 내용 정리 👀**

App을 감싸는 컴포넌트들 ( ex: Provider, router ) 위치 : App vs Main

- 일관성 유지하기 ( App에 위치하는 것이 좋음. )
  render props : 컴포넌트를 return하는 함수 ( ex: fallbackRender )

react-query

- 캐싱 기능
