import React, { Component } from "react";
import { Link, Outlet } from 'react-router-dom';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./home.css";

export default class Home extends Component {
    render() {
        return (
            <section className="vh-100">
                <nav className="navbar navbar-expand-lg navbar-light bg-light">
                    <div className="container-fluid">
                        <a className="navbar-brand" href="#">Navbar</a>
                        <button className="navbar-toggler" type="button" data-bs-toggle="collapse"
                                data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
                                aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"/>
                        </button>
                        <div className="collapse navbar-collapse" id="navbarSupportedContent">
                            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                                <li className="nav-item">
                                    <Link className="nav-link active" aria-current="page" to='/'>Home</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" to='/trip'>Trip</Link>
                                </li>
                                <li className="nav-item dropdown">
                                    <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button"
                                       data-bs-toggle="dropdown" aria-expanded="false">
                                        Dropdown
                                    </a>
                                    <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                                        <li><a className="dropdown-item" href="#">Action</a></li>
                                        <li><a className="dropdown-item" href="#">Another action</a></li>
                                        <li>
                                            <hr className="dropdown-divider"/>
                                        </li>
                                        <li><a className="dropdown-item" href="#">Something else here</a></li>
                                    </ul>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link disabled" href="#" tabIndex="-1"
                                       aria-disabled="true">Disabled</a>
                                </li>
                            </ul>
                            <form className="d-flex">
                                <input className="form-control me-2" type="search" placeholder="Search"
                                       aria-label="Search"/>
                                <button className="btn btn-outline-success" type="submit">Search</button>
                            </form>
                        </div>
                    </div>
                </nav>
                <div className="container h-custom" style={{ height: '90.1%' }}>
                    <Outlet/>
                </div>
                <div className="d-flex flex-column flex-md-row text-center text-md-start justify-content-between py-4 px-4 px-xl-5 bg-primary">
                    <div className="text-white mb-3 mb-md-0">
                        Copyright © 2022. All rights reserved.
                    </div>

                    <div>
                        <a href="#!" className="text-white me-4">
                            <FontAwesomeIcon icon={['fab', 'facebook']} />
                        </a>
                        <a href="#!" className="text-white me-4">
                            <FontAwesomeIcon icon={['fab', 'twitter']} />
                        </a>
                        <a href="#!" className="text-white me-4">
                            <FontAwesomeIcon icon={['fab', 'google']} />
                        </a>
                        <a href="#!" className="text-white">
                            <FontAwesomeIcon icon={['fab', 'linkedin']} />
                        </a>
                    </div>
                </div>
            </section>
        )
    }
}
