import { Button } from '@material-ui/core';
import React, { useCallback, useEffect } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import { createUserAction } from '../../actions/actionCreator';
import { ROLES } from '../../constants';
import styles from './CreateUser.module.sass';

const { USER, ADMIN } = ROLES;

const CreateUser = (props) => {
  const {
    handleSubmit,
    submitting,
    history,
    ALL_USERS,
    createUser,
    initialize,
  } = props;

  const redirect = () => {
    history.push(ALL_USERS);
  };

  const submitHandler = useCallback((values) => {
    createUser(values, redirect);
  }, []);

  useEffect(() => {
    initialize({ role: USER });
  }, []);

  return (
    <div className={styles.container}>
      <form onSubmit={handleSubmit(submitHandler)}>
        <Field
          name="name"
          component="input"
          type="text"
          placeholder="Name"
          className={styles.field}
        />

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

        <Field name="role" component="select" className={styles.field}>
          <option value={USER}>User</option>
          <option value={ADMIN}>Admin</option>
        </Field>

        {/* error */}
        <Button
          className={styles.createBut}
          type="submit"
          disabled={submitting}
        >
          CREATE
        </Button>
      </form>
    </div>
  );
};

const mapDispatchTopProps = (dispatch) => ({
  createUser: (data, redirect) => dispatch(createUserAction(data, redirect)),
});

export default connect(
  null,
  mapDispatchTopProps
)(reduxForm({ form: 'createUser' })(CreateUser));
