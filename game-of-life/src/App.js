import Screen from './components/Screen';
import Title from './components/Title';
import styled from 'styled-components';

const AppContainer = styled.div`
  width: 100vw;
  height: 100vh;
  display flex;
  justify-content: center;
  & > div {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background-color: #9e9e9e;
  }
`;

function App() {
  return (
    <AppContainer>
      <div>
        <Title />
        <Screen />
      </div>
    </AppContainer>
  );
}

export default App;
