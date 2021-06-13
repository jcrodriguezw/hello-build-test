import React, { useContext, useEffect } from 'react';
import { Button } from 'antd';
import { useHistory } from 'react-router-dom';

import { AuthContext } from '../../context/AuthContext';
import { HeaderContainer } from './Header.styles';
import logo from '../../assets/logo.png';

function Header() {
  const history = useHistory();
  const storage = localStorage.getItem('user');
  const user = JSON.parse(storage) || {};

  const { isAuthenticated, setAuthenticated } = useContext(AuthContext);

  useEffect(() => {
    setAuthenticated(user);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function onSignOut() {
    const updateAuthenticated = {
      ...isAuthenticated,
      loggedIn: false,
    };

    history.push('/sign-in');
    localStorage.setItem('user', JSON.stringify(updateAuthenticated));
  }

  return (
    <HeaderContainer>
      <img src={logo} alt={'hello build'} height="50px" />
      <div>
        <span>{isAuthenticated.userName}</span>
        <Button onClick={onSignOut}>Logout</Button>
      </div>
    </HeaderContainer>
  );
}

export default Header;
