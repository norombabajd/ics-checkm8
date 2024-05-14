import { Link } from "react-router-dom";

function Header() {
  return <header>
    <div id="" class="flex justify-between p-2 w-full bg-[#BBDEF0]">
      <Link className="m-2 content-evenly font-bold">checkm8</Link>
      <div>
        {/* to do: routing */}
        <nav className="space-x-4 m-2 content-evenly">
          <Link to="/dashboard">Dashboard</Link>
          <Link to="/check-in">Check-in</Link>
          <Link to="/menu">Menu</Link>
          <Link to="/profile">Profile</Link>
        </nav>
      </div>
    </div>
  </header>
}

export default Header;
