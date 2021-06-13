import React, { useContext } from 'react';
import { Form, Input, Checkbox, Button, notification } from 'antd';
import { useHistory } from 'react-router-dom';

import { AuthContext } from '../../context/AuthContext';
import AuthLayout from '../../components/authLayout/AuthLayout.component';
import {
  TAIL_FORM_ITEM_LAYOUT,
  REGISTER_LABEL,
  AGREEMENT_TEXT,
  PASSWORD_WRONG,
  formItems,
} from './Signup.constants';

const Signup = () => {
  const [form] = Form.useForm();
  const history = useHistory();
  const { setAuthenticated } = useContext(AuthContext);

  const onFinish = (values) => {
    const { userName, password, confirm } = values;

    if (password !== confirm)
      return notification.error({
        message: PASSWORD_WRONG,
      });

    setAuthenticated({ userName, password, loggedIn: true });

    localStorage.setItem(
      'user',
      JSON.stringify({ userName, password, loggedIn: true })
    );

    history.push('/');
  };

  const itemList = () =>
    formItems.map((item, index) => (
      <Form.Item
        key={index}
        name={item.name}
        label={item.label}
        dependencies={item.dependencies}
        hasFeedback={item.hasFeedback}
        rules={item.rules}
      >
        <Input type={item.type} />
      </Form.Item>
    ));

  return (
    <AuthLayout
      form={form}
      name="register"
      onFinish={onFinish}
      initialValues={{
        residence: ['zhejiang', 'hangzhou', 'xihu'],
        prefix: '86',
      }}
      scrollToFirstError
    >
      {itemList()}

      <Form.Item
        name="agreement"
        className="agreement"
        valuePropName="checked"
        rules={[
          {
            validator: (_, value) =>
              value
                ? Promise.resolve()
                : Promise.reject(new Error('Should accept agreement')),
          },
        ]}
        {...TAIL_FORM_ITEM_LAYOUT}
      >
        <Checkbox>{AGREEMENT_TEXT}</Checkbox>
      </Form.Item>
      <Form.Item {...TAIL_FORM_ITEM_LAYOUT}>
        <Button type="primary" htmlType="submit">
          {REGISTER_LABEL}
        </Button>
      </Form.Item>
    </AuthLayout>
  );
};

export default Signup;
