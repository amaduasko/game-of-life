import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  justify-content: space-around;
`;

const StyledButton = styled.button`
  background-color: #424242;
  color: #eeeeee;
  border: none;
  padding: 10px 20px;
  letter-spacing: 1.2px;
  cursor: pointer;
  font-size: 18px;
  margin: 10px;
  &:hover {
    background-color: #212121;
  }
`;

const Controls = ({ onStart, onStop }) => (
  <Container>
    <StyledButton onClick={onStart}>Start</StyledButton>
    <StyledButton onClick={onStop}>Stop</StyledButton>
  </Container>
);

export default Controls;
