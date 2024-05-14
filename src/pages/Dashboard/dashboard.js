import './dashboard.css';
import Header from '../../components/Heading'
import Footer from '../../components/Footer.js';
import { Link } from "react-router-dom";
import React, { useState } from 'react';
import supabase from '../../../src/api/supabase.js';

function Dashboard() {

  const [count, setCount] = useState(0);

  return (
    <div className="App">
      <Header />
      <p>This is the Dashboard Page</p>
      <Footer />
    </div>
  );
}

export default Dashboard;
