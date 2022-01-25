import React, { useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import LoginModalImg from '../images/LoginModalImg.png';
import CrayonDiaryLogo from '../images/My_project.png';
import Signup from './SignupModal';
import { useNavigate } from 'react-router-dom';

axios.defaults.withCredentials = true;

export const Modal = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background: rgba(0, 0, 0, 0.6);
  z-index: 3;
`;

export const LoginModal = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  background-color: #ffffff;
  transform: translate(-50%, -50%);
  width: 720px;
  height: 500px;
  border-radius: 30px;
  background-color: #fff1ad;
  display: flex;
`;
export const LeftLogin = styled.div`
  width: 50%;
  height: 100%;
  border-radius: 30px 0px 0px 30px;
`;
export const RightLogin = styled.div`
  width: 50%;
  height: 100%;
  background-color: #fff8d6;
  border-radius: 0px 30px 30px 0px;
  padding: 55px 50px 50px 50px;
  box-sizing: border-box;
  position: relative;
`;

export const Close = styled.span`
  float: right;
  font-size: 25px;
  color: rgb(83, 81, 70);
`;

export const ModalContents = styled.div`
  margin: 0 auto;
  width: 100%;
  position: relative;
  padding: 0 20px 32px;
  box-sizing: border-box;
  display: flex;
  justify-content: center;
  flex-direction: column;
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
  width: 220px;
  font-size: 11px;
  padding: 10px;
  cursor: pointer;
  background-color: rgb(255, 241, 173);
  color: rgb(83, 81, 70);
  line-height: 1px;
  margin-top: 10px;
  border-radius: 8px;
  border-style: none;
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

const Login = ({ isOpen, close }) => {
  console.log(isOpen);
  const [userInfo, setuserInfo] = useState({
    email: '',
    password: '',
  });
  const [errorMessage, setErrorMessage] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();

  const openModal = () => {
    setIsModalOpen(true);
    close();
  };
  const closeModal = () => {
    setIsModalOpen(false);
    navigate('/');
  };

  const loginHandler = (key) => (e) => {
    setuserInfo({ ...userInfo, [key]: e.target.value });
  };

  const loginClickHandler = () => {
    if (userInfo.email && userInfo.password) {
      axios
        .post('https://localhost:4000/login', userInfo, {
          headers: {
            'Content-Type': 'application/json',
          },
          withCredentials: true,
        })
        .then(() => {
          loginHandler(userInfo);
        })
        .then(() => navigate('/'))
        .catch((err) => console.log(err));
    }
    setErrorMessage('모든 항목은 필수입니다');
  };

  return (
    <>
      {isOpen ? (
        <Modal>
          <div onClick={() => close}>
            <LoginModal>
              <LeftLogin>
                <TitleImg src={CrayonDiaryLogo} />
              </LeftLogin>
              <RightLogin>
                <Close onClick={close}>&times;</Close>
                <LoginImg src={LoginModalImg} />
                <ModalContents>
                  <LoginForm name="email" type="text" placeholder="이메일 아이디" onChange={loginHandler} />
                  <LoginForm name="password" type="password" placeholder="비밀번호" onChange={loginHandler} />
                  <ErrorForm>{errorMessage}</ErrorForm>
                  <LoginBtn onClick={loginClickHandler}> 로그인 </LoginBtn>
                  <LoginBtn>SNS 로그인</LoginBtn>
                  <LoginBtn onClick={openModal}>회원가입</LoginBtn>
                  <Signup isOpen={isModalOpen} close={closeModal} />
                </ModalContents>
              </RightLogin>
            </LoginModal>
          </div>
        </Modal>
      ) : (
        <Signup isOpen={isModalOpen} close={closeModal} />
      )}
    </>
  );
};

export default Login;
