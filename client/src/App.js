import React, { Component } from 'react';
import Header from './components/Header/Header';
import './App.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Auth from './pages/Auth/Auth';
import { Provider } from 'react-redux';
import store from './store';
import Profile from './pages/Profile/Profile';
import QRCodes from './pages/QRCodes/QRCodes';
import AdminPanel from './pages/AdminPanel/AdminPanel';
import { ADMIN_PANEL_STATES } from './constants';
import UserPage from './pages/AdminPanel/UserPage';

const { ALL_USERS } = ADMIN_PANEL_STATES;
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
              path="/admin_panel/:switcherId"
              component={AdminPanel}
            />
            <Route
              exact
              path={`/admin_panel/${ALL_USERS}/:id`}
              component={UserPage}
            />
          </Switch>
        </BrowserRouter>
      </Provider>
    );
  }
}

export default App;
