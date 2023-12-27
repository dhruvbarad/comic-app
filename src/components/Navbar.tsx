const Navbar = () => {
    return (
        <nav className="navbar navbar-expand-lg">
            <ul className="align-items-center navbar-nav mx-auto mb-2 mb-lg-0">
                <li className="nav-item">
                    <a className="nav-link" href="/">Home</a>
                </li>
                <li className="nav-item">
                    <a href="/marvel"><img src="/marvel.png" alt="Marvel"/></a>
                </li>
                <li className="nav-item">
                    <a href="/star-wars"><img src="/star-wars.png" alt="Star Wars"/></a>
                </li>
            </ul>
        </nav>
    );
}
export default Navbar;