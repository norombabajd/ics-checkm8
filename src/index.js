import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import Attendence from './pages/Attendence/attendence.js';
import CheckIn from './pages/Check-in/checkIn.js';
import Create from './pages/Create/create.js';
import Dashboard from './pages/Dashboard/dashboard.js';
import Login from './pages/Login/login.js';
import Menu from './pages/Menu/menu.js';
import Profile from './pages/Profile/profile.js';
import History from './pages/History/history.js';
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

const supabase = createClient("https://rpnukhbkfykwutyntnkw.supabase.co", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJwbnVraGJrZnlrd3V0eW50bmt3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTQwNzU0MzUsImV4cCI6MjAyOTY1MTQzNX0.c9PQXsg2ADUdpNtyY8_eLmKDpfSr11W4jXdHp0BBQG4");
const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <BrowserRouter>
    <Routes>
      <Route path="/attendence" element={<Attendence />} />
      <Route path="/check-in" element={<CheckIn />} />
      <Route path="/create" element={<Create />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/login" element={<Login />} />
      <Route path="/menu" element={<Menu />} />


      <Route path="/profile" element={<Profile />} />
      <Route path="/history" element={<History />} />



    </Routes>
  </BrowserRouter>
);

