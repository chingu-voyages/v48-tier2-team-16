import React from "react";
import logo from "./img/dino-logo.svg";
import { FaSearch } from "react-icons/fa";

function Header() {
    return (
        <div className="header">
            <div className="nav-logo">
            <img src={logo} alt="Dinosaur app logo" />
            <nav>
                <ul>
                    <li><a href="#map">Map |</a></li>
                    <li><a href="#diet">Diet Chart |</a></li>
                    <li><FaSearch id="search-icon" /></li>
                </ul>
            </nav>
            </div>
            <h1>Welcome To The Dino World!</h1>
            <p>Explore ancient wonders, uncover prehistoric secrets, and embark on a Jurassic journey. Let's dig into the past together!</p>
            <button className="explore">Start exploring</button>
        </div>
    )
}

export default Header