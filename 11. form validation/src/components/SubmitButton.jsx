import styled from 'styled-components';

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

const SubmitButton = ({ disabled, content }) => <Button disabled={!disabled}>{content}</Button>;

export default SubmitButton;
