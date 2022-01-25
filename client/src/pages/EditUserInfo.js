import React, { useState, useEffect } from "react";
import styled from "styled-components";
import axios from "axios";
import ImgUpload from "../components/ImgUpload";
import { v4 as uuidv4 } from "uuid";

export const Container = styled.div`
display: flex;
margin : auto;
flex-direction: row;
`
export const EditForm = styled.div`
  display: flex;
  background-color: #ffffff;
  box-sizing: border-box;
  width: 800px;
  height: 600px;
  border-radius: 30px;
  background-color: #fff1ad;
  margin: 100px auto;
  flex-direction: column;
`;
export const Top = styled.div`
  display: flex;
  box-sizing: border-box;
  width: 100%;
  height: 34%;
  border-radius: 30px 30px 0px 0px;
  background-color: #fff8d6;
`;
export const Bottom = styled.div`
  display: flex;
  box-sizing: border-box;
  width: 100%;
  height: 66%;
  background-color: #fff8d6;
  border-radius: 0px 0px 30px 30px;
`;

export const TopLeft = styled.div`
  display: flex;
  box-sizing: border-box;
  width: 40%;
  height: 100%;
  border-radius: 30px 0px 0px 0px;
  background-color: #fff8d6;
`;

export const TopRight = styled.div`
  display: flex;
  box-sizing: border-box;
  width: 60%;
  height: 100%;
  border-radius: 0px 30px 0px 0px;
  background-color: #fff8d6;
  font-size: 30px;
  padding-top: 100px;
  padding-left: 50px;
`;

export const BottomLeft = styled.div`
  display: flex;
  box-sizing: border-box;
  width: 40%;
  height: 100%;
  border-radius: 0px 0px 0px 30px;
  background-color: #fff8d6;
  flex-direction: column;
  float: right;
`;

export const BottomRight = styled.div`
  display: flex;
  box-sizing: border-box;
  width: 60%;
  height: 100%;
  border-radius: 0px 0px 30px 0px;
  background-color: #fff8d6;
  flex-direction: column;
  padding-top: 20px;
  padding-right: 200px;
  padding-left: 20px;
  padding-bottom: 30px;
`;

export const Profile = styled.div`
  display: flex;
  border-radius: 100%;
  background-color: white;
  width: 100px;
  height: 100px;
  transform: translate(200%, 70%);
  //z-index: 1;
`;

export const ProfileChange = styled.button`
  display: flex;
  border-radius: 100%;
  width: 35px;
  height: 35px;
  transform: translate(500%, 390%);
  border: none;
  background: none;
  z-index: 2;
`;

const UserEmail = styled.div`
  diplay: flex;
  font-size: 25px;
  height: 30px;
  color: rgb(83, 81, 70);
`;

export const MessageForm = styled.input`
  background-color: #faf2c7;
  margin-top: 10px;
  border-radius: 2px;
  width: 100%;
  height: 80px;
  border-bottom: 0px solid #e5e5e5;
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
export const PasswordForm = styled.input`
  background-color: #faf2c7;
  margin-top: 10px;
  border-radius: 2px;
  width: 100%;
  height: 40px;
  border-bottom: 0px solid #e5e5e5;
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
  :hover{
    background: #ce724a;
    color: white;
    transition: background-color .5s;
  }
`;
export const ErrorForm = styled.div`
  font-size: 11px;
  color: rgb(83, 81, 70);
  display: flex;
  justify-content: center;
  margin : auto;
`;

export const Email = styled.div`
  display: flex;
  font-size: 20px;
  width: auto;
  height: 20px;
  margin-top: 20px;
  margin-left: auto;
  color: rgb(83, 81, 70);
`;

export const State = styled.div`
  display: flex;
  font-size: 20px;
  width: auto;
  height: 80px;
  margin-top: 20px;
  margin-left: auto;
  color: rgb(83, 81, 70);
`;

export const PasswordBox = styled.div`
  display: flex;
  font-size: 20px;
  width: auto;
  height: 40px;
  margin-top: 20px;
  margin-left: auto;
  margin-top: 10px;
  color: rgb(83, 81, 70);
`;

const EditUserInfo = () => {
  // const [errorMessage, setErrorMessage] = useState("");
  // const [isPasswordCorrect, setIsPasswordCorrect] = useState(false);
  // const isPasswordCorrectHandler = () => {
  //   setIsPasswordCorrect(!isPasswordCorrect);
  // };
  // const config = {
  //   headers: {
  //     Authorization: `Bearer ${
  //       JSON.parse(localStorage.getItem("userInfo")).token
  //     }`,
  //   },
  // };

  return (
    <Container>
    <EditForm>
      <Top>
        <TopLeft>
          <Profile>
            {/* <img
              src={JSON.parse(localStorage.getItem("userInfo")).image}
              alt="profile image"
            /> */}
          </Profile>
          <ImgUpload>
            {/* <ProfileChange>
              <i class="fas fa-camera fa-2x"></i>
            </ProfileChange> */}
          </ImgUpload>
        </TopLeft>
        <TopRight>CrayonPop</TopRight>
      </Top>
      <Bottom>
        <BottomLeft>
          <Email>이메일 또는 연동계정</Email>
          <State>상태메세지</State>
          <PasswordBox>비밀번호</PasswordBox>
          <PasswordBox>비밀번호 확인</PasswordBox>
        </BottomLeft>
        <BottomRight>
          <UserEmail>1234@naver.com</UserEmail>
          <MessageForm placeholder="Type Something..." />
          <PasswordForm placeholder="Type Something..." />
          <PasswordForm placeholder="Type Something..." />
          <ErrorForm>비밀번호를 확인해 주세요</ErrorForm>
          <Btn>수정</Btn>
          <Btn>회원탈퇴</Btn>
        </BottomRight>
      </Bottom>
    </EditForm>
  </Container>
  );
};

export default EditUserInfo;
