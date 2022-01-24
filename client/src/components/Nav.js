import React, { useState } from "react";
import { Link } from "react-router-dom";
import navHomeIcon from "../images/navHomeIcon.png";
import styled from "styled-components";
import LoginModal from "./LoginModal";
import UserFeed from "../pages/UserFeed";
//import FollowingModal from "./FollowingModal";

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
      <UserButton onClick={openModal}>마이페이지</UserButton>
      {isLogin ? (
        <Link to="/feeds" element={<UserFeed />} />
      ) : (
        <LoginModal isOpen={isModalOpen} close={closeModal} />
        // <FollowingModal isOpen={isModalOpen} close={closeModal} />
      )}
      {isLogin ? (
        <UserButton onClick={() => setIsLogin(false)}>로그아웃</UserButton>
      ) : (
        <UserButton onClick={openModal}>로그인</UserButton>
      )}
    </NavContainer>
  );
}

export default Nav;
