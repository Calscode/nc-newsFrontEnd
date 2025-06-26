import { Link } from "react-router-dom"
import { useEffect, useState } from "react";

function Header () {
    return (
        <header>
              <div className="page-container">
            <h1>Cals News Network</h1>
            <nav>
                <Link to="/">Home</Link> | <Link to="/articles">Articles</Link> | <Link to="/topics">Topics</Link>
            </nav>
            </div>
        </header>
    )
 }

export default Header;