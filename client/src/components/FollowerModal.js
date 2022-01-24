import React, { useState } from "react";
import styled from "styled-components";
import axios from "axios";
import Signup from "./SignupModal";
import userImg from "../images/userImg.png";

axios.defaults.withCredentials = true;

export const Modal = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background: rgba(0, 0, 0, 0.6);
`;

export const LoginModal = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 720px;
  height: 500px;
  border-radius: 30px;
  background-color: #fff8d6;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const Close = styled.span`
  float: right;
  font-size: 25px;
  color: rgb(83, 81, 70);
`;

export const ModalContents = styled.div`
  width: 80%;
  height: 300px;
  box-sizing: border-box;
  background-color: #fff;
  margin-top: 0px;
  border-radius: 30px;
  display: flex;
  justify-content: center;
`;

export const LoginForm = styled.input`
  background-color: #fff8d6;
  margin-top: 10px;
  border-radius: 2px;
  width: 100%;
  height: 40px;
  border-bottom: 1px solid #e5e5e5;
  border-right: 0px;
  border-top: 0px;
  border-left: 0px;
  padding: 9px 12px;
  outline: none;
  box-sizing: border-box;
  ::placeholder {
    color: #999999;
  }
`;
export const ErrorForm = styled.div`
  font-size: 11px;
  color: rgb(83, 81, 70);
  display: flex;
  justify-content: center;
  margin-top: 5px;
`;
export const LoginBtn = styled.button`
  height: 40px;
  width:220px
  font-size: 11px;
  padding: 10px;
  cursor: pointer;
  background-color: rgb(255, 241, 173);
  color: rgb(83, 81, 70);
  line-height: 1px;
  margin-top: 10px;
  border-radius: 8px;
  border-style: none;
  margin-right:10px
`;

export const Xbox = styled.div`
  width: 100%;
  margin-left: -5rem;
  margin-top: 2rem;
`;
export const LoginImg = styled.img`
  width: 100px;
  height: 100px;
  display: flex;
  justify-content: center;
  margin-top: 30px;
  margin-bottom: 20px;
  transform: translate(70%, 0%);
`;

export const TitleImg = styled.img`
  width: 240px;
  height: 80px;
  display: flex;
  justify-content: center;
  margin-top: 30px;
  margin-bottom: 20px;
  transform: translate(26%, 200%);
`;

export const User = styled.img`
  width: 80px;
  height: 80px;
`;

export const UserNickName = styled.div`
  width: 50%;
`;

export const Grow = styled.div`
  width: 22rem;
`;

export const NavContainer = styled.div`
  display: flex;
  align-items: center;
  flex-direction: row;
  margin-bottom: 10px;
  width: 100%;
  transform: translate(10%);
`;
export const FollowList = styled.div`
  width: 50%;
  margin: 10px;
  border-radius: 30px;
  display: flex;
  flex-direction: row;
`;
export const List = styled.div`
  display: flex;
  flex-direction: column;
`;
export const ListRow = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin: 10px;
`;
export const FollowImg = styled.img`
  width: 40px;
  height: 40px;
`;
export const FollowId = styled.div`
  display: flex;
  flex-direction: row;
`;

const FollowerModal = ({ isOpen, close }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };
  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      {isOpen ? (
        <Modal>
          <LoginModal>
            <Xbox>
              <Close onClick={close}>&times;</Close>
            </Xbox>
            <NavContainer>
              <User src={userImg} alt="" />
              <UserNickName>유저닉네임</UserNickName>
              <LoginBtn>팔로워</LoginBtn>
              <LoginBtn>팔로잉</LoginBtn>
            </NavContainer>
            <ModalContents>
              <Signup isOpen={isModalOpen} close={closeModal} />
              <FollowList>
                <List>
                  <ListRow>
                    <FollowImg src={userImg} />
                    <FollowId>유저아이디</FollowId>
                  </ListRow>
                  <ListRow>
                    <FollowImg src={userImg} />
                    <FollowId>유저아이디</FollowId>
                  </ListRow>
                </List>
              </FollowList>
              <FollowList>
                <List>
                  <ListRow>
                    <FollowImg src={userImg} />
                    <FollowId>유저아이디</FollowId>
                  </ListRow>
                  <ListRow>
                    <FollowImg src={userImg} />
                    <FollowId>유저아이디</FollowId>
                  </ListRow>
                </List>
              </FollowList>
            </ModalContents>
          </LoginModal>
        </Modal>
      ) : null}
    </>
  );
};

export default FollowerModal;
