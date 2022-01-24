import React, { useState } from "react";
import styled from "styled-components";
import axios from "axios";
// import { useNavigate } from "react-router-dom";

axios.defaults.withCredentials = true;

export const EditForm = styled.div`
  // position: fixed;
  // top: 50%;
  // left: 50%;
  background-color: #ffffff;
  width: 800px;
  height: 600px;
  border-radius: 30px;
  background-color: #fff1ad;
  display: flex;
  margin-left: 280px;
`;
export const Left = styled.div`
  width: 30%;
  height: 100%;
  border-radius: 30px 0px 0px 30px;
  background-color: #fff8d6;
  padding: 100px 0px 200px 150px;
  box-sizing: border-box;
  position: relative;
  // align-itmes: center;
  //justify-content: center;
  // flex-dirction: column;
`;
export const Right = styled.div`
  width: 70%;
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
  color: #fff8d6;
`;

export const Contents = styled.div`
  margin: 0 auto;
  width: 100%;
  position: relative;
  padding: 0 20px 32px;
  box-sizing: border-box;
  display: flex;
  justify-content: center;
  flex-direction: column;
`;
export const UserEmail = styled.div`
  font-size: 20px;
  margin: 10px;
  margin-left: 0px;
`;

export const UserImg = styled.img`
  width: 150px;
  height: 120px;
  margin-top: 20px;
  padding-bottom: 0px;
`;

export const PasswordForm = styled.input`
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
export const MessageForm = styled.input`
  background-color: #fff8d6;
  margin-top: 10px;
  border-radius: 2px;
  width: 100%;
  height: 80px;
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
export const Btn = styled.button`
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
`;

export const UserName = styled.div`
  font-size: 30px;
  margin: 25px;
  margin-left: 0px;
`;
export const Space = styled.div`
  width: 100px;
  height: 20px;
`;

export const Info = styled.div`
  width: 150px;
  height: 80px;
  font-size: 16px;
  margin-left: 20px;
`;

export const PasswordInfo = styled.div`
  width: 150px;
  height: 80px;
  font-size: 16px;
  margin-left: 30px;
`;

export const UserId = styled.div`
  width: 150px;
  height: 80px;
  margin-top: -60px;
  margin-left: -40px;
  margin-bottom:20px
  font-size: 18px;
`;

const EditUserInfo = ({ isOpen, close }) => {
  const [userInfo, setuserInfo] = useState({
    message: "",
    password: "",
    checkpassword: "",
  });
  const [errorMessage, setErrorMessage] = useState("");

  const loginHandler = (key) => (e) => {
    setuserInfo({ ...userInfo, [key]: e.target.value });
  };

  const loginClickHandler = () => {
    //바꾸기
    if (userInfo.message && userInfo.password) {
      axios
        .post("https://localhost:4000/user/edit", userInfo, {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        })
        .then(() => {
          loginHandler(userInfo);
        })
        .catch((err) => console.log(err));
    }
    setErrorMessage("모든 항목은 필수입니다");
  };

  return (
    <div onClick={() => close}>
      <EditForm>
        <Left>
          <UserImg/>
          {/* 여기에다가 넣으면 댐 */}
          <UserId>이메일또는연동계정</UserId>
          <Info>상태메세지</Info>
          <PasswordInfo>비밀번호</PasswordInfo>
          {/* <PasswordInfo>비밀번호 확인</PasswordInfo> */}
        </Left>
        <Right>
          <Close onClick={close}>&times;</Close>

          <Contents>
            <UserName>'유저네임'</UserName>
            <UserEmail>선우@naver.com</UserEmail>
            <MessageForm
              name="email"
              type="text"
              placeholder="상태메시지"
              onChange={loginHandler}
            />
            <Space></Space>
            <PasswordForm
              name="password"
              type="password"
              placeholder="비밀번호"
              onChange={loginHandler}
            />
            <PasswordForm
              name="password"
              type="password"
              placeholder="비밀번호 확인"
              onChange={loginHandler}
            />
            <ErrorForm>{errorMessage}</ErrorForm>
            <Space></Space>
            <Btn onClick={loginClickHandler}> 수정 </Btn>
            <Btn onClick={loginClickHandler}> 회원 탈퇴 </Btn>
          </Contents>
        </Right>
      </EditForm>
    </div>
  );
};

export default EditUserInfo;