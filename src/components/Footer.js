import { Link } from "react-router-dom";

function Footer() {
    return (
        <footer>
            <div id="" className="flex justify-center p-2 w-full bg-[#BBDEF0]">
                <nav className="space-x-4 m-2 content-evenly">
                    <Link to="/dashboard">Dashboard</Link>
                    <Link to="/check-in">Check-in</Link>
                    <Link to="/menu">Menu</Link>
                    <Link to="/profile">Profile</Link>
                </nav>
            </div>
        </footer>
    );
}

export default Footer;
