import { Button } from '@material-ui/core';
import React, { useCallback, useEffect } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import { ROLES } from '../../constants';
import styles from './FindUser.module.sass';

const { USER, ADMIN } = ROLES;

const FindUser = (props) => {
  const { handleSubmit, submitting, initialize } = props;

  const submitHandler = useCallback((values) => {
    console.log(values);
  }, []);

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

        <Field name="role" component="select" className={styles.field}>
          <option value={USER}>User</option>
          <option value={ADMIN}>Admin</option>
        </Field>

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

// const mapDispatchToProps = (dispatch) => ({
//     findUsers: () => dispatch()
// })

export default connect(
  mapStateToProps,
  null
)(reduxForm({ form: 'findUser' })(FindUser));
