import React from 'react';
import {LoginPage} from "./pages/LoginPage";
import {useSelector} from "react-redux";
import {selectUser} from "./store/auth";
import {AppPage} from "./pages/AppPage";

export const App = ({}) => {
  const currentUser = useSelector(selectUser);
  if (currentUser) return <AppPage/>
  return <LoginPage/>;
};