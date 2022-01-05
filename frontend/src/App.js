import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Welcome from 'Components/Welcome'
import MyHabits from 'Components/MyHabits'
import Register from 'Components/User/Register'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Welcome />} exact={true} />
        <Route path="/habits" element={<MyHabits />} exact={true} />
        <Route path="/register" element={<Register />} exact={true} />
      </Routes>
    </Router>
  );
}

export default App;
