# **3. is palindrome**

- [**3. is palindrome**](#3-is-palindrome)
  - [**요구사항**](#요구사항)
  - [**상태 isPalindrome =\> submittedStr**](#상태-ispalindrome--submittedstr)
    - [**현상**(Facts)](#현상facts)
    - [**발견**(Discovery)](#발견discovery)
    - [**배운점**(Lessons Learned)](#배운점lessons-learned)
  - [**useState vs. useRef**](#usestate-vs-useref)
    - [**현상**(Facts)](#현상facts-1)
    - [**발견**(Discovery)](#발견discovery-1)
    - [**배운점**(Lessons Learned)](#배운점lessons-learned-1)
  - [**선언**(Declation)](#선언declation)

<br>

## **요구사항**

1. 앞뒤를 뒤집어도 똑같은 문자열을 팰린드롬(_palindrome_)이라 한다.
2. `.palindrome-input` 요소에 문자열을 입력한 후 엔터키를 누르거나 Check 버튼을 클릭하면 `.palindrome-input` 요소에 입력한 문자열이 팰린드롬인지 확인해 `.palindrome-result` 요소에 아래와 같이 확인 결과를 표시한다.
   - 팰린드롬인 경우: `"<입력 문자열>" is a palindrome`
   - 팰린드롬이 아닌 경우: `"<입력 문자열>" is not a palindrome`
3. 팰린드롬 판정 조건
   - 입력된 문자열의 알파벳, 한글, 숫자만으로 팰린드롬인지 확인한다.
     - "race car" ⇒ `true`
     - "도제 제도" ⇒ `true`
     - "대나무 너는 너무 나대" ⇒ `true`
   - 알파벳 대소문자를 구분하지 않는다.
     - "A man, a plan, a canal - Panama!" ⇒ `true`
   - 알파벳, 한글, 숫자 이외의 문자열을 제외한 결과가 빈문자열이라면 팰린드롬이 아닌 것으로 판정한다.
     - "#" ⇒ `false`
     - "!@!" ⇒ `false`
   - 입력된 문자열이 없으면 팰린드롬인지 확인하지 않는다.
4. 팰린드롬 확인인 끝나면 `.palindrome-input` 요소에 입력한 문자열을 지운다.

<br>

## **상태 isPalindrome => submittedStr**

### **현상**(Facts)

- 입력한 문자열이 팰린드롬인지 확인하고 그 결과에 따라 result를 출력하기 위해 **팰린드롬 여부**를 상태로 저장하려했고 이게 상태로서 타당한지에 대한 의문이 생겼다.

<br>

### **발견**(Discovery)

- isPalindrome은 Palindrome 체크 함수로 계산이 가능하다.

- 팰린드롬 여부가 아니라 사용자가 check 버튼이나 엔터키를 눌렸는지에 따라 result 표현 여부가 결정된다.

- input요소의 value를 비워주고, result가 출력되면 inputValue는 빈 문자열이 되므로 검사하려는 문자열을 관리하는 상태가 필요하다.

<br>

### **배운점**(Lessons Learned)

- 위와 같은 이유로 isPalindrome이 상태로 관리될 필요가 없음을 느꼈다.

- 함수로 만들어 낼 수 있는 isPalindrome이 아니라 input값이 바뀌어도 Result에 계속 나타나야 하는 submittedStr이 상태로 관리되어야 한다.

- 사용자가 check 버튼을 클릭하거나 엔터키를 눌렀을 때 submittedStr은 문자열을 갖게 되므로 이에 따라 result를 출력한다.

<br>

## **useState vs. useRef**

### **현상**(Facts)

- 상태에 따라 렌더를 하기 때문에, 상태가 유지되어야 화면도 유지되지만 변경이 필요할 경우(input 요소를 비워주어야 하는 경우)가 있었기 때문에, 상태 값을 저장할 새로운 상태를 또 만들어야했다.
  ```js
  const App = () => {
    const [inputStr, setInputStr] = useState('');
    const [submittedStr, setSubmittedStr] = useState('');
    // ...
  };
  ```

<br>

### **발견**(Discovery)

- Input 요소의 값을 상태로 관리하지 않고, useRef를 통해 Input 요소를 참조할 수 있다. 따라서 `inputRef.current.value`로 값을 관리할 수 있다.

### **배운점**(Lessons Learned)

- useRef를 사용하면 불필요한 re-render 없이 input 요소의 값에 접근할 수 있다. (`inputRef.current.value`)  
  (`.current` 프로퍼티를 변형하는 것이 리렌더링을 발생시키지는 않는다.)

<br>

## **선언**(Declation)

- 상태 값을 관리하려고 할 때, 어떤 상황에 re-render가 필요한지, 또 어떤 값을 저장하고 있어야 하는지를 고려해야겠다.
- `useState`로도 해당 미션을 해결할 수 있지만, useRef 처럼 re-render를 발생시키지 않는 훅을 필요시 적극 활용하도록 해야겠다.

<br>

---
