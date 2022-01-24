import React, { useState } from "react";
import styled from "styled-components";
import axios from "axios";
import LoginModalImg from "../images/LoginModalImg.png";
import CrayonDiaryLogo from "../images/My_project.png";
import { useNavigate } from "react-router-dom";

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

export const SignupFrom = styled.input`
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
font-size: 11px;
padding: 10px
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

const SignupModal = ({ isOpen, close }) => {
  const [userInfo, setuserInfo] = useState({
    email: "",
    nickname: "",
    password: "",
    passwordCheck: "",
  });
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const loginHandler = (key) => (e) => {
    setuserInfo({ ...userInfo, [key]: e.target.value });
  };
  const signupClickHandler = () => {
    const { email, nickname, password, passwordCheck } = userInfo;
    if (email && nickname && password && passwordCheck) {
      axios
        .post("https://localhost:4000/signup", userInfo, {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        })
        .then(() => {
          loginHandler(userInfo);
        })
        .then(() => navigate("/"))
        .catch((err) => console.log(err));
    }
    setErrorMessage("모든 항목은 필수입니다");
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
                  <SignupFrom
                    name="email"
                    type="text"
                    placeholder="아이디"
                    onChange={loginHandler}
                  />
                  <SignupFrom
                    name="password"
                    type="password"
                    placeholder="비밀번호"
                    onChange={loginHandler}
                  />
                  <SignupFrom
                    name="password"
                    type="password"
                    placeholder="비밀번호"
                    onChange={loginHandler}
                  />
                  <SignupFrom
                    name="password"
                    type="password"
                    placeholder="비밀번호확인"
                    onChange={loginHandler}
                  />
                  <ErrorForm>{errorMessage}</ErrorForm>
                  <LoginBtn onClick={signupClickHandler}> 회원가입 </LoginBtn>
                </ModalContents>
              </RightLogin>
            </LoginModal>
          </div>
        </Modal>
      ) : null}
    </>
  );
};

export default SignupModal;
