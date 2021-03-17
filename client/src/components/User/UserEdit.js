import { Button, InputLabel } from '@material-ui/core';
import React, { useCallback } from 'react';
import { connect } from 'react-redux';
import { useParams } from 'react-router';
import { Field, reduxForm } from 'redux-form';
import { updateUserAction } from '../../actions/actionCreator';
import { ROLES } from '../../constants';
import styles from './UserEdit.module.sass';

const { USER, ADMIN } = ROLES;

const UserEdit = (props) => {
  const { user, handleSubmit, submitting, updateUser } = props;
  const { id } = useParams();

  const submitHandler = useCallback(
    (values) => {
      const payload = { id, body: values };
      updateUser(payload);
    },
    [id]
  );

  return (
    <>
      {user && (
        <div className={styles.container}>
          <form onSubmit={handleSubmit(submitHandler)}>
            <div>
              <InputLabel htmlFor="name" className={styles.label}>
                Currently name is: "{user.name}"
              </InputLabel>
              <Field
                name="name"
                component="input"
                type="text"
                placeholder="Name"
                className={styles.field}
              />
            </div>

            <div>
              <InputLabel htmlFor="email" className={styles.label}>
                Currently email is: "{user.email}"
              </InputLabel>
              <Field
                name="email"
                component="input"
                type="text"
                placeholder="Email Address"
                className={styles.field}
              />
            </div>

            <div>
              <Field
                name="password"
                component="input"
                type="password"
                placeholder="Password"
                className={styles.field}
              />
            </div>

            <div>
              <span>Role: {user.role}</span>
              <Field name="role" component="select" className={styles.field}>
                <option value={USER}>User</option>
                <option value={ADMIN}>Admin</option>
              </Field>
            </div>

            {/* error */}
            <Button
              type="submit"
              disabled={submitting}
              className={styles.editBut}
            >
              EDIT
            </Button>
          </form>
        </div>
      )}
    </>
  );
};

const mapDispatchToProps = (dispatch) => ({
  updateUser: (data) => dispatch(updateUserAction(data)),
});

export default connect(
  null,
  mapDispatchToProps
)(reduxForm({ form: 'userUpdate' })(UserEdit));
