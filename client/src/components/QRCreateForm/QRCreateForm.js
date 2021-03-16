import { Button } from '@material-ui/core';
import React, { useCallback } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import { createQRCode } from '../../actions/actionCreator';
import styles from './QRCreateForm.module.sass';

const QRCreateForm = (props) => {
  const { handleSubmit, submitting, generateCode } = props;

  const submitHandler = useCallback((values) => {
    generateCode(values);
  }, []);

  return (
    <div className={styles.formContainer}>
      <h2>Generate Code:</h2>

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
  generateCode: (data) => dispatch(createQRCode(data)),
});

export default connect(
  null,
  mapDispatchToProps
)(reduxForm({ form: 'createQRCode' })(QRCreateForm));
