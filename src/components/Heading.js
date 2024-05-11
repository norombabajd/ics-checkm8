function Header() {
    return <header>
    <div id="" class="flex justify-between p-5 bg-[#BBDEF0]">
      <div>
        <b className="text-lg">checkm8</b>
      </div>
      <div>
        {/* to do: routing */}
        <nav className="space-x-4 content-evenly">
        <button id="footer-button">Dashboard</button>
            <button id="footer-button">Check-in</button>
            <button id="footer-button">Menu</button>
            <button id="footer-button">Profile</button>
        </nav>
      </div>

    </div>
    </header>
  }

  export default Header;
