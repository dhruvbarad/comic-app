const Navbar = () => {
    {/*<a className="navbar-brand" href="#">Navbar w/ text</a>*/}
    {/*<button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarText"*/}
    {/*        aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">*/}
    {/*    <span className="navbar-toggler-icon"></span>*/}
    {/*</button>*/}
    return (
        <nav className="navbar navbar-expand-lg bg-body-tertiary">
            <div className="container-fluid">
                <div className="collapse navbar-collapse">
                    <ul className="align-items-center navbar-nav mx-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <a className="nav-link" href="/">Home</a>
                        </li>
                        <li className="nav-item">
                            <a href="/marvel">
                                <img style={{width: "120px", height: "80px"}}
                                     src="/dist/marvel.png"
                                     alt="Marvel"
                                />
                            </a>
                        </li>
                        <li className="nav-item">
                            <a href="/star-wars">
                                <img style={{width: "120px", height: "80px"}}
                                     src="/dist/star-wars.png"
                                     alt="Star Wars"
                                />
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
}
export default Navbar;