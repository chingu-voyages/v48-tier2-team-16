import React from "react";
import logo from "./img/dino-logo.svg";
import { FaSearch } from "react-icons/fa";
import background from "./img/background.png"

function Header() {
    return (
        <div className="header bg-dark text-white" style={{ backgroundImage: `url(${background})` }}>
            <div className="container"> 
                <div className="row align-items-center"> 
                    <div className="col-md-1"> 
                        <img src={logo} alt="Dinosaur app logo" className="img-fluid" /> 
                    </div> 
                <div className="col-md-9 d-flex justify-content-end"> 
                    <nav class="navbar navbar-expand"> 
                        <ul className="nav"> 
                            <li className="nav-item"> 
                                <a className="nav-link text-white" href="#map">Map <span className="mx-2"></span>|</a> 
                            </li> 
                            <li className="nav-item"> 
                                <a className="nav-link text-white" href="#diet">Diet Chart <span className="mx-2"></span>|<span className="mr-2"></span></a> 
                            </li>
                            <li className="nav-item"> 
                                <FaSearch id="search-icon" className="text-white mt-3" />
                            </li>
                        </ul> 
                    </nav> 
                </div> 
            </div> 
            </div> 
        <div className="container mt-3"> 
            <div className="row"> 
                <div className="col-md-12"> 
                    <h1 className="display col-md-2 mb-4">Welcome To The Dino World!</h1> 
                    <p className="lead col-md-4 mb-4">Explore ancient wonders, uncover prehistoric secrets, and embark on a Jurassic journey. Let's dig into the past together!</p> 
                    <button className="btn btn-primary btn-lg explore mb-5" style={{ background: "#bd423c", border: "none" }}>Start exploring</button> 
                </div> 
            </div> 
        </div> 
    </div>
    )
}

export default Header