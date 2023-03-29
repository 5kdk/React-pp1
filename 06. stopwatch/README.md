# **06. stopwatch**

- [**06. stopwatch**](#06-stopwatch)
  - [**요구사항**](#요구사항)
  - [**elapsedTime 상태 변경 시 updater 함수 사용❌**](#elapsedtime-상태-변경-시-updater-함수-사용)
    - [**현상**(Facts)](#현상facts)
    - [**발견**(Discovery)](#발견discovery)
    - [**배운점**(Lessons Learned)](#배운점lessons-learned)
  - [**state와 useState, useRef**](#state와-usestate-useref)
    - [**현상**(Facts)](#현상facts-1)
    - [**발견**(Discovery)](#발견discovery-1)
    - [**배운점**(Lessons Learned)](#배운점lessons-learned-1)
  - [**오차 줄이기 위한 useRef 사용**](#오차-줄이기-위한-useref-사용)
    - [**현상**(Facts)](#현상facts-2)
    - [**발견**(Discovery)](#발견discovery-2)
    - [**배운점**(Lessons Learned)](#배운점lessons-learned-2)
    - [**선언**(Declation)](#선언declation)

<br>

## **요구사항**

1. 스톱워치의 경과 시간은 mm:ss:ms 형식(예시 ‘01:59:89’)으로 표시한다.
   | 구분 | 의미 | 범위 | 비고 |
   | :---: | :---: | :---: | --- |
   | mm | 분 | 0 ~ | |
   | ss | 초 | 0 ~ 59 | |
   | ms | 미리초 | 0 ~ 99 | 미리초는 1000분의 1초를 나타내므로 원래 3자리가 필요하지만 2자리(10ms 단위)로 표시한다. |
2. 스톱워치는 2개의 컨트롤 버튼을 가진다.
   - 왼쪽 버튼은 클릭할 때마다 Start/Stop으로 토글된다.
   - 오른쪽 버튼은 아래와 같이 왼쪽 버튼에 종속적이다. 왼쪽 버튼이 Start이면 오른쪽 버튼은 Reset이고 왼쪽 버튼이 Stop이면 오른쪽 버튼은 Lap이다.  
      | 왼쪽 버튼 | 오른쪽 버튼 |
     | --- | --- |
     | Start | Reset |
     | Stop | Lap |
3. 각 버튼의 기능은 다음과 같다.
   | 버튼 | 기능 |
   | ----- | --------------------------------------------------------------------------------------------------- |
   | Start | 스톱워치를 시작한다. |
   | Stop | 스톱워치를 일시정지시킨다. |
   | Reset | 경과 시간와 랩 타임을 초기화한다. 경과 시간이 ‘00:00:00’이면 Reset 버튼은 disabled 상태이어야 한다. |
   | Lap | 랩 타임을 기록한다. |

<br>

## **elapsedTime 상태 변경 시 updater 함수 사용❌**

### **현상**(Facts)

- 상태를 이용하여 state를 변경할 때 set 함수의 인수로 값을 전달할 수도 있고, updater 함수를 전달할 수 있다.
- 10ms 마다 이전 상태인 `elapsedTime`을 이용하여 값을 새롭게 계산하여 `setElapsedTime`함수에 전달하였다.
  ```js
  setInterval(() => {
    // ...
    setElapsedTime(elapsedTime + (lastIntervalTime.current - startTime));
  }, 10);
  ```
  <br>

### **발견**(Discovery)

- setElapsedTime 함수를 10ms 마다 호출하므로 elapsedTime 상태 값도 10ms 마다 변경될 것으로 예상했지만, console 창에 출력하여 stop 버튼을 누르기 전까지 elapsedTime이 유지되는 것을 확인하였다.

<br>

### **배운점**(Lessons Learned)

- 아래와 같이 updater 함수를 setElapsedTime의 인수로 넘기면 updater함수의 인수로 직전 상태를 전달하기 때문에 elapsedTime은 고정되지 않고 10ms마다 바뀐다.

  ```js
  setInterval(() => {
    // ...
    setElapsedTime(elapsedTime => elapsedTime + (lastIntervalTime.current - startTime));
  }, 10);
  ```

- 업데이트된 직전 값을 사용하려면 인수로 직전값을 받아오는 updater 함수를 사용하면 되지만, 고정값을 이용하려면 값 자체를 set 함수의 인수로 넘기면 된다.
  <br>

## **state와 useState, useRef**

### **현상**(Facts)

- stopwatch를 구현하다보니 다양한 상태가 필요했는데, 어떠한 방법으로 상태 변수를 만들어야 할지에 대한 고민이 생겼다.

<br>

### **발견**(Discovery)

- stopwatch를 구성하는 값들을 정리하면 아래와 같다.
  - `isStart` : 스톱워치가 시작이 되었는지 여부 (re-render)
  - `elapsedTime` : 스톱워치에 보여질 숫자를 만들어 내기 위한 ms 값 (re-render)
  - `laps` : 스톱워치에 보여질 시간 기록을 담아둔 배열 (re-render)
  - `lastIntervalTime` : interval 시간과 사용자의 인터렉션 사이 오차를 잡아주기 위한 값 (re-rander 필요 x)
  - `intervalId` : clearInterval을 해주기 위한 interval Id 값 (re-rander 필요 x)

<br>

### **배운점**(Lessons Learned)

| <center>refs</center>                                                   | <center>state</center>                                                                                |
| ----------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------- |
| `useRef(initialValue)`는 `{ current: initialValue }`를 반환한다.        | `useState(initialValue)`는 ` [value, setValue]`를 반환한다.                                           |
| 값이 바뀌었을 때 re-render가 트리거 되지 않는다.                        | 값이 바뀌었을 때 re-render가 트리거 된다.                                                             |
| Mutable — 렌더링 과정에서 current value를 수정하고 업데이트 할 수 있다. | Immutable — 상태 값을 수정하고, re-render queue에 추가하기 위해서 state setting 함수를 사용해야 한다. |
| 렌더링 중에 current value를 읽을 수 없다.                               | state를 언제든지 읽을 수 있다. 그러나, 각 렌더링은 변경되지 않는 스냅샷을 가지고 있다.                |

- 사용자에 의한 이벤트가 발생하고, 이에 따라 변수의 값이 변한다고 하더라도 UI에 영향을 주는지 고려해야 한다.

<br>

## **오차 줄이기 위한 useRef 사용**

### **현상**(Facts)

- stop 버튼을 눌렀을때 이벤트 헨들러에서 `clearInterval`이 실행되어 스톱워치가 멈추는데, interval이 10ms 마다 실행되기 때문에 상태 `elapsedTime`이 실제 소요 시간과 1~10ms의 오차가 생길 수 있음을 발견했다.

```js
const start = startTime => {
  setIsStart(true);
  intervalId.current = setInterval(() => {
    const currentTime = Date.now();
    setElapsedTime(elapsedTime + (currentTime - startTime));
  }, 10);
};

const stop = () => {
  clearInterval(intervalId.current);
  setIsStart(false);
};
```

<br>

### **발견**(Discovery)

- 이를 해결하기 위해 현재 시간을 저장하기 위한 `ref` 객체를 생성하고, interval마다 `ref.current`에 현재 시간을 담아준다.
- 이 ref을 이용해서 stop 이벤트 헨들러안에서 다시 계산된 시간으로 `setElapsedTime` 해주면 오차를 해결할 수 있음을 발견했다.

```js
const start = startTime => {
  setIsStart(true);
  intervalId.current = setInterval(() => {
    lastIntervalTime.current = Date.now();
    setElapsedTime(elapsedTime + (lastIntervalTime.current - startTime));
  }, 10);
};

const stop = () => {
  clearInterval(intervalId.current);
  setElapsedTime(elapsedTime + (Date.now() - lastIntervalTime.current));
  setIsStart(false);
};
```

<br>

### **배운점**(Lessons Learned)

-

<br>

### **선언**(Declation)

- 훅을 사용하면서 re-render가 발생하는 상황을 고려하고, re-render가 발생할 때 내부적으로 어떤 동작이 실행되는지 생각하면서 코드를 작성해야겠다.

<br>

---
