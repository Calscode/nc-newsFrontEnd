import { Link } from "react-router-dom"
import { useEffect, useState } from "react";

function Header () {
    return (
        <header>
            <h1>Cals News Network</h1>
            <nav>
                <Link to="/">Home</Link> | <Link to="/articles">Articles</Link> | <Link to="/topics">Topics</Link>
            </nav>
        </header>
    )
 }

export default Header;