import styled from 'styled-components';

import { AiFillCheckCircle, AiFillCloseCircle } from 'react-icons/ai';

const Container = styled.div`
  position: relative;
  margin-top: 55px;
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

const Label = styled.label`
  font-size: 0.9rem;
  color: var(--label-color);
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

const inputInfo = {
  userid: {
    type: 'text',
    label: 'email',
  },
  name: {
    type: 'text',
    label: 'name',
  },
  password: {
    type: 'password',
    label: 'Password',
  },
  passwordConfirm: {
    type: 'password',
    label: 'Confirm Password',
  },
};

const InputContainer = ({ name, register, fieldState }) => {
  const { isDirty, error } = fieldState;

  return (
    <Container>
      <Input type={inputInfo[name].type} name={name} {...register(name)} autoComplete="off" />
      <Label>{inputInfo[name].label}</Label>
      <Bar />
      {isDirty && !error && <IconSuccess />}
      {error && (
        <>
          <IconError />
          <Error>{error.message}</Error>
        </>
      )}
    </Container>
    // <InputContainer name="userid" register={register} fieldState={getFieldState('userid')} />
    //   <InputContainer name="name" register={register} fieldState={getFieldState('name')} />
    //   <InputContainer name="password" register={register} fieldState={getFieldState('password')} />
    //   <InputContainer name="passwordConfirm" register={register} fieldState={getFieldState('passwordConfirm')} />
  );
};

export default InputContainer;
