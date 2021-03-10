import React from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import { createUserCodeAction } from '../../actions/actionCreator';

const AdminQRCreateForm = (props) => {
  const { handleSubmit, submitting, generateCode, userData } = props;

  const submitHandler = (values) => {
    const data = { userId: userData.id, ...values };
    generateCode(data);
  };

  return (
    <div className="formContainer">
      <form onSubmit={handleSubmit(submitHandler)}>
        <Field
          name="name"
          component="input"
          type="text"
          placeholder="Name your link"
        />
        <Field
          name="outerUrl"
          component="input"
          type="text"
          placeholder="URL address"
        />
        {/* error */}
        <button type="submit" disabled={submitting}>
          GENERATE
        </button>
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
