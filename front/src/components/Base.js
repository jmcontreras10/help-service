import React, { useState, useEffect } from 'react';
import {
    Switch,
    Route,
} from "react-router-dom";
import PropTypes from "prop-types";
import Home from "./Home";
import Profile from "./Profile";
import logo from "../assets/icons/deal.svg";
import defaultPhoto from "../assets/user.png"
function Base(props) {
    const [solicitudes,setSolicitudes]=useState([])
    useEffect(() => {
        fetch("/solicitudes/list")
            .then(res => res.json())
            .then(sol => {
                setSolicitudes(sol);
            })
    }, [])
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
                            <a className="nav-link" href="/profile">Perfil</a>
                        </li>
                    </ul>
                </div>
                <ul className="navbar-nav">
                    <li className="nav-item dropdown">
                        <img className="profile dropdown-toggle" alt="mini profile" src={props.user.image ? props.user.image : defaultPhoto} role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" />
                        <div className="dropdown-menu dropdown-menu-right" aria-labelledby="profileMenu">
                            <a className="dropdown-item" href="/profile">Mi Perfil</a>
                            <a className="dropdown-item" onClick={()=>fetch("/auth/logout")} href="/login">Cerrar Sesion</a>
                        </div>
                    </li>
                </ul>
            </nav>
            <Switch>
                <Route path="/profile/:id">
                    <Profile user={props.user} solicitudes={solicitudes}/>
                </Route>
                <Route path="/profile">
                    <Profile user={props.user} solicitudes={solicitudes}/>
                </Route>
                <Route path="/">
                    <Home user={props.user} solicitudes={solicitudes}/>
                </Route>
            </Switch>
        </>
    );
}
Base.propTypes={
    user: PropTypes.object.isRequired
}
export default Base;