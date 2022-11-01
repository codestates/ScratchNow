import React, { useState, useEffect } from 'react';
import { changeInputValue } from '../utils/changeInputValue';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function LoginPage() {
  const navigate = useNavigate();

  const [inputEmail, setInputEmail] = useState<string>('');
  const [inputPassword, setInputPassword] = useState<string>('');
  const [loginButtonDisabled, setLoginButtonDisabled] = useState<boolean>(true);

  const goJoinPage = () => {
    navigate('/join');
  };

  const loginMembership = async (email: string, password: string) => {
    await axios
      .post(`${process.env.REACT_APP_API_URL}/api/user/login`, {
        email: email,
        password: password,
      })
      .then((res) => {
        alert('로그인 성공!');
        console.log(res.data.accessToken);
        window.sessionStorage.setItem('accessToken', res.data.accessToken);
        navigate('/');
      })
      .catch((err) => {
        console.log(err);
        alert('올바른 이메일과 비밀번호를 입력해주세요.');
      });
  };

  const loginButtonHandler = () => {
    loginMembership(inputEmail, inputPassword);
  };

  const checkIsLoginButtonDisabled = (
    inputEmail: string,
    inputPassword: string
  ) => {
    return inputEmail.length > 5 && inputPassword.length > 9;
  };

  useEffect(() => {
    if (checkIsLoginButtonDisabled(inputEmail, inputPassword)) {
      setLoginButtonDisabled(false);
    } else {
      setLoginButtonDisabled(true);
    }
  }, [inputEmail, inputPassword]);

  return (
    <div id="loginpage_container">
      <div id="img_wrapper">
        <img
          className="desktop_img"
          src="./images/bigImage.png"
          alt="로고이미지"
        />
        <img
          className="mobile_img"
          src="./images/scratchNowMobileLogo.png"
          alt="모바일로고이미지"
        />
      </div>
      <div id="contents_wrapper">
        <div id="inner">
          <input
            placeholder="이메일"
            value={inputEmail}
            onChange={(e) => {
              changeInputValue(e, setInputEmail, 25);
            }}
          />
          <input
            placeholder="비밀 번호"
            type="password"
            value={inputPassword}
            onChange={(e) => {
              changeInputValue(e, setInputPassword, 15);
            }}
          />
          <button
            className="login_btn"
            disabled={loginButtonDisabled}
            onClick={loginButtonHandler}
          >
            로그인
          </button>
          <div id="or_wrapper">
            <span className="or_line" />
            <p>또는</p>
            <span className="or_line" />
          </div>
          <div id="kakao_login_wrapper">
            <img
              src="./images/kakaoLoginImage.png"
              alt="카카오이미지"
            />
          </div>
        </div>
        <div id="join_btn_wrapper">
          <p>회원이 아니신가요?</p>
          <p
            className="join_btn"
            onClick={goJoinPage}
          >
            가입하기
          </p>
        </div>
      </div>
    </div>
  );
}
