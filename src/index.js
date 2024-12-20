import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { BrowserRouter as Router  } from 'react-router-dom';
import './index.css';

import './Css/components/button.css';
import './Css/components/alerts.css';
import './Css/components/loading.css';
import './Css/components/google.css';
import './Pages/Auth/AuthOperations/Auth.css'
import './custom.css'

import 'bootstrap/dist/css/bootstrap.min.css';
import MenuContext from './Context/MenuContext';
import WindowContext from './Context/WindowContext';

import 'react-loading-skeleton/dist/skeleton.css'
import CartChangerContext from './Context/CartChangerContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <WindowContext>
      <MenuContext>
        <CartChangerContext>
          <Router>
            <App />
          </Router>
        </CartChangerContext>
      </MenuContext>
    </WindowContext>
  </React.StrictMode>
);