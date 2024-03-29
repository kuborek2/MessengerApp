import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import { Provider } from 'react-redux'
import store from './store/storeIndex';
import AccessPage from './components/access/AccessPage';
import RegisterPage from './components/access/register/RegisterPage';
import SignInPage from './components/access/signin/SignInPage'
import AppPage from './components/app/AppPage';
import ChatPage from './components/app/chat/ChatPage';
import { enableMapSet } from 'immer';

// enableMapSet();

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider store={store}>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="access" element={<AccessPage />}>
          <Route path="register" element={<RegisterPage />}/>
          <Route path="signin" element={<SignInPage />}/>
          </Route>
        <Route path="app" element={<AppPage />}>
          <Route path='chat' element={<ChatPage />} />
        </Route>
      </Routes>
      </Provider>
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
