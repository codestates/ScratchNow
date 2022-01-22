import React, { useState } from "react";
import { Link } from "react-router-dom";
import navHomeIcon from "../image/navHomeIcon.png";
import styled from "styled-components";
import Login from "./LoginModal";
import PostPage from "../pages/PostPage";

export const NavContainer = styled.div`
  display: flex;
  align-items: center;
  padding: 10px;
`;

export const Home = styled.img`
  padding: 10px;
  width: 80px;
  height: 80px;
`;
export const UserButton = styled.button`
  border: none;
  background: #fff;
  color: black;
  padding: 10px;
  cursor: pointer;
  outline: none;
  &:hover {
    color: orange;
  }
`;
export const Grow = styled.div`
  flex-grow: 1;
`;
function Nav() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const [isLogin, setIsLogin] = useState(false);

  return (
    <NavContainer>
      <Link to="/">
        <Home src={navHomeIcon} alt="logo" className="logo" />
      </Link>
      <Grow />
      <Link to="/sign/register" className="header-flex-box">
        <UserButton onClick={openModal}>마이페이지</UserButton>
        {isLogin ? (
          <Link to="/feeds" element={<PostPage />} />
        ) : (
          <Login isOpen={isModalOpen} close={closeModal} />
        )}
      </Link>
      <Link to="/sign/login" className="header-flex-box">
        {isLogin ? (
          <UserButton onClick={() => setIsLogin(false)}>로그아웃</UserButton>
        ) : (
          <UserButton onClick={openModal}>로그인</UserButton>
        )}
      </Link>
    </NavContainer>
  );
}

export default Nav;
