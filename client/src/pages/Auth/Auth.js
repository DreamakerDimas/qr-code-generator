import React from 'react';
import { connect } from 'react-redux';
import LoginForm from '../../components/LoginForm/LoginForm';

const Auth = () => {
  return (
    <>
      <h2>LOGIN TO YOUR ACCOUNT</h2>
      <LoginForm />
    </>
  );
};

export default Auth;
