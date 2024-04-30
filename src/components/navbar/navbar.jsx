export default function Navbar() {
        return (
            <div>
                <nav className="site-nav">
                    <div className="container">
                        <div className="menu-bg-wrap">
                            <div className="site-navigation">
                                <div className="row g-0 align-items-center">
                                    <div className="col-2">
                                        <a href="/" className="logo m-0 float-start">JSONPlaceholder<span
                                            className="text-primary">.</span></a>
                                    </div>
                                    <div className="col-8 text-center">
                                        <form action="#" className="search-form d-inline-block d-lg-none">
                                            <input type="text" className="form-control" placeholder="Search..."/>
                                            <span className="bi-search"></span>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </nav>
            </div>
        );
}

