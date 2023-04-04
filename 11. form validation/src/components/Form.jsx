import styled from 'styled-components';

import { useForm } from 'react-hook-form';

import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

import { AiFillCheckCircle, AiFillCloseCircle } from 'react-icons/ai';

import useToasts from '../library/toast/hooks/useToasts';

const Container = styled.form`
  width: 100%;
  max-width: var(--width);
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate3d(-50%, -50%, 0);
  background: var(--background-color);
  border-radius: 5px;
  padding: 50px 30px;
`;

const Title = styled.div`
  position: relative;
  width: 100%;
  line-height: 40px;
  font-size: 1.8rem;
  font-weight: 500;
  letter-spacing: 2px;
  color: var(--main-color);

  :before {
    content: '';
    width: 5px;
    height: 100%;
    position: absolute;
    top: 0;
    left: -30px;
    background: var(--main-color);
  }
`;

const InputContainer = styled.div`
  position: relative;
  margin-top: 55px;
`;

const Label = styled.label`
  font-size: 0.9rem;
  color: var(--label-color);
`;

const Input = styled.input`
  color: var(--font-color);
  width: 100%;
  height: 50px;
  border: none;
  background: transparent;
  outline: none;
  padding: 0.4rem;

  :focus + label,
  :valid + label {
    top: -65%;
    font-size: 0.8rem;
  }

  + label {
    position: absolute;
    top: 0;
    left: 0.4rem;
    line-height: 60px;
    cursor: pointer;
    transition: var(--transition-delay) ease;
  }

  :focus ~ span:before,
  :focus ~ span:after {
    width: 50%;
  }
`;

const Bar = styled.span`
  position: absolute;
  left: 0;
  bottom: 0;
  background: var(--label-color);
  width: 100%;
  height: 1px;

  :before,
  :after {
    content: '';
    position: absolute;
    background: var(--main-color);
    width: 0;
    height: 2px;
    transition: var(--transition-delay) ease;
  }

  :before {
    left: 50%;
  }

  :after {
    right: 50%;
  }
`;

const IconSuccess = styled(AiFillCheckCircle)`
  width: 24px;
  height: 24px;
  position: absolute;
  top: 1rem;
  right: 0.4rem;
  font-size: 1.4rem;
  pointer-events: none;
  color: var(--blue);
`;

const IconError = styled(AiFillCloseCircle)`
  width: 24px;
  height: 24px;
  position: absolute;
  top: 1rem;
  right: 0.4rem;
  font-size: 1.4rem;
  pointer-events: none;
  color: var(--red);
`;

const Error = styled.div`
  position: absolute;
  top: 120%;
  left: 0.4rem;
  font-size: 0.8rem;
  font-weight: normal;
  color: var(--red);
`;

const Button = styled.button`
  width: 100%;
  line-height: 64px;
  font-weight: 900;
  font-size: 1.2rem;
  margin: 65px 0 20px;
  border: 3px solid transparent;
  background-color: var(--main-color);
  color: #fff;
  cursor: pointer;
  outline: none;

  :disabled {
    background-color: transparent;
    border: 3px solid rgba(0, 0, 0, 0.1);
    color: rgba(0, 0, 0, 0.2);
  }
`;

const Link = styled.div`
  margin: 10px 0 20px;
  color: var(--label-color);
  text-align: center;
  transition: var(--transition-delay) ease;

  a:hover {
    color: var(--main-color);
  }
`;

const schema = {
  signin: z
    .object({
      userid: z.string().email({ message: '이메일 형식에 맞게 입력해주세요.' }),
      password: z.string().regex(/^[A-Za-z0-9]{6,12}$/, { message: '영문 또는 숫자를 6~12자 입력하세요.' }),
    })
    .required(),

  signup: z
    .object({
      name: z.string().min(1, { message: '이름을 입력하세요.' }),
      userid: z.string().email({ message: '이메일 형식에 맞게 입력해주세요.' }),
      password: z.string().regex(/^[A-Za-z0-9]{6,12}$/, { message: '영문 또는 숫자를 6~12자 입력하세요.' }),
      passwordConfirm: z.string(),
    })
    .required()
    .refine(data => data.password === data.passwordConfirm, {
      message: '패스워드가 일치하지 않습니다.',
      path: ['passwordConfirm'],
    }),
};

const formText = {
  signin: {
    title: 'SIGN IN',
  },
  signup: {
    title: 'SIGN UP',
  },
};

const SignForm = ({ type }) => {
  const { success } = useToasts();

  const {
    register,
    handleSubmit,
    formState: { isValid, dirtyFields, errors },
  } = useForm({
    resolver: zodResolver(schema[type]),
    mode: 'onChange',
  });

  const onSubmit = () => {
    success({ message: 'SignIn Successfully' });
  };

  return (
    <Container onSubmit={handleSubmit(onSubmit)}>
      <Title>{formText[type].title}</Title>
      <InputContainer>
        <Input name="signin-userid" {...register('userid')} autoComplete="off" />
        <Label htmlFor="signin-userid">email</Label>
        <Bar />
        {dirtyFields.userid && !errors.userid && <IconSuccess />}
        {errors.userid && (
          <>
            <IconError />
            <Error>{errors.userid.message}</Error>
          </>
        )}
      </InputContainer>

      {type === 'signin' ? (
        <>
          <InputContainer>
            <Input type="password" id="signin-password" {...register('password')} autoComplete="off" />
            <Label htmlFor="signin-password">Password</Label>
            <Bar />
            {dirtyFields.password && !errors.password && <IconSuccess />}
            {errors.password && (
              <>
                <IconError />
                <Error>{errors.password.message}</Error>
              </>
            )}
          </InputContainer>
        </>
      ) : (
        <>
          <InputContainer>
            <Input id="signup-name" {...register('name')} autoComplete="off" />
            <Label htmlFor="signup-name">name</Label>
            <Bar />
            {dirtyFields.name && !errors.name && <IconSuccess />}
            {errors.name && (
              <>
                <IconError />
                <Error>{errors.name.message}</Error>
              </>
            )}
          </InputContainer>
          <InputContainer>
            <Input type="password" id="signup-password" {...register('password')} autoComplete="off" />
            <Label htmlFor="signup-password">Password</Label>
            <Bar />
            {dirtyFields.password && !errors.password && <IconSuccess />}
            {errors.password && (
              <>
                <IconError />
                <Error>{errors.password.message}</Error>
              </>
            )}
          </InputContainer>
          <InputContainer>
            <Input type="password" id="signup-password-confirm" {...register('passwordConfirm')} autoComplete="off" />
            <Label htmlFor="signup-password-confirm">Confirm Password</Label>
            <Bar />
            {dirtyFields.passwordConfirm && !errors.passwordConfirm && <IconSuccess />}
            {errors.passwordConfirm && (
              <>
                <IconError />
                <Error>{errors.passwordConfirm.message}</Error>
              </>
            )}
          </InputContainer>
        </>
      )}
      <Button disabled={!isValid}>{formText[type].title}</Button>
      {type === 'signin' ? (
        <Link className="link">
          Not a member?
          <a href="/signup">Sign up now</a>
        </Link>
      ) : (
        <Link className="link">
          Already a member? <a href="/">Sign in</a>
        </Link>
      )}
    </Container>
  );
};

export default SignForm;
