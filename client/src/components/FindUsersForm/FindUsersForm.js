import { Button, InputLabel } from '@material-ui/core';
import React, { useCallback, useEffect } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import {
  clearAllUsersAction,
  findUsersAction,
} from '../../actions/actionCreator';
import { ROLES } from '../../constants';
import styles from './FundUsersForm.module.sass';

const { USER, ADMIN } = ROLES;

const FindUsersForm = (props) => {
  const {
    handleSubmit,
    submitting,
    initialize,
    users,
    findUsers,
    updateFilterValues,
  } = props;

  const submitHandler = useCallback(
    (values) => {
      updateFilterValues(values);
      findUsers(values, true);
    },
    [users]
  );

  useEffect(() => {
    initialize({ role: USER, order: 'DESC' });
  }, []);

  return (
    <div className={styles.container}>
      <form onSubmit={handleSubmit(submitHandler)}>
        <Field
          name="name"
          component="input"
          type="text"
          placeholder="Name Filter"
          className={styles.field}
        />

        <Field
          name="email"
          component="input"
          type="text"
          placeholder="Email Filter"
          className={styles.field}
        />

        <InputLabel htmlFor="role">Role Filter</InputLabel>
        <Field name="role" component="select" className={styles.field}>
          <option value={USER}>User</option>
          <option value={ADMIN}>Admin</option>
        </Field>

        <InputLabel htmlFor="order">Order by creation date</InputLabel>
        <Field name="order" component="select" className={styles.field}>
          <option value={'ASC'}>ASC</option>
          <option value={'DESC'}>DESC</option>
        </Field>

        {/* error */}
        <Button
          className={styles.createBut}
          type="submit"
          disabled={submitting}
        >
          FIND
        </Button>
      </form>
    </div>
  );
};

const mapStateToProps = (state) => {
  return { users: state.users };
};

const mapDispatchToProps = (dispatch) => ({
  findUsers: (data, isSubmit) => dispatch(findUsersAction(data, isSubmit)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(reduxForm({ form: 'findUser' })(FindUsersForm));
