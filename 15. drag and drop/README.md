# **0. 미션명**

- [**0. 미션명**](#0-미션명)
  - [**요구사항**](#요구사항)
  - [**over 처리**](#over-처리)
    - [**현상**(Facts)](#현상facts)
    - [**발견**(Discovery)](#발견discovery)
    - [**배운점**(Lessons Learned)](#배운점lessons-learned)
  - [**선언**(Declation)](#선언declation)

<br>

// ----- 상태로 관리할 것. -----( 고민 중.. )
// 1. 순위 상태

// 2. over되고 있는 요소
// => ( : 드래그 상태로 다른 요소들 위로 지나갈 때 바닐라에서는 over 클래스 붙여줬었는데, 지금은 props로? )

// 3. 드래그 하고 있는 요소 ( => 상태관리가 필요하다고 생각했는데 드래그 시작할 때는 리렌더링 필요없으니까 그냥 ref 로 관리하면 될 듯 )

## **요구사항**

-

<br>

## **over 처리**

### **현상**(Facts)

- dragTarget이 dropTarget위를 통과 중이면 dropTarget은 over되어 배경색이 바뀌어야 한다.

- over되고 있는 dropTarget요소를 상태로 관리하였다.
  <br>

### **발견**(Discovery)

- onDragEnter 이벤트가 발생하면 overTargetIdx를 해당 요소의 idx로 설정했다.
- onDragLeave 이벤트가 발생하면 overTargetIdx를 null로 설정했다.
- 위와 같이 구현하였더니, 다른 dropTarget을 통과 중일 때 항상 overTargetIdx가 null인 문제를 발견했다.

  ➡️ dragEnter이벤트가 발생한 후에 dragLeave 이벤트가 발생했기 때문에 항상 overTargetIdx 상태가 null이 된다.

1. dragLeave 이벤트 대신 drop 이벤트가 발생했을 때 overTargetIdx를 null로 설정

   ```js
   onDragEnter={() => setOverTargetIdx(idx)}
   onDrop={() => {
      // ...
      setOverTargetIdx(null);
    }}

   ```

   - dragTarget이 다른 dropTarget위로 지나갈 때에는 잘 동작하는 것처럼 보인다.
   - 그러나 Draggable List 밖으로 벗어났을 때, over된 요소가 유지되는 것을 확인할 수 있다.

2. onDragLeave 이벤트에서 update 함수 사용

```js
onDragLeave={() => setOverTargetIdx(overTarget => (overTarget === idx ? null : overTarget))}
```

- dragLeave이벤트가 발생했을 때 직전 overTargetIdx 상태값을 확인하고, 현재 idx와 같은 값이라면 (다른 요소로 dragEnter이벤트가 발생하지 않은 경우) null로 설정한다.
- 만약 해당 요소의 idx와 overTargetIdx가 다른 값이라면 dragTarget이 다른 요소 위를 통과중이므로 overTarget 그대로 유지한다.

<br>

### **배운점**(Lessons Learned)

-

<br>

## **선언**(Declation)

-

<br>

---
