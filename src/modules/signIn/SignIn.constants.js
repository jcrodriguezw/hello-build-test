import { UserOutlined, LockOutlined } from '@ant-design/icons';

export const USER_STORAGE = 'user';

export const formItems = [
  {
    name: 'username',
    prefix: <UserOutlined className="site-form-item-icon" />,
    placeholder: 'Username',
    type: 'text',
    rules: [
      {
        required: true,
        message: 'Please input your Username!',
      },
    ],
  },
  {
    name: 'password',
    required: true,
    message: 'Please input your Password!',
    prefix: <LockOutlined className="site-form-item-icon" />,
    placeholder: 'Password',
    type: 'password',
    rules: [
      {
        required: true,
        message: 'Please input your Password!',
      },
    ],
  },
];

export const SIGN_IN_ERROR = 'Incorrect user or password';

export const LOGIN_LABEL = 'Login';

export const REGISTER_LABEL = 'Register now!';
