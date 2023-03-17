import React from 'react';
import Router from './components/Router';
import './App.css';
import { BrowserRouter } from 'react-router-dom';
import Navbar from './components/Navbar';

function App() {
  return (
    <BrowserRouter>
      <Navbar />

      <Router />
    </BrowserRouter>
  );
}

export default App;
