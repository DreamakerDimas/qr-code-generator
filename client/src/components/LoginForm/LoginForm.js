import React from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import { authActionLogin } from '../../actions/actionCreator';

const LoginForm = (props) => {
  const { handleSubmit, submitting, login, auth, history } = props;

  const submitHandler = (values) => {
    login(values, history);
  };

  return (
    <div className="formContainer">
      <form onSubmit={handleSubmit(submitHandler)}>
        <Field
          name="email"
          component="input"
          type="text"
          placeholder="Email Address"
        />
        <Field
          name="password"
          component="input"
          type="password"
          placeholder="Password"
        />
        {auth.error && <span>{auth.error.statusText}</span>}
        <button type="submit" disabled={submitting}>
          LOGIN
        </button>
      </form>
    </div>
  );
};

const mapStateToProps = (state) => {
  const { auth } = state;
  return { auth };
};

const mapDispatchToProps = (dispatch) => ({
  login: (data, history) => dispatch(authActionLogin(data, history)),
});

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(reduxForm({ form: 'login' })(LoginForm))
);
