import React from 'react';
import { Card, Form, Input, Button,message } from 'antd';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import API from './Api/ApiServices';

const LoginPage = () => {
  const navigate = useNavigate();
  const api = new API();
  const onFinish = (values) => {

    console.log('Received values of form: ', values);
    api.Login(values).then((res) => {
      console.log("res", res);
      localStorage.setItem('token', res?.data?.token);
      localStorage.setItem('user',res?.data?.role );
      localStorage.setItem('user_id',res?.data?.user_id );
      if(res?.status === 201){
          message.success("Signup successfully")
          navigate('/dashboard');
      }else {
        message.error("Invalid Username or Password!")
      }
     });
   // Replace with the desired route
  };

  return (
    <LoginAlign>
      <div className="center-container">
        <Card className="login-card">
          <h2>Login</h2>
          <Form name="login" onFinish={onFinish} layout="vertical" autoComplete='off'>
            <Form.Item
              label="Email"
              name="username"
              rules={[{ required: true, type: 'email', message: 'Please enter a valid email address!' }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="Password"
              name="password"
              rules={[{ required: true, message: 'Please enter your password!' }]}
            >
              <Input.Password />
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit">
                Login
              </Button>
              <span style={{ marginLeft: '10px' }}>
                or <a href="/signup">Sign up for admin</a>
              </span>
            </Form.Item>
          </Form>
        </Card>
      </div>
    </LoginAlign>
  );
};

export default LoginPage;

const LoginAlign = styled.div`
  .center-container {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
  }

  .login-card {
    width: 350px;
    padding: 20px;
  }
`;