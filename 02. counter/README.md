# **2. Counter**

- [**2. Counter**](#1-scrolling-goto-top)
  - [**요구사항**](#요구사항)
  - [**조건에 따른 onClick 메서드**](#조건에-따른-onclick-메서드)
    - [**현상**(Facts)](#현상facts)
    - [**발견**(Discovery)](#발견discovery)
    - [**배운점**(Lessons Learned)](#배운점lessons-learned)
  - [**선언**(Declation)](#선언declation)

<br>

## **요구사항**

1. 클로저를 사용하여 상태(카운트 값)을 안전하게 변경하고 유지한다.
2. 최소값은 0이다. 즉, 0과 양수만을 카운트한다.

<br>

## **조건에 따른 onClick 메서드**

### **현상**(Facts)

- counter가 0 이하이면 버튼을 클릭해도 `onClick` 메서드가 작동하면 안된다.
- 처음에는 `onClick = {counter > 0 && () => setCounter(counter - 1)}`로 구현하였다.
- 하지만, 다음과 같은 오류를 만났다.

```cmd
Warning: Expected `onClick` listener to be a function, instead got `false`.

If you used to conditionally omit it with onClick={condition && value}, pass onClick={condition ? value : undefined} instead.
```

<br>

### **발견**(Discovery)

- `onClick` 리스너는 함수로 등록되어야 한다. 하지만 논리곱 연산자를 이용하였기 때문에 논리곱 조건의 결과가 `false`가 되는 경우, 함수 대신 `false`가 반환됨을 발견했다.

### **배운점**(Lessons Learned)

- `onClick={condition && value}`를 조건부로 생략하던 것이 있다면, 대신에 `onClick={condition ? value : undefined}`를 전달해야함을 알았다."

<br>

## **선언**(Declation)

- 의미론적인 위치에 알맞은 값이 위치할 수 있도록 코드를 작성해 나아가겠다.

<br>

---
