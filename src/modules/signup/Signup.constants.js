export const REGISTER_LABEL = 'Register';

export const AGREEMENT_TEXT = 'I have read the agreement';

export const PASSWORD_WRONG = 'Password is wrong';

export const TAIL_FORM_ITEM_LAYOUT = {
  wrapperCol: {
    xs: {
      span: 24,
      offset: 0,
    },
    sm: {
      span: 16,
      offset: 8,
    },
  },
};

export const formItems = [
  {
    name: 'userName',
    label: 'UserName',
    type: 'text',
    rules: [
      {
        required: true,
        message: 'Please input your UserName!',
      },
    ],
  },
  {
    name: 'password',
    label: 'Password',
    type: 'password',
    hasFeedback: true,
    rules: [
      {
        required: true,
        message: 'Please input your password!',
      },
    ],
  },
  {
    name: 'confirm',
    label: 'Confirm Password',
    dependencies: ['password'],
    type: 'password',
    hasFeedback: true,
    rules: [
      {
        required: true,
        message: 'Please confirm your password!',
      },
      ({ getFieldValue }) => ({
        validator(_, value) {
          if (!value || getFieldValue('password') === value) {
            return Promise.resolve();
          }

          return Promise.reject(
            new Error('The two passwords that you entered do not match!')
          );
        },
      }),
    ],
  },
];
