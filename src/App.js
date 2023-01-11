import { useQueryClient } from '@tanstack/react-query';
import React from 'react';
import { Route, Routes, BrowserRouter } from 'react-router-dom';
import { apiKeys } from './API/apiKeys';
import './App.css';
import Auth from './components/Auth';
import Home from './components/Home';
import GuardedRoute from './components/GuardedRoute';

function App() {
  const queryClient = useQueryClient();
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <GuardedRoute
                component={Home}
                auth={!!queryClient.getQueryData(apiKeys.current())}
              />
            }
          />
          <Route path="Auth" element={<Auth />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
