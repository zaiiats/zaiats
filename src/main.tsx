import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import './reset.css'
import App from './App';

const rootElement = document.getElementById('root');
if (!rootElement) throw new Error('Root element not found');

ReactDOM.createRoot(rootElement).render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);
