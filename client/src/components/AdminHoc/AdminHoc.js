import React from 'react';
import { getProfileAction } from '../../actions/actionCreator';
import { connect } from 'react-redux';
import Spinner from '../Spinner/Spinner';
import { withRouter } from 'react-router';
import { ROLES } from '../../constants';

const AdminHoc = (Component, props) => {
  class Hoc extends React.Component {
    componentDidMount() {
      this.props.getProfile(this.props.history);
    }

    checkPermissions = () => {
      if (!this.props.profile.data) return;
      const role = this.props.profile.data.role;
      return role !== ROLES.ADMIN;
    };

    render() {
      {
        this.checkPermissions() && this.props.history.replace('/codes');
      }
      return <Component {...props} />;
    }
  }

  const mapStateToProps = (state) => {
    return { profile: state.profile };
  };

  const mapDispatchTopProps = (dispatch) => ({
    getProfile: (history) => dispatch(getProfileAction(history)),
  });

  return withRouter(connect(mapStateToProps, mapDispatchTopProps)(Hoc));
};

export default AdminHoc;
