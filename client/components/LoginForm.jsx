import React, {useState} from 'react';
import {Button, Form} from "react-bootstrap";
import {useForm} from "react-hook-form";
import {authenticateUser} from "../api/sdk";
import {useDispatch} from "react-redux";
import {login} from "../store/auth";

export const LoginForm = ({}) => {
  const dispatch = useDispatch();

  const {register, handleSubmit, formState: {errors}} = useForm();
  const [serverErr, setServerErr] = useState('');


  const onSubmit = data => {
    const {email, password} = data;
    authenticateUser(email, password)
      .then(res => {
        if (res.ok) {
          dispatch(login(email, password));
        } else {
          throw new Error();
        }
      })
      .catch(err => setServerErr(err.status));
  }

  const getErrorMessage = err => {
    let errMessage = '';

    if (err.type === 'required') errMessage = 'This field is Required';
    if (err.type === 'minLength') errMessage = 'You entered insufficient characters';

    return <span className="err-block">{errMessage}</span>
  }

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <Form.Group>
        <Form.Label>Email address</Form.Label>
        <Form.Control
          type="email"
          placeholder="Enter email"
          {...register("email",
            {
              required: true,
              minLength: 3,
            }
          )}
        />
        {errors.email && getErrorMessage(errors.email)}
      </Form.Group>
      <Form.Group>
        <Form.Label>Password</Form.Label>
        <Form.Control
          type="password"
          placeholder="Password"
          {...register("password",
            {
              required: true,
              minLength: 3,
            }
          )}
        />
        {errors.password && getErrorMessage(errors.password)}
      </Form.Group>
      <Button variant="primary" type="submit">Submit</Button>
      {serverErr && <p>{`Server err: ${serverErr}`}</p>}
    </Form>
  );
};
