import React from 'react';
import { Field, reduxForm } from 'redux';

const LoginForm = () => {
  submitHandler = (values) => {
    // loginRequest
  };

  return (
    <div className="formContainer">
      <form onSubmit={handleSubmit()}>
        <Field name="email" component={} type="email" label="Email Address" />
        <Field name="password" component={} type="password" label="Password" />
        {/* error here */}
        <button type="submit">LOGIN</button>
        {/* add disabled isFetching */}
      </form>
    </div>
  );
};

export default LoginForm;
