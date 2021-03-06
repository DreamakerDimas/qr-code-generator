import React, { Component } from 'react';
import Header from './components/Header/Header';
import './App.css';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
import Auth from './pages/Auth/Auth';
import { Provider } from 'react-redux';
import store from './store';
import Profile from './pages/Profile/Profile';
import QRCodes from './pages/QRCodes/QRCodes';
import AdminPanel from './pages/AdminPanel/AdminPanel';
import { ADMIN_PANEL_STATES } from './constants';
import UserPage from './pages/AdminPanel/UserPage';
import RedirectionPage from './pages/RedirectionPage/RedirectionPage';
import AdminHoc from './components/AdminHoc/AdminHoc';

const { ALL_USERS, FIND_USER } = ADMIN_PANEL_STATES;
class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <BrowserRouter>
          <Header />
          <Switch>
            <Route exact path="/login" component={Auth} />
            <Route exact path="/profile" component={Profile} />
            <Route exact path="/codes" component={QRCodes} />
            <Route
              exact
              path={`/redirect/:linkId`}
              component={RedirectionPage}
            />
            <Route
              exact
              path="/admin_panel/:switcherId"
              component={AdminHoc(AdminPanel)}
            />
            <Route
              exact
              path={`/admin_panel/${ALL_USERS}/:id`}
              component={AdminHoc(UserPage)}
            />
            <Route
              exact
              path={`/admin_panel/${FIND_USER}/:id`}
              component={AdminHoc(UserPage)}
            />
            <Route render={() => <Redirect to={{ pathname: '/codes' }} />} />
          </Switch>
        </BrowserRouter>
      </Provider>
    );
  }
}

export default App;
