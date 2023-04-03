import React from 'react';
import styled from 'styled-components';
import { AiFillCheckCircle, AiFillCloseCircle } from 'react-icons/ai';

const Form = styled.form`
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

  :focus ~ span {
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

// .hidden {
//   display: none !important;
// }

// .toast-container {
//   position: fixed;
//   bottom: 0px;
//   right: 0px;
// }

const App = () => (
  <Form className="form signin" noValidate>
    <Title className="title">SIGN IN</Title>
    <InputContainer className="input-container">
      <Input id="signin-userid" name="userid" required autoComplete="off" />
      <Label htmlFor="signin-userid">email</Label>
      <Bar className="bar"></Bar>
      <IconSuccess className="hidden"></IconSuccess>
      <IconError className="hidden"></IconError>
      <Error className="error"></Error>
    </InputContainer>
    <InputContainer className="input-container">
      <Input type="password" id="signin-password" name="password" required autoComplete="off" />
      <Label htmlFor="signin-password">Password</Label>
      <Bar className="bar"></Bar>
      <IconSuccess className="icon icon-success bx bxs-check-circle hidden"></IconSuccess>
      <IconError className="icon icon-error bx bxs-x-circle hidden"></IconError>
      <Error className="error"></Error>
    </InputContainer>
    <Button className="signin button" disabled>
      SIGN IN
    </Button>
  </Form>
);

export default App;
