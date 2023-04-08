# **08. toast**

- [**08. toast**](#08-toast)
  - [**요구사항**](#요구사항)
  - [**submit버튼 타입 가져오기: e.nativeEvent.submitter**](#submit버튼-타입-가져오기-enativeeventsubmitter)
    - [**현상**(Facts)](#현상facts)
    - [**발견**(Discovery)](#발견discovery)
    - [**배운점**(Lessons Learned)](#배운점lessons-learned)
  - [**Form Field 값 가져오기: HTMLFormElement.elements / e.native.target**](#form-field-값-가져오기-htmlformelementelements--enativetarget)
    - [**현상**(Facts)](#현상facts-1)
    - [**발견**(Discovery)](#발견discovery-1)
    - [**배운점**(Lessons Learned)](#배운점lessons-learned-1)
  - [**Position에 따른 toastList 관리: state 객체 vs selector**](#position에-따른-toastlist-관리-state-객체-vs-selector)
    - [**현상**(Facts)](#현상facts-2)
    - [**발견**(Discovery)](#발견discovery-2)
    - [**배운점**(Lessons Learned)](#배운점lessons-learned-2)
  - [**선언**(Declation)](#선언declation)

<br>

## **요구사항**

1. Success/Error/Info/Warning 버튼을 클릭하면 해당 toast 요소를 생성해 뷰의 표시한다.
2. toast 요소를 생성하는 함수는 아래의 설정 정보를 전달받는다.
3. toast 요소의 부모인 container 요소(.toast-container)를 position 별로 자동 생성한다. 생성된 toast container 요소는 자식 요소인 toast 요소가 하나도 존재하지 않으면 자동 제거되어야 한다.
4. toast 요소는 클릭된 순서대로 순차적으로 표시되어야 한다. 즉, 새롭게 생성된 toast 요소는 가장 아래에 위치한다.
5. autoClose가 true로 설정된 경우 toast 요소는 일정 시간(autoCloseDelay) 후에 자동 제거되어야 한다.
6. autoClose가 false로 설정된 경우 toast 요소는 자동 제거되지 않는다.
7. autoClose를 true로 설정하면 autoCloseDelay를 활성화하고 autoClose를 false로 설정하면 autoCloseDelay를 비활성화한다.
8. closeOnClick가 true로 설정된 경우 toast 요소의 x 버튼을 클릭하면 해당 toast 요소를 즉시 제거한다.
9. closeOnClick가 false로 설정된 경우 toast 요소는 x 버튼을 갖지 않는다.

<br>

## **submit버튼 타입 가져오기: e.nativeEvent.submitter**

### **현상**(Facts)

- 4가지의 타입의 submit 버튼을 클릭했을 때, 버튼 타입에 맞는 Toast를 생성해야한다.
- 컴포넌트에 props로 타입 정보를 전달하여도 html 요소에는 props가 전달되지 않기 때문에 `onClick`이벤트의 `e.target`을 이용해서 토스트 타입 정보를 얻을 수 없다.

<br>

### **발견**(Discovery)

1. `e.target.textContent`를 이용하여 토스트 타입 정보 얻기
   - `textContent`가 변경될 가능성이 있다. 따라서 재사용성을 고려하였을 때 옳지 않은 방법이다.
2. `SubmitEvent.submitter`를 이용하여 submit 버튼 접근하기
   - submit버튼에 name으로 토스트의 타입을 지정하고, `e.nativeEvent.submitter.name`으로 추가할 토스트 타입을 알 수 있었다.

<br>

### **배운점**(Lessons Learned)

- `SubmitEvent.submitter`은 해당 form에 submit이벤트를 발생시킨 요소를 가리킨다.
- React에서 제공하는 이벤트는 합성 이벤트<sup>Synthetic Event</sup>이므로 `e.nativeEvent` (Dom Event)를 이용하여 submitter에 접근해야 한다.

<br>

## **Form Field 값 가져오기: HTMLFormElement.elements / e.native.target**

### **현상**(Facts)

- 생성할 Toast의 정보를 얻기 위해 form field 요소에 접근해야 한다.
- 각 요소들을 제어 컴포넌트나 비제어 컴포넌트로 관리할 수 있다.
- 사용자가 form의 값을 변경시킬 때 마다 값을 관리할 필요 없이 submit 이벤트가 발생했을 때에 값을 취득하면 된다.
- 따라서 비제어 컴포넌트로 관리하며, `autoClose`의 경우 checked 상태일 때만 `autoCloseDelay`가 활성화 되므로 `autoClose`는 제어 컴포넌트로 관리한다.

<br>

### **발견**(Discovery)

1.  `useRef`

    - 비제어 컴포넌트로 관리하기 위해 `useRef` 훅을 사용하였으며, `autoClose`(제어컴포넌트)는 `useState`를 이용하였다.

    - 값에 접근할 때 `ref.current`를 이용해야하고, 각 필드에 `ref`를 지정해주어야 한다.

    ```js
    const [autoClose, setAutoClose] = useState(true);

    const messageRef = useRef();
    const positionRef = useRef();
    const autoCloseDelayRef = useRef();
    const closeOnClickRef = useRef();
    ```

2.  `HTMLFormElement.elements` / `e.nativeEvent.target`

    - `HTMLFormElement.elements`는 form의 field를 가지고 있는 HTMLFormControlsCollection이다.
    - 배열처럼 field의 순서(인덱스)로 각 field에 접근할 수 있으며, 각 fieldju에 `name`이나 `id`를 지정하여 프로퍼티 키로 이용할 수 있다.
    - `HTMLFormElement.elements`와 `e.native.target`는 같은 HTMLFormControlsCollection를 갖는다.
    - 따라서 submitter를 사용할 때 nativeEvent를 사용하므로 일관성을 위해 `e.nativeEvent.target`을 이용하여 각 field에 접근하였다.

          ```js
          const { message, position, autoCloseDelay, closeOnClick } = e.nativeEvent.target;
          ```
          - autoClose는 제어 컴포넌트이므로 useState를 사용하여 관리한다.

      <br>

### **배운점**(Lessons Learned)

- `HTMLFormElement.elements` / `e.nativeEvent.target`는 HTMLFormControlsCollection을 값으로 가진다.
- field에 name(id)을 지정하면 객체 디스터럭쳐링 할당을 이용할 수 있다.

<br>

## **Position에 따른 toastList 관리: state 객체 vs selector**

### **현상**(Facts)

- toast는 bottom-right, bottom-left, top-right, top-left 총 4개의 위치에서 나타날 수 있다. 따라서 이 4가지 position에 따른 toastList를 관리해야 한다.
- 전역 상태로 관리하기 위해 recoil을 사용하였다.
- 4개의 position에 따라 list를 관리하는 방법 두 가지를 고려하였다

  - 객체타입의 상태 하나를 관리하는 방법
    ```js
    const toastListState = atom({
      key: 'toastListState',
      default: {
        'bottom-right': [],
        'bottom-left': [],
        'top-right': [],
        'top-left': [],
      },
    });
    ```
  - 전체 toastList 상태를 관리하며, selector로 position에 따른 toastList를 관리하는 방법

    ```js
    const toastListState = atom({
      key: 'toastListState',
      default: [],
    });

    const BottomRightToastListState = selector({
      key: 'BottomRightToastListState',
      get: ({ get }) => get(toastListState).filter(({ position }) => position === 'bottom-right'),
    });

    // ...
    ```

<br>

### **발견**(Discovery)

- position을 프로퍼티 키로 갖는 객체 타입의 상태로 관리할 경우, toastList에서 toast를 추가할 때와 제거할 때 모두 position에 따른 배열을 먼저 찾고, 해당 배열에 추가하거나 제거해야한다.

  ( 추가할 때 필요한 정보 : position, 삭제할 때 필요한 정보 : position, id)

- selector로 관리할 경우, position을 고려하지 않고, toast를 추가하고 삭제할 수 있다.

  ( 추가할 때 필요한 정보 : X , 삭제할 때 필요한 정보 : id )

<br>

### **배운점**(Lessons Learned)

- 하나의 state로 복잡한 객체로 관리하거나 여러 개의 상태로 관리하지 않고, recoil 라이브러리에서 제공하는 selector를 이용하여 편리하게 파생상태를 관리할 수 있다.
- <br>

## **선언**(Declation)

-

<br>

---

**0️⃣8️⃣ Toast 수업 내용 정리 👀**

- switch문은 scope를 만든다.
- ToastCreator <- Toasts : ToastCreator은 Toasts를 알아야 하지만, Toasts는 ToastCreator를 몰라도 된다.
  ( 응집도 높이고, 결합도는 낮추기 )
  => 연결고리는 toastHandlers 하나!
  - 화살표는 단방향이고 얇을 수록(연결고리가 없을수록) 좋음
- toast와 모달(페이지에 종속적이지 않은 ex: 광고)을 사용할 때 주로 portal 사용
