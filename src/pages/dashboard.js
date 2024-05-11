import './dashboard.css';
import Header from '../components/Heading'
import {Link, Outlet} from "react-router-dom";

function Dashboard() {
  return (
    <div className="App">
      <Header/>
      <a>app app app </a>
      <Link to="/login">Home</Link>
    </div>
  );
}

export default Dashboard;
