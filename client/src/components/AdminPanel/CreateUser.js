import React from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import { createUserAction } from '../../actions/actionCreator';
import { ROLES } from '../../constants';

const { USER, ADMIN } = ROLES;

const CreateUser = (props) => {
  const { handleSubmit, submitting, history, ALL_USERS, createUser } = props;

  const redirect = () => {
    history.push(ALL_USERS);
  };

  const submitHandler = (values) => {
    createUser(values, redirect);
  };

  return (
    <div className="formContainer">
      <form onSubmit={handleSubmit(submitHandler)}>
        <Field name="name" component="input" type="text" placeholder="Name" />
        <Field
          name="email"
          component="input"
          type="text"
          placeholder="Email Address"
        />
        <Field
          name="password"
          component="input"
          type="password"
          placeholder="Password"
        />
        <Field name="role" component="select">
          <option value={USER}>User</option>
          <option value={ADMIN}>Admin</option>
        </Field>
        {/* error */}
        <button type="submit" disabled={submitting}>
          CREATE
        </button>
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
