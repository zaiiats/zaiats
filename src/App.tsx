import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Project from './pages/Projects';
import { ThemeProvider } from './providers/ThemeProvider';

function App() {
  return (
    <div>
      <ThemeProvider>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/:projectName' element={<Project />} />
        </Routes>
      </ThemeProvider>
    </div>
  );
}

export default App;
