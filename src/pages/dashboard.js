import './dashboard.css';
import Header from '../components/Heading'
import {Link} from "react-router-dom";
import React, { useState } from 'react';
import supabase from '../api/supabase';

function Dashboard() {

  const [count, setCount] = useState(0);

  return (
    <div className="App">
      <Header/>
      <a>app app app </a>
      <Link to="/login">Home</Link>
    </div>
  );
}

export default Dashboard;
