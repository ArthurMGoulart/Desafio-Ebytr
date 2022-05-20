import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Tasks from '../pages/Tasks';
import Login from '../pages/Login';
import Register from '../pages/Register';
import CreateTask from '../pages/CreateTask';

function Routers() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={ <Navigate to="/login" /> } />
        <Route path="/login" element={ <Login /> } />
        <Route path="/register" element={ <Register /> } />
        <Route exact path="/user/tasks" element={ <Tasks /> } />
        <Route exact path="/user/create/task" element={ <CreateTask /> } />
      </Routes>
    </BrowserRouter>
  );
}

export default Routers;
