import React, { useCallback, useEffect, useState } from 'react';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import { findUsersAction } from '../../actions/actionCreator';
import { ADMIN_PANEL_STATES } from '../../constants';
import FindUsersForm from '../FindUsersForm/FindUsersForm';
import UsersList from '../UsersList/UsersList';

const { FIND_USER } = ADMIN_PANEL_STATES;

const FindUser = (props) => {
  const { users, history, settings, findUsers } = props;
  const { isFetching, haveMore } = users;

  const [filterValues, setFilterValues] = useState({});

  const updateFilterValues = (values) => {
    setFilterValues(values);
  };

  // scroll lazy load
  useEffect(() => {
    const handleScroll = () => {
      const currentPosition =
        window.innerHeight + document.documentElement.scrollTop;
      const isLoadNotNeed =
        !haveMore ||
        isFetching ||
        currentPosition !== document.documentElement.offsetHeight;

      if (isLoadNotNeed) return;

      findUsers(filterValues);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [isFetching, haveMore, filterValues, settings]);

  const detailsHandler = useCallback(
    (id) => {
      history.push(`${FIND_USER}/${id}`);
    },
    [history]
  );

  return (
    <div>
      <FindUsersForm updateFilterValues={updateFilterValues} />

      <UsersList usersArr={users.usersArr} detailsHandler={detailsHandler} />
    </div>
  );
};

const mapStateToProps = (state) => {
  return { users: state.users };
};

const mapDispatchToProps = (dispatch) => ({
  findUsers: (data) => dispatch(findUsersAction(data)),
});

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(FindUser)
);
