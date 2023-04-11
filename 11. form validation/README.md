# **0. 미션명**

- [**0. 미션명**](#0-미션명)
  - [**요구사항**](#요구사항)
  - [**문제: 문제**](#문제-문제)
    - [**현상**(Facts)](#현상facts)
    - [**발견**(Discovery)](#발견discovery)
    - [**배운점**(Lessons Learned)](#배운점lessons-learned)
    - [**선언**(Declation)](#선언declation)

<br>

## **요구사항**

- mode vs trigger
<!-- 이거 가져옴 -->

- Link 컴포넌트 안쓰고 a 태그 사용하면 새로 고침(?) 때문에 toast 제거됨.
- 폼 하나로 통합하면 폼필드 값들이 유지됨. ( 그대로 옮겨감..아마도 diff 때문 ...? )

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

  <!-- // formState의 error 객체가 없을때는 undefined 인데, 성공했을때를 어떻게 판별하고 success 버튼을 그려줄까?

  // isValid 는 form 내의 모든 field가 유효성 검사를 통과했는지에 대한 boolean 값을 반환한다. (탈락)
  // 그렇담 isDirty 를 사용해볼까? form 자체의 dirty 상태에 대한 boolean 값을 반환한다. (탈락)
  // 남은건 dirtyFields 뿐,,, field 수준에서 dirty를 확인하고 field 별 boolean 값을 가진 객체를 반환한다. (굿!)

  // console.dir(dirtyFields);
  // dirtyFields {userid: true, password: true}

  // https://www.developerway.com/posts/debouncing-in-react 
  
  maybe 회고록 -->

- 문제 SignForm vs. SignIn, SignUp

```jsx
const signTypeMap = {
  signin: {
    title: 'SIGN IN',
    fields: ['userid', 'password'],
    content: 'Not a member?',
    link: '/signup',
    linkcontent: 'Sign up now',
  },
  signup: {
    title: 'SIGN UP',
    fields: ['userid', 'name', 'password', 'passwordConfirm'],
    content: 'Already a member?',
    link: '/',
    linkcontent: 'Sign in',
  },
};

const SignForm = ({ type }) => {
  const { success } = useToasts();

  const { control, watch, handleSubmit, formState, trigger, reset } = useForm({
    resolver: zodResolver(schema[type]),
    mode: 'onChange',
  });

  const { title, fields, content, link, linkcontent } = signTypeMap[type];

  const password = watch('password');

  useEffect(() => {
    const obj = fields.reduce((acc, cur) => {
      acc[cur] = '';
      return acc;
    }, {});

    reset(obj);
  }, [fields, reset]);

  useEffect(() => {
    trigger('passwordConfirm');
  }, [password, trigger]);

  const onSubmit = () => {
    success({ message: 'SignUp Successfully' });
  };

  return (
    <Container onSubmit={handleSubmit(onSubmit)}>
      <Title>{title}</Title>
      {fields.map(field => (
        <InputContainer key={`${type}-${field}`} name={field} control={control} />
      ))}
      <SubmitButton disabled={formState.isValid} content={title} />
      <LinkContainer>
        {content}
        {<Link to={link}>{linkcontent}</Link>}
      </LinkContainer>
    </Container>
  );
};

export default SignForm;
```

**1️⃣1️⃣ Form Validation 수업 내용 정리 👀**
