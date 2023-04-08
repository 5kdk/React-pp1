# **0. 미션명**

- [**0. 미션명**](#0-미션명)
  - [**요구사항**](#요구사항)
  - [**문제: 문제**](#문제-문제)
    - [**현상**(Facts)](#현상facts)
    - [**발견**(Discovery)](#발견discovery)
    - [**배운점**(Lessons Learned)](#배운점lessons-learned)
    - [**선언**(Declation)](#선언declation)

<br>

- 상태를 이용하는 debounce
-

## **요구사항**

-

<br>

## **문제: 문제**

### **현상**(Facts)

-

<br>

### **발견**(Discovery)

-

<br>

### **배운점**(Lessons Learned)

-

<br>

### **선언**(Declation)

-

<br>

---

**0️⃣9️⃣ autoComplete 수업 내용 정리 👀**

- 하위 컴포넌트 이름에 상위 컴포넌트 이름을 포함할 필요가 없다.

  ```js
  const student = {
    name: 'yebin', // O
    studentName: 'yebin', //X
  };
  ```

  - 화살표 함수로 생성한 함수 객체와 함수 선언문으로 생성한 함수 객체의 차이점은?

    - this 바인딩 (constructor 유무)
    - 함수 호이스팅

    - 함수 선언문은 다양하게 호출 가능하다는 문제점 ( new, 일반함수, 메서드 등 )
    - 화살표함수는 정의와 동시에 export 할 수 없다.

    <!-- - 프로토타입이 없는 함수 vs 있는 함수 ....? -->

    - constructor vs non-consturctor(메서드, 화살표 함수)
    - 메서드 vs 화살표 함수
      - this바인딩
      - super
      - arguments 객체

  - useCallback vs useMemo
    - useCallback : 첫 번째 인수로 전달한 함수를 호출하지 않고 함수 객체를 기억함.
    - useMemo : 첫 번째 인수로 전달한 함수를 호출한 후의 값(반환 값)을 기억함.

- debounce 다시 공부해야겠다.

```js
  //problem
    onChange={e => {
      setValue(e.target.value);
      debounceFiltering();
      // 이렇게 하면 value를 제대로 인식하지 못함(업데이트 된 값에 접근하지 못함)
    }}
```

```js
  //solution
    onChange={e => {
      const value = e.target.value;
      setValue(value);
      debounceFiltering(value);
    }}
```

    - 바닐라JS에서의 onChange: focus가 input 창에서 벗어났을 때,
    - react에서의 onChange  = 바닐라 JS 에서의 onInput

- 일부만 debounce를 걸어줘야할 때 useCallback을 걸어줘야함.
- uncontrolled이면 useCallback X

- untrusted data: 서버가 아닌 사용자가 제공한 data

- dangerouslySetInnerHTML : untrusted data는 위험하다는 의미!
