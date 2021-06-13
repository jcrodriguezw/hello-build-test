import React from 'react';

import {
  SignInContainer,
  StyledForm,
  InfoWrapper,
  StyledChildrenWrapper,
} from './AuthLayout.styles';
import { HELLO_BUILD_LABEL, WELCOME_TEXT } from './AuthLayout.constants';
import big_logo from '../../assets/big_logo.jpg';

const AuthLayout = (props) => {
  const { children, ...newProps } = props;

  return (
    <SignInContainer>
      <StyledForm {...newProps}>
        <div>
          <img
            src={big_logo}
            alt={HELLO_BUILD_LABEL}
            width="100px"
            height="110px"
          />

          <StyledChildrenWrapper>{children}</StyledChildrenWrapper>
        </div>
      </StyledForm>
      <InfoWrapper>
        <h2>{WELCOME_TEXT}</h2>
      </InfoWrapper>
    </SignInContainer>
  );
};

export default AuthLayout;
