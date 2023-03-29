# **05. popup modal**

- [**05. popup modal**](#05-popup-modal)
  - [**요구사항**](#요구사항)
  - [**컴포넌트 분리로 인한 lifting state up**](#컴포넌트-분리로-인한-lifting-state-up)
    - [**현상**(Facts)](#현상facts)
    - [**발견**(Discovery)](#발견discovery)
    - [**배운점**(Lessons Learned)](#배운점lessons-learned)
    - [**선언**(Declation)](#선언declation)

<br>

## **요구사항**

-

<br>

## **컴포넌트 분리로 인한 lifting state up**

### **현상**(Facts)

- Modal 컴포넌트를 분리하는 것이 코드 복잡도나 가독성 측면에서 더 낫다고 판단했다.

<br>

### **발견**(Discovery)

- 현재 관리 중인 isOpened와 outputValue는 Modal 컴포넌트 뿐만 아니라 루트 컴포넌트(App)에서 관리 중인 하위 요소들도 필요로 하는 상태이다.
  <br>

### **배운점**(Lessons Learned)

- 만약 하위 컴포넌트가 더 많아질 경우 전달해야 하는 props의 수가 많아지므로 복잡도가 높아질 것이다.
- 그러나 현재 애플리케이션은 한 단계만 전달하므로 상태를 끌어올리는 방법을 선택했다. ( App 컴포넌트에서 상태를 관리하며, props로 핸들러를 전달하는 방식 )

<br>

### **선언**(Declation)

- 가독성과 유지보수성을 위해 컴포넌트를 분리하면 상태 관리가 어려워지므로, 충분히 고려하고 컴포넌트 분리가 필요하다고 생각되면 분리해야겠다.

<br>

---
