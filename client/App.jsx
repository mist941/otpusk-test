import React, {useEffect} from 'react';
import {LoginPage} from "./pages/LoginPage";
import {useDispatch, useSelector} from "react-redux";
import {login, selectUser} from "./store/auth";
import {AppPage} from "./pages/AppPage";
import {getUser, validateToken} from "./api/sdk";
import {Route, Switch, Redirect} from 'react-router-dom';

export const App = ({}) => {
  const currentUser = useSelector(selectUser);
  const dispatch = useDispatch();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      validateToken(token).then(res => {
        if (res) {
          getUser(token).then(res => {
            if (res.email) {
              dispatch(login({...res}));
            } else {
              throw new Error();
            }
          }).catch(() => alert('An error has occurred'));
        }
      })
    }
  }, []);

  return (
    <Switch>
      <Route path="/">
        {!currentUser ? <Redirect to="/login"/> : <AppPage/>}
      </Route>
      <Route path="/login">
        {currentUser ? <Redirect to="/"/> : <LoginPage/>}
      </Route>
    </Switch>
  )
};