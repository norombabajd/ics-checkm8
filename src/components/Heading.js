import { Link } from "react-router-dom";

function Header() {
  return <header>
    <div id="" class="flex justify-between p-2 w-full bg-[#BBDEF0]">
      <Link className="m-2 content-evenly font-bold" style={{ fontSize: "36px" }} to="/">checkm8</Link>

      <div>
        {/* to do: routing */}
        <nav className="space-x-4 m-5 content-evenly">
          <Link style={{ fontSize: "20px" }} to="/" >Dashboard</Link>
          <Link style={{ fontSize: "20px" }} to="/check-in">Check-in</Link>
          <Link style={{ fontSize: "20px" }} to="/profile">Profile</Link>
        </nav>
      </div>
    </div>
  </header >
}

export default Header;
