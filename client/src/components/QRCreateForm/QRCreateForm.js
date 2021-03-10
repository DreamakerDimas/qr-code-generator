import React from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import { createQRCode } from '../../actions/actionCreator';

const QRCreateForm = (props) => {
  const { handleSubmit, submitting, generateCode } = props;

  const submitHandler = (values) => {
    generateCode(values);
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
  generateCode: (data) => dispatch(createQRCode(data)),
});

export default connect(
  null,
  mapDispatchToProps
)(reduxForm({ form: 'createQRCode' })(QRCreateForm));
