import { useState, useRef } from 'react';
import styled from 'styled-components';

const Form = styled.form`
  width: 450px;
  height: 200px;
  background-color: #ffffff;
  margin: 40px auto;
  padding: 50px 30px;
  border-radius: 8px;
  box-shadow: 0 20px 25px rgba(0, 0, 0, 0.18);

  :focus {
    border-bottom: 2px solid #673ab7;
  }
`;

const Input = styled.input.attrs({
  type: 'text',
  placeholder: 'Enter a word to check',
  autoFocus: true,
})`
  width: 240px;
  padding: 10px 5px;
  font-size: 1rem;
  border: none;
  border-bottom: 2px solid #d5d5d5;
  outline: none;
`;

const Button = styled.button.attrs({ type: 'submit' })`
  width: 100px;
  margin-left: 35px;
  padding: 10px 20px;
  font-size: 1rem;
  background-color: #673ab7;
  border: none;
  border-radius: 3px;
  color: #ffffff;
  cursor: pointer;
`;

const Output = styled.p`
  margin-top: 35px;
  color: #673ab7;
  font-weight: 400;
`;

const isPalindrome = str => {
  const replacedStr = str.toLowerCase().replace(/[^ㄱ-힣|a-z|0-9]/g, '');

  return replacedStr && replacedStr === [...replacedStr].reverse().join('');
};

const PalindromeUC = () => {
  const [submittedStr, setSubmittedStr] = useState('');
  const inputRef = useRef();

  return (
    <Form
      onSubmit={e => {
        e.preventDefault();

        setSubmittedStr(inputRef.current.value);
        inputRef.current.value = '';
      }}>
      <Input ref={inputRef} />
      <Button>Check</Button>
      {submittedStr && <Output>{`${submittedStr} is ${isPalindrome(submittedStr) ? '' : 'not'} a palindrome`}</Output>}
    </Form>
  );
};

export default PalindromeUC;
