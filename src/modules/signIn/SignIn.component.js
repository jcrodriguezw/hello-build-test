import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { Form, Button, Input, notification } from 'antd';

import { AuthContext } from '../../context/AuthContext';
import AuthLayout from '../../components/authLayout/AuthLayout.component';
import {
  formItems,
  USER_STORAGE,
  SIGN_IN_ERROR,
  LOGIN_LABEL,
  REGISTER_LABEL,
} from './SignIn.constants';
import { ActionsWrapper } from './SignIn.styles';

const SignIn = () => {
  const history = useHistory();
  const { setAuthenticated } = useContext(AuthContext);

  const onFinish = (values) => {
    const { userName, password } = values;

    const storage = localStorage.getItem(USER_STORAGE);
    const isAuthenticated = JSON.parse(storage) || {};

    const emptyFieldsCondition =
      isAuthenticated.user !== userName ||
      isAuthenticated.password !== password;

    const loginSuccessCondition =
      isAuthenticated.user === userName &&
      isAuthenticated.password === password;

    if (emptyFieldsCondition)
      return notification.error({
        message: SIGN_IN_ERROR,
      });

    if (loginSuccessCondition) {
      const updateAuthenticated = {
        ...isAuthenticated,
        loggedIn: true,
      };

      setAuthenticated(updateAuthenticated);
      localStorage.setItem('user', JSON.stringify(updateAuthenticated));
      history.push('/');
    }
  };

  const itemList = () =>
    formItems.map((item, index) => (
      <Form.Item key={index} name={item.name} rules={item.rules}>
        <Input
          prefix={item.prefix}
          type={item.type}
          placeholder={item.placeholder}
        />
      </Form.Item>
    ));

  return (
    <AuthLayout
      name="normal_login"
      className="login-form"
      initialValues={{
        remember: true,
      }}
      onFinish={onFinish}
    >
      {itemList()}

      <Form.Item>
        <ActionsWrapper>
          <Button
            type="primary"
            size="large"
            htmlType="submit"
            className="login-form-button"
          >
            {LOGIN_LABEL}
          </Button>
          <p>Or</p>
          <a href="/sign-up">{REGISTER_LABEL}</a>
        </ActionsWrapper>
      </Form.Item>
    </AuthLayout>
  );
};

export default SignIn;
