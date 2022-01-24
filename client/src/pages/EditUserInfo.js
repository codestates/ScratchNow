// import React, { useState } from "react";
// import styled from "styled-components";
// import axios from "axios";
// // import { useNavigate } from "react-router-dom";
// import userImg from "../images/userImg.png";

// axios.defaults.withCredentials = true;
// export const Container = styled.div`
//   display: flex;
//   flex-wrap: wrap;
//   width: 100%;
//   //align-items: center;
// `;

// export const EditForm = styled.div`
//   background-color: #ffffff;
//   box-sizing: border-box;
//   width: 800px;
//   height: 600px;
//   border-radius: 30px;
//   background-color: #fff1ad;
//   margin-left: 280px;
// `;
// export const Navbar = styled.div`
//   display: flex;
//   background-color: #ffffff;
//   height: 150px;
//   border-radius: 30px;
//   //background-color: #fff1ad;
//   flex-direction: column;
// `;

// export const LeftNav = styled.div`
//   width: 30%;
//   background-color: white;
//   box-sizing: border-box;
// `;
// export const RightNav = styled.div`
//   width: 70%;
//   background-color: white;
//   font-size: 30px;
// `;
// export const Left = styled.div`
//   box-sizing: border-box;
//   width: 30%;
//   height: 450px;
//   border-radius: 30px 0px 0px 30px;
//   background-color: #fff8d6;
//   padding: 100px 0px 200px 150px;
//   //float: right;
// `;
// export const Right = styled.div`
//   box-sizing: border-box;
//   width: 70%;
//   height: 450px;
//   background-color: #fff8d6;
//   border-radius: 0px 30px 30px 0px;
//   padding: 55px 50px 50px 50px;
// `;

// export const Contents = styled.div`
//   margin: 0 auto;
//   width: 100%;
//   //position: relative;
//   padding: 0 20px 32px;
//   box-sizing: border-box;
//   display: flex;
//   justify-content: center;
//   flex-direction: column;
// `;
// export const UserEmail = styled.div`
//   font-size: 20px;
//   margin: 10px;
//   margin-left: 0px;
// `;
// // export const ImgBox = styled.div`
// //   width: 150px;
// //   height: 120px;
// //   transform: translate(-50%, -50%);
// //   margin-top: 20px;
// //   padding-bottom: 0px;
// //   border-radius: 100px;
// // `;
// export const UserImg = styled.img`
//   width: 150px;
//   height: 120px;
//   //transform: translate(-50%, -50%);
//   margin-top: 20px;
//   padding-bottom: 0px;
// `;

// export const PasswordForm = styled.input`
//   background-color: #fff8d6;
//   margin-top: 10px;
//   border-radius: 2px;
//   width: 100%;
//   height: 40px;
//   border-bottom: 1px solid #e5e5e5;
//   border-right: 0px;
//   border-top: 0px;
//   border-left: 0px;
//   padding: 9px 12px;
//   outline: none;
//   box-sizing: border-box;
//   ::placeholder {
//     color: #999999;
//   }
// `;
// export const MessageForm = styled.input`
//   background-color: #fff8d6;
//   margin-top: 10px;
//   border-radius: 2px;
//   width: 100%;
//   height: 80px;
//   border-bottom: 1px solid #e5e5e5;
//   border-right: 0px;
//   border-top: 0px;
//   border-left: 0px;
//   padding: 9px 12px;
//   outline: none;
//   box-sizing: border-box;
//   ::placeholder {
//     color: #999999;
//   }
// `;
// export const ErrorForm = styled.div`
//   font-size: 11px;
//   color: rgb(83, 81, 70);
//   display: flex;
//   justify-content: center;
//   margin-top: 5px;
// `;
// export const Btn = styled.button`
//   height: 40px;
//   width:220px
//   font-size: 11px;
//   padding: 10px;
//   cursor: pointer;
//   background-color: rgb(255, 241, 173);
//   color: rgb(83, 81, 70);
//   line-height: 1px;
//   margin-top: 10px;
//   border-radius: 8px;
//   border-style: none;
// `;

// export const UserName = styled.div`
//   font-size: 30px;
//   margin: 25px;
//   margin-left: 0px;
// `;
// export const Space = styled.div`
//   width: 100px;
//   height: 20px;
// `;

// export const Info = styled.div`
//   width: 100%;
//   height: 80px;
//   font-size: 16px;
//   margin-left: 20px;
// `;

// export const PasswordInfo = styled.div`
//   width: 150px;
//   height: 80px;
//   font-size: 16px;
//   margin-left: 30px;
// `;

// export const UserId = styled.div`
//   width: 150px;
//   height: 80px;
//   margin-top: -60px;
//   margin-left: -40px;
//   margin-bottom:20px
//   font-size: 18px;
// `;

// const EditUserInfo = ({ isOpen, close }) => {
//   const [userInfo, setuserInfo] = useState({
//     message: "",
//     password: "",
//     checkpassword: "",
//   });
//   const [errorMessage, setErrorMessage] = useState("");

//   const loginHandler = (key) => (e) => {
//     setuserInfo({ ...userInfo, [key]: e.target.value });
//   };

//   const loginClickHandler = () => {
//     //바꾸기
//     if (userInfo.message && userInfo.password) {
//       axios
//         .post("https://localhost:4000/user/edit", userInfo, {
//           headers: {
//             "Content-Type": "application/json",
//           },
//           withCredentials: true,
//         })
//         .then(() => {
//           loginHandler(userInfo);
//         })
//         .catch((err) => console.log(err));
//     }
//     setErrorMessage("모든 항목은 필수입니다");
//   };

//   return (
//     <Container>
//       <EditForm>
//         <Navbar>
//           <LeftNav>
//             <UserImg src={userImg} alt="" />
//           </LeftNav>
//           <RightNav>
//             CrayonPop
//             {/* <UserName>CrayonPop</UserName> */}
//           </RightNav>
//         </Navbar>
//         <Left>
//           <UserId>이메일또는연동계정</UserId>
//           <Info>상태메세지</Info>
//           <PasswordInfo>비밀번호</PasswordInfo>
//           {/* <PasswordInfo>비밀번호 확인</PasswordInfo> */}
//         </Left>
//         <Right>
//           <Contents>
//             <UserEmail>선우@naver.com</UserEmail>
//             <MessageForm
//               name="email"
//               type="text"
//               placeholder="상태메시지"
//               onChange={loginHandler}
//             />
//             <Space></Space>
//             <PasswordForm
//               name="password"
//               type="password"
//               placeholder="비밀번호"
//               onChange={loginHandler}
//             />
//             <PasswordForm
//               name="password"
//               type="password"
//               placeholder="비밀번호 확인"
//               onChange={loginHandler}
//             />
//             <ErrorForm>{errorMessage}</ErrorForm>
//             <Space></Space>
//             <Btn onClick={loginClickHandler}> 수정 </Btn>
//             <Btn onClick={loginClickHandler}> 회원 탈퇴 </Btn>
//           </Contents>
//         </Right>
//       </EditForm>
//     </Container>
//   );
// };

// export default EditUserInfo;

import React, { useState } from "react";
import styled from "styled-components";
import axios from "axios";

export const EditForm = styled.div`
  display: flex;
  background-color: #ffffff;
  box-sizing: border-box;
  width: 800px;
  height: 600px;
  border-radius: 30px;
  background-color: #fff1ad;
  margin-left: 280px;
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
`;

export const Profile = styled.div`
  display: flex;
  border-radius: 100%;
  background-color: white;
  width: 100px;
  height: 100px;
  transform: translate(200%, 70%);
  z-index: 1;
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
`;
export const ErrorForm = styled.div`
  font-size: 11px;
  color: rgb(83, 81, 70);
  display: flex;
  justify-content: center;
  margin-top: 20px;
  margin-bottom: 5px;
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
  const [errorMessage, setErrorMessage] = useState("");
  return (
    <EditForm>
      <Top>
        <TopLeft>
          <Profile></Profile>
          <ProfileChange>
            <i class="fas fa-camera fa-2x"></i>
          </ProfileChange>
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
  );
};

export default EditUserInfo;
