import React, { useLayoutEffect, lazy, useState, useEffect } from "react";
import { UploadOutlined, UserOutlined, VideoCameraOutlined } from '@ant-design/icons';
import { Tabs, Avatar, Dropdown, Menu,message } from 'antd';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import Signup from "./Signup";
import Task from "./Task";
import User from "./User";
import Employee from "./Employee";
import API from "./Api/ApiServices";
import { useNavigate } from 'react-router-dom';

const { TabPane } = Tabs;

const DashBoard = () => {
  const [activeTab, setActiveTab] = useState("admin");
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [userType, setUserType] = useState();
  const api = new API();
  const navigate =useNavigate();
  const handleAvatarClick = () => {
    setDropdownVisible(!dropdownVisible);
  };
  const handleTabChange = (key) => {
    setActiveTab(key);
  };
const handleLogout = () => {
  api.logout().then((res) => {
    // console.log("ressss", res)
    if(res?.status === 201) {
      message.success("Logout Successfully");
      navigate('/');
    }else {
      message.error("Something Went Wrong!")
    }
  })
}

useEffect(() => 
{
  let user = localStorage.getItem("user");
  setUserType(user);
}, [])



  const menu = (
    <Menu 
    onClick={handleLogout}
    >
      <Menu.Item key="logout">Logout</Menu.Item>
    </Menu>
  );

  return (
    <DashBoardAlign>
      <div className="Container">

        <div className="header">
          <h2 className="title">Demo Task</h2>
          <Dropdown trigger={['click']} overlay={menu} open={dropdownVisible} onVisibleChange={setDropdownVisible}>
      <Avatar
        className="avatar"
        style={{
          backgroundColor: '#87d068',
        }}
        icon={<UserOutlined />}
        onClick={handleAvatarClick}
      />
    </Dropdown>
        </div>
      
        <Tabs
          className="Tabs"
          activeKey={activeTab}
          onChange={handleTabChange}
          type="card"
        >
          {userType === "Admin" &&
          (
            <>
          <TabPane tab="User" key="admin">
            <User />
          </TabPane>
          <TabPane tab="Task" key="user">
            <Task />
          </TabPane>
          </>
          )
}    
          <TabPane tab="Employee" key="video">
            <Employee />
          </TabPane>
        </Tabs>
      </div>
    </DashBoardAlign>
  );
};

export default DashBoard;

const DashBoardAlign = styled.div`

.header  {
  width: 72%;
  padding: 16px;
   display:flex;
   align-items:center;
   justify-content:space-between;
}

  width: 100% !important;
  height: 100% !important;
  background-color: #f0f2f5; /* Optional background color for the whole screen */
.Container {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background-color: #f0f2f5; /* Optional background color for the whole screen */
    // padding: 20px;
    box-sizing: border-box;
    border-radius: 10px;
    box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.2);
}

.Tabs {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background-color: #f0f2f5; /* Optional background color for the whole screen */
    padding: 20px;
    box-sizing: border-box;
    border-radius: 10px;
    box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.2);
}

`;