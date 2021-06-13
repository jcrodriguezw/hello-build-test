import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';

import SignIn from './modules/signIn/SignIn.component';
import Signup from './modules/signup/Signup.component';
import ListRepositories from './modules/listRepositories/ListRepositories.component';
import Layout from './components/layout/Layout.component';

function App() {
  return (
    <div>
      <Router>
        <Switch>
          <Route path="/sign-in" exact component={SignIn} />
          <Route path="/sign-up" exact component={Signup} />
          <PrivateRoute path="/" exact component={ListRepositories} />
        </Switch>
      </Router>
    </div>
  );
}

export const PrivateRoute = ({ component: Component, ...rest }) => {
  const storage = localStorage.getItem('user');
  const isAuthenticated = JSON.parse(storage) || {};

  function privateRenderer(props) {
    let privateRender = <Redirect to="/sign-in" />;

    if (isAuthenticated.loggedIn) {
      privateRender = (
        <Layout>
          <Component {...props} {...rest} />
        </Layout>
      );
    }

    return privateRender;
  }

  return <Route {...rest} render={privateRenderer} />;
};

export default App;
