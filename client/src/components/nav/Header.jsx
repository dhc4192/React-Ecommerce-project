import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Menu } from "antd";
import {
  HomeOutlined,
  UserOutlined,
  UserAddOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
import firebase from "firebase";
import "./Header.css";

export default function Header() {
  const { SubMenu, Item } = Menu;
  const [current, setCurrent] = useState("home");
  let dispatch = useDispatch();
  let { user } = useSelector((state) => ({ ...state }));
  let history = useHistory();

  const handleClick = (e) => {
    setCurrent(e.key);
  };

  const logout = () => {
    firebase.auth().signOut();
    dispatch({
      type: "LOGOUT",
      payload: null,
    });
    history.push("/login");
  };

  return (
    <Menu onClick={handleClick} selectedKeys={[current]} mode="horizontal">
      <Item key="home" icon={<HomeOutlined />}>
        <Link to="/">Home</Link>
      </Item>
      {!user ? (
        <>
          <Item
            className="header-auth"
            key="register"
            icon={<UserAddOutlined />}
          >
            <Link to="/register">Sign Up</Link>
          </Item>

          <Item className="header-auth" key="login" icon={<UserOutlined />}>
            <Link to="/login">Log In</Link>
          </Item>
        </>
      ) : (
        <SubMenu
          className="header-auth"
          key="SubMenu"
          icon={<UserOutlined />}
          title={user.email && user.email.split("@")[0]}
        >
          <Item key="setting:1">Option 1</Item>
          <Item key="setting:2">Option 2</Item>
          <Item icon={<LogoutOutlined />} onClick={logout}>
            Log Out
          </Item>
        </SubMenu>
      )}
    </Menu>
  );
}
