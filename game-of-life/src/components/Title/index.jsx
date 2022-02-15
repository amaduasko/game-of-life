import styled from 'styled-components';

const StyledTitle = styled.h1`
  display: flex;
  justify-content: center;
  align-items: center;
  color: #e0e0e0;
  font-size: 50px;
  margin: 0;
`;

const Title = () => <StyledTitle>Life is a Game</StyledTitle>;

export default Title;
