import { Button } from '@material-ui/core';
import React, { useCallback, useEffect } from 'react';
import { connect } from 'react-redux';
import { useParams, withRouter } from 'react-router';
import { getQrCodeAction } from '../../actions/actionCreator';
import RedirectLink from '../../components/RedirectLink/RedirectLink';
import styles from './RedirectionPage.module.sass';

const RedirectionPage = (props) => {
  const { getMyCode, redirect, history } = props;
  const { codeData } = redirect;
  const { linkId } = useParams();

  useEffect(() => {
    getMyCode(linkId);
  }, []);

  return (
    <div className={styles.mainContainer}>
      <div className={styles.contentContainer}>
        {codeData && <RedirectLink codeData={codeData} />}
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  const { redirect } = state;
  return { redirect };
};

const mapDispatchTopProps = (dispatch) => ({
  getMyCode: (id) => dispatch(getQrCodeAction(id)),
});

export default withRouter(
  connect(mapStateToProps, mapDispatchTopProps)(RedirectionPage)
);
