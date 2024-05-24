import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import Attendence from './pages/Attendence/attendence.js';
import CheckIn from './pages/Check-in/checkIn.js';
import Create from './pages/Create/create.js';
import Dashboard from './pages/Dashboard/dashboard.js';
import Login from './pages/auth/login.js';
import Menu from './pages/Menu/menu.js';
import Profile from './pages/Profile/profile.js';
import History from './pages/History/history.js';
import SignOut from './pages/auth/signout.js';

import { createClient } from "@supabase/supabase-js";

import {
  createBrowserRouter,
  RouterProvider,
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";



const router = createBrowserRouter([
  {
    path: "/",
    element: <Dashboard />,
    // loader: rootLoader,
    children: [
      {
        path: "login",
        element: <Login />,
        // loader: teamLoader,
      },
      {
        path: "attendence",
        element: <Attendence />
      },
      {
        path: "dashboard",
        element: <Dashboard />
      },
      {
        path: "check-in",
        element: <CheckIn />
      },
      {
        path: "create",
        element: <Create />
      },
      {
        path: "menu",
        element: <Menu />
      }, {
        path: "profile",
        element: <Profile />
      }, {
        path: "history",
        element: <History />
      }

    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/attendence" element={<Attendence />} />
      <Route path="/check-in" element={<CheckIn />} />
      <Route path="/create" element={<Create />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signout" element={<SignOut />} />
      <Route path="/menu" element={<Menu />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/history" element={<History />} />
    </Routes>
  </BrowserRouter>
);

