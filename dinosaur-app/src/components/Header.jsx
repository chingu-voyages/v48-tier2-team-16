import React from "react";
import logo from "./img/dino-logo.svg";
import { FaSearch } from "react-icons/fa";

function Header() {
    return (
        <div className="header bg-dark text-white"> 
            <div className="container"> 
                <div className="row align-items-center"> 
                    <div className="col-md-6"> 
                        <img src={logo} alt="Dinosaur app logo" className="img-fluid" /> 
                    </div> 
                <div className="col-md-6"> 
                    <nav> 
                        <ul className="nav"> 
                            <li className="nav-item"> 
                                <a className="nav-link text-white" href="#map">Map |</a> 
                            </li> 
                            <li className="nav-item"> 
                                <a className="nav-link text-white" href="#diet">Diet Chart |</a> 
                            </li> 
                            <li className="nav-item"> 
                                <FaSearch id="search-icon" className="text-white" /> 
                            </li> 
                        </ul> 
                    </nav> 
                </div> 
                </div> 
            </div> 
        <div className="container mt-3"> 
            <div className="row"> 
                <div className="col-md-12"> 
                    <h1 className="display-4">Welcome To The Dino World!</h1> 
                    <p className="lead">Explore ancient wonders, uncover prehistoric secrets, and embark on a Jurassic journey. Let's dig into the past together!</p> 
                    <button className="btn btn-primary btn-lg explore">Start exploring</button> 
                </div> 
            </div> 
            </div> 
        </div>
    )
}

export default Header