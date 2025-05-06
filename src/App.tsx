import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Project from './pages/Project';
import { ThemeProvider } from './providers/ThemeProvider';
import { LangProvider } from './providers/LangProvider';
import styled from 'styled-components';
import Frame from './components/containers/Frame';
import MainContent from './components/containers/MainContent';
import ArrowDown from './components/navigation/ArrowDown';

const StyledApp = styled.div`
  width: 100%;
  font-family: 'Montserrat';
`;

function App() {
  return (
    <StyledApp>
      <ThemeProvider>
        <LangProvider>
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
