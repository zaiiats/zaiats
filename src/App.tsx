import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Project from './pages/Projects';
import { ThemeProvider } from './providers/ThemeProvider';
import { LangProvider } from './providers/LangProvider';
import styled from 'styled-components';
import GlobalStyles from './styles/GlobalStyles';
import Frame from './components/containers/Frame';
import MainContent from './components/containers/MainContent';
import ArrowDown from './components/navigation/ArrowDown';

const StyledApp = styled.div`
  width: 100%;
  background-color: black;
  color: white;
  font-family: 'Montserrat';
`;

function App() {
  return (
    <StyledApp>
      <ThemeProvider>
        <LangProvider>
          <GlobalStyles />
          <Frame />

          <MainContent>
            <Routes>
              <Route
                path='/'
                element={
                  <>
                    <Home />
                    <ArrowDown />
                  </>
                }
              />
              <Route path='/:projectName' element={<Project />} />
            </Routes>
          </MainContent>
        </LangProvider>
      </ThemeProvider>
    </StyledApp>
  );
}

export default App;
