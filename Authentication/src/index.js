import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';

import './index.css';
import App from './App';
import AuthContextProvier from './context/AuthContext';

ReactDOM.render(
    <BrowserRouter>
  <AuthContextProvier>
      <App />
  </AuthContextProvier>
    </BrowserRouter>,
  document.getElementById('root')
);
