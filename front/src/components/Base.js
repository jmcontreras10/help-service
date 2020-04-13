import React, { useState, useEffect } from 'react';
import {
    Switch,
    Route,
    Redirect
} from "react-router-dom";
import PropTypes from "prop-types";
import Home from "./Home";
import Profile from "./Profile";
import logo from "../assets/icons/deal.svg";
function Base(props) {
    console.log(props.user)
    return (
        <>
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                <a className="logo" href="/">
                    <img src={logo} alt="logoInicio"></img>
                </a>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#options" aria-controls="options" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="options">
                    <ul className="navbar-nav">
                        <li className="nav-item active">
                            <a className="nav-link" href="#">Home</a>
                        </li>
                    </ul>
                </div>
                <ul className="navbar-nav">
                    <li className="nav-item dropdown">
                        <img className="profile dropdown-toggle" src={logo} role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" />
                        <div className="dropdown-menu dropdown-menu-right" aria-labelledby="profileMenu">
                            <a className="dropdown-item" href="/profile">Mi Perfil</a>
                            <a className="dropdown-item" onClick={()=>fetch("/auth/logout")} href="/login">Cerrar Sesion</a>
                        </div>
                    </li>
                </ul>
            </nav>
            <Switch>
                <Route path="/profile:id">
                    <Profile user={props.user}/>
                </Route>
                <Route path="/profile">
                    <Profile user={props.user}/>
                </Route>
                <Route path="/">
                    <Home />
                </Route>
            </Switch>
        </>
    );
}
Base.propTypes={
    user: PropTypes.object.isRequired
}
export default Base;

//Icons made by <a href="https://www.flaticon.com/authors/popcorns-arts" title="Icon Pond">Icon Pond</a> from <a href="https://www.flaticon.com/" title="Flaticon"> www.flaticon.com</a>
