import React, { useCallback } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import { authActionLogin } from '../../actions/actionCreator';
import styles from './LoginForm.module.sass';
import { Button } from '@material-ui/core';
import Spinner from '../Spinner/Spinner';

const LoginForm = (props) => {
  const { handleSubmit, submitting, login, auth, history } = props;

  const submitHandler = useCallback(
    (values) => {
      login(values, history);
    },
    [history]
  );

  return (
    <div className={styles.formContainer}>
      <h2>LOGIN TO YOUR ACCOUNT</h2>
      <form onSubmit={handleSubmit(submitHandler)}>
        <Field
          name="email"
          component="input"
          type="text"
          placeholder="Email Address"
          className={styles.field}
        />

        <Field
          name="password"
          component="input"
          type="password"
          placeholder="Password"
          className={styles.field}
        />

        {auth.isFetching && (
          <div className={styles.spinnerContainer}>
            <Spinner />
          </div>
        )}

        {auth.error && <span>{auth.error.statusText}</span>}
        <Button className={styles.submit} type="submit" disabled={submitting}>
          LOGIN
        </Button>
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
