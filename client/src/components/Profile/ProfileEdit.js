import { Button, InputLabel } from '@material-ui/core';
import React, { useCallback } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import { updateProfileAction } from '../../actions/actionCreator';
import styles from './ProfileEdit.module.sass';

const ProfileEdit = (props) => {
  const { user, handleSubmit, submitting, updateProfile } = props;

  const submitHandler = useCallback((values) => {
    updateProfile(values);
  }, []);

  return (
    <div className={styles.formContainer}>
      <form onSubmit={handleSubmit(submitHandler)}>
        <div>
          <InputLabel htmlFor="name">
            Currently account name is: "{user.name}"
          </InputLabel>
          <Field
            name="name"
            component="input"
            type="text"
            placeholder="Your Name"
            className={styles.field}
          />
        </div>

        <div>
          <InputLabel htmlFor="email">
            Currently your email is: "{user.email}"
          </InputLabel>
          <Field
            name="email"
            component="input"
            type="text"
            placeholder="Email Address"
            className={styles.field}
          />
        </div>

        {/* error */}
        <Button className={styles.submit} type="submit" disabled={submitting}>
          EDIT
        </Button>
      </form>
    </div>
  );
};

const mapDispatchToProps = (dispatch) => ({
  updateProfile: (data) => dispatch(updateProfileAction(data)),
});

export default connect(
  null,
  mapDispatchToProps
)(reduxForm({ form: 'userUpdate' })(ProfileEdit));
