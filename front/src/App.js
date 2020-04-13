import React, { useState, useEffect } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";
import "./scss/styles.scss"
import Login from "./components/Login"
import Base from "./components/Base"
function App() {
  const [user, setUser]= useState({})

  useEffect(()=>{
    fetch("/auth/user")
    .then(res=>res.json())
    .then(usr=>{
      setUser(usr);
    })
  },[])
  return (
    <Router>
        <Switch>
          <Route path="/login">
            {user? <Redirect to="/"/>:<Login />}
          </Route>
          <Route path="/">
          {user ? <Base user={user}/> : <Redirect to="/login" />}
          </Route>
        </Switch>
    </Router>
  );
}
export default App;
