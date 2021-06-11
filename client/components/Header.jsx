import React from 'react';
import {useDispatch, useSelector} from "react-redux";
import {logout, selectUser} from "../store/auth";
import {Button} from "react-bootstrap";

export const Header = ({}) => {
  const currentUser = useSelector(selectUser);
  const dispatch = useDispatch();
  return (
    <div className="header">
      <div className="user-info">{currentUser.user}</div>
      <Button variant="warning" onClick={() => dispatch(logout())}>Log Out</Button>
    </div>
  );
};