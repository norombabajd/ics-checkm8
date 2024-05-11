import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import Login from './pages/login.js';
import Dashboard from './pages/dashboard.js';
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
    ],
  },
]);

const supabase = createClient("https://rpnukhbkfykwutyntnkw.supabase.co", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJwbnVraGJrZnlrd3V0eW50bmt3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTQwNzU0MzUsImV4cCI6MjAyOTY1MTQzNX0.c9PQXsg2ADUdpNtyY8_eLmKDpfSr11W4jXdHp0BBQG4");
const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/login" element={<Login />} />
    </Routes>
  </BrowserRouter>
);

