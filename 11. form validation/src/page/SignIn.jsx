import styled from 'styled-components';

import { useForm } from 'react-hook-form';

import { zodResolver } from '@hookform/resolvers/zod';

import { Link } from 'react-router-dom';

import useToasts from '../library/toast/hooks/useToasts';

import InputContainer from '../components/InputContainer';
import SubmitButton from '../components/SubmitButton';

import schema from '../schema/signSchema';

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

const LinkContainer = styled.div`
  margin: 10px 0 20px;
  color: var(--label-color);
  text-align: center;
  transition: var(--transition-delay) ease;

  a:hover {
    color: var(--main-color);
  }
`;

const SignIn = () => {
  const { success } = useToasts();

  const { control, handleSubmit, formState } = useForm({
    resolver: zodResolver(schema.signin),
    mode: 'onChange',
  });

  const onSubmit = () => {
    success({ message: 'SignUp Successfully' });
  };

  return (
    <Container onSubmit={handleSubmit(onSubmit)}>
      <Title>SIGN IN</Title>
      <InputContainer name="userid" control={control} />
      <InputContainer name="password" control={control} />
      <SubmitButton disabled={formState.isValid} content="SIGN IN" />
      <LinkContainer>
        Not a member?
        <Link to="/signup">Sign up now</Link>
      </LinkContainer>
    </Container>
  );
};

export default SignIn;
