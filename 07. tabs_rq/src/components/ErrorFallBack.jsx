import styled from 'styled-components';

const ErrorFallback = ({ error }) => (
  <Container>
    <ErrorCode>{error.request.status}</ErrorCode>
    <ErrorText>{error.request.statusText} 😥</ErrorText>
  </Container>
);

export default ErrorFallback;

const Container = styled.div`
  margin-top: 50px;
  text-align: center;
`;

const ErrorCode = styled.h1`
  font-size: 50px;
  color: #b83f45;
`;

const ErrorText = styled.pre`
  font-size: 35px;
  font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
`;
