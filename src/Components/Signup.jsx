import React from 'react'
import { Card, Form, Input, Button, message } from 'antd';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import API from './Api/ApiServices';
const Signup = () => {
   const navigate =useNavigate();
    const [form] = Form.useForm();
    const api = new API();
    const onFinish = (values) => {
        // console.log('Received values of form: ', values);
        const data = {...values, role:"Admin"}
       api.Signup(data).then((res) => {
        if(res?.status === 201){
            message.success("Sigup successfully")
            navigate('/');
        }else {
        message.error("Username already in use")
        }
       }) 
       
    };
  return (
    <SignupAlign>
    <div className="center-container">
    <Card className="signup-card">
      <h2>Sign Up</h2>
      <Form
        name="signup"
        onFinish={onFinish}
        layout="vertical"
      >
        <Form.Item
          label="Name"
          name="full_name"
          rules={[{ required: true, message: 'Please enter your name!' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Email"
          name="email_id"
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
        <Form.Item
          label="Confirm Password"
          rules={[{ required: true, message: 'Please enter your password again!' }]}
        >
          <Input.Password />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Sign Up
          </Button>
        </Form.Item>
      </Form>
    </Card>
  </div>
  </SignupAlign>
);

}

export default Signup;

const SignupAlign = styled.div`

.center-container {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
  }
  
  .signup-card {
    width: 500px;
    padding: 20px;
  }
    
    `