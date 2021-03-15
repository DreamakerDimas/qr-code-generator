import { Button } from '@material-ui/core';
import React, { useCallback } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import { createUserCodeAction } from '../../actions/actionCreator';
import styles from './QRCreateForm.module.sass';

const AdminQRCreateForm = (props) => {
  const { handleSubmit, submitting, generateCode, userData } = props;

  const submitHandler = useCallback(
    (values) => {
      const data = { userId: userData.id, ...values };
      generateCode(data);
    },
    [userData]
  );

  return (
    <div className={styles.formContainer}>
      <form onSubmit={handleSubmit(submitHandler)}>
        <Field
          name="name"
          component="input"
          type="text"
          placeholder="Name your link"
          className={styles.field}
        />

        <Field
          name="outerUrl"
          component="input"
          type="text"
          placeholder="URL address"
          className={styles.field}
        />

        {/* error */}
        <Button className={styles.genBut} type="submit" disabled={submitting}>
          GENERATE
        </Button>
      </form>
    </div>
  );
};

const mapDispatchToProps = (dispatch) => ({
  generateCode: (data) => dispatch(createUserCodeAction(data)),
});

export default connect(
  null,
  mapDispatchToProps
)(reduxForm({ form: 'adminCreateQRCode' })(AdminQRCreateForm));
