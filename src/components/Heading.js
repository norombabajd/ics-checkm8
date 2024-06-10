import { Link, useNavigate } from "react-router-dom";
import { supabase, isAuthenticated, EndSession } from "../api/supabase";
import { useEffect, useState } from "react";

function Header() {

  const [login, setlogin] = useState();
  const navigate = useNavigate();

  useEffect(() => {
      async function VerifyAuthentication() {
          const authStatus = await isAuthenticated();
          setlogin(authStatus);

          if (!authStatus){navigate("/login");}

      }
      VerifyAuthentication();
  }, []);


  return <header>
    <div className='pb-48'>
    <div id="" class="z-50 fixed flex flex-wrap justify-between p-2 w-screen bg-[#BBDEF0] flex-col sm:flex-row items-center ">
      {login ?  <Link className="m-2 content-evenly font-bold" style={{ fontSize: "36px" }} to="/">checkm8</Link> :  <Link className="m-2 content-evenly font-bold" style={{ fontSize: "36px" }} to="/login">checkm8</Link>}
     
      <div>
        <nav className="space-x-4 m-5 content-evenly sm:flex-row">
          {login ? <Link style={{ fontSize: "20px" }} to="/">Dashboard</Link> : <Link style={{ fontSize: "20px" }} to="/login">Dashboard</Link>}
          {login ? <Link style={{ fontSize: "20px" }} to="/check-in">Check-in</Link> : <Link style={{ fontSize: "20px" }} to="/login">Check-in</Link>}
          {login ? <Link style={{ fontSize: "20px" }} to="/profile">Profile</Link> : <Link style={{ fontSize: "20px" }} to="/login">Profile</Link>}

        </nav>
      </div>
    </div>
    </div>
  </header >
}

export default Header;
