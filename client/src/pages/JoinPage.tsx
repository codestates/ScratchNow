import React, { useState, useEffect, Dispatch, SetStateAction } from 'react';
import { useNavigate } from 'react-router-dom';
import { changeInputValue } from '../utils/changeInputValue';
import axios from 'axios';

export default function JoinPage() {
  const navigate = useNavigate();

  const [inputEmail, setInputEmail] = useState<string>('');
  const [inputNickname, setInputNickname] = useState<string>('');
  const [inputPassword, setInputPassword] = useState<string>('');
  const [inputRePassword, setInputRePassword] = useState<string>('');

  const [isValidEmail, setIsValidEmail] = useState<boolean>(true);
  const [isOnlyOneEmail, setIsOnlyOneEmail] = useState<boolean>(true);

  const [isValidNickname, setIsValidNickname] = useState<boolean>(true);
  const [isValidPassword, setIsValidPassword] = useState<boolean>(true);
  const [isValidRePassword, setIsValidRePassword] = useState<boolean>(true);

  const [joinButtonDisabled, setJoinButtonDisabled] = useState<boolean>(true);

  const goLoginPage = () => {
    navigate('/login');
  };

  const resetValidStatus = (setState: Dispatch<SetStateAction<boolean>>) => {
    setState(true);
  };

  const joinMembership = async (
    email: string,
    password: string,
    nickname: string
  ) => {
    await axios
      .post(`${process.env.REACT_APP_API_URL}/api/user/`, {
        email: email,
        password: password,
        nickname: nickname,
      })
      .then((res) => {
        alert('가입이 완료되었습니다! 로그인페이지로 이동합니다.');
        navigate('/login');
      })
      .catch((err) => {
        console.log(err);
        if (err.response?.data?.message === 'Nickname already exists') {
          setIsValidNickname(false);
        } else if (
          err.response?.data?.message === 'Email already exists with JWT'
        ) {
          alert('이미 가입되어있는 이메일입니다.');
          setIsOnlyOneEmail(false);
          setIsValidEmail(false);
        }
      });
  };

  const checkIsValidEmail = (email: string) => {
    const regExp =
      /(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))/;
    return regExp.test(email);
  };

  const checkIsValidPassword = (password: string) => {
    const regExp =
      /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{10,15}$/;
    return regExp.test(password);
  };

  const checkIsValidRePassword = (password: string) => {
    return inputPassword === inputRePassword;
  };

  const checkIsValidNickname = async (nickname: string) => {
    await axios
      .get(
        `${process.env.REACT_APP_API_URL}/api/user/nicknamecheck?nickname=${nickname}`
      )
      .then((res) => {
        console.log(res);
        // 모든 validation 체크 통과시 가입 신청
        if (
          checkIsValidEmail(inputEmail) === true &&
          checkIsValidPassword(inputPassword) === true &&
          checkIsValidRePassword(inputRePassword) === true
        ) {
          // 가입신청
          joinMembership(inputEmail, inputPassword, inputNickname);
        } else {
          // 통과 못한 상태 보여주기
          setIsValidEmail(checkIsValidEmail(inputEmail));
          setIsValidPassword(checkIsValidPassword(inputPassword));
          setIsValidRePassword(checkIsValidRePassword(inputRePassword));
        }
      })
      .catch((err) => {
        console.log(err);
        // 통과 못한 상태 보여주기
        setIsValidEmail(checkIsValidEmail(inputEmail));
        setIsValidNickname(false);
        setIsValidPassword(checkIsValidPassword(inputPassword));
        setIsValidRePassword(checkIsValidRePassword(inputRePassword));
      });
  };

  const joinButtonHandler = () => {
    checkIsValidNickname(inputNickname);
  };

  const checkIsJoinButtonDisabled = (
    inputEmail: string,
    inputNickname: string,
    inputPassword: string,
    inputRePassword: string
  ) => {
    return (
      inputEmail.length > 5 &&
      inputNickname.length > 1 &&
      inputPassword.length > 9 &&
      inputRePassword.length > 9
    );
  };

  useEffect(() => {
    if (
      checkIsJoinButtonDisabled(
        inputEmail,
        inputNickname,
        inputPassword,
        inputRePassword
      )
    ) {
      setJoinButtonDisabled(false);
    } else {
      setJoinButtonDisabled(true);
    }
  }, [inputEmail, inputNickname, inputPassword, inputRePassword]);

  return (
    <div id="joinpage_container">
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
        <div id="join_inner">
          <div id="kakao_login_wrapper">
            <img
              src="./images/kakaoLoginImage.png"
              alt="카카오이미지"
            />
          </div>
          <div id="or_wrapper">
            <span className="or_line" />
            <p>또는</p>
            <span className="or_line" />
          </div>
          <input
            placeholder="이메일"
            value={inputEmail}
            onChange={(e) => {
              changeInputValue(e, setInputEmail, 25);
              resetValidStatus(setIsValidEmail);
              resetValidStatus(setIsOnlyOneEmail);
            }}
          />
          <p
            className={
              isValidEmail
                ? 'validate_message_email'
                : 'validate_message_email error'
            }
          >
            {!isOnlyOneEmail
              ? '이미 가입되어있는 이메일입니다.'
              : '이메일 양식에 맞게 작성해주세요.'}
          </p>
          <input
            placeholder="닉네임"
            value={inputNickname}
            onChange={(e) => {
              changeInputValue(e, setInputNickname, 15);
              resetValidStatus(setIsValidNickname);
            }}
          />
          <p
            className={
              isValidNickname
                ? 'validate_message_nickname'
                : 'validate_message_nickname error'
            }
          >
            이미 사용중인 닉네임입니다.
          </p>
          <input
            type="password"
            placeholder="비밀 번호"
            value={inputPassword}
            onChange={(e) => {
              changeInputValue(e, setInputPassword, 15);
              resetValidStatus(setIsValidPassword);
              resetValidStatus(setIsValidRePassword);
            }}
          />
          <p
            className={
              isValidPassword
                ? 'validate_message_password'
                : 'validate_message_password error'
            }
          >
            영문 대소문자, 숫자, 특수문자를 각각 1개 이상 사용해주세요. <br />
            (10~15자)
          </p>
          <input
            type="password"
            placeholder="비밀 번호 확인"
            value={inputRePassword}
            onChange={(e) => {
              changeInputValue(e, setInputRePassword, 15);
              resetValidStatus(setIsValidPassword);
              resetValidStatus(setIsValidRePassword);
            }}
          />
          <p
            className={
              isValidRePassword
                ? 'validate_message_re_password'
                : 'validate_message_re_password error'
            }
          >
            비밀번호가 일치하지 않습니다.
          </p>
          <button
            className="join_btn"
            disabled={joinButtonDisabled}
            onClick={joinButtonHandler}
          >
            가입 하기
          </button>
        </div>
        <div id="login_btn_wrapper">
          <p>회원이신가요 ?</p>
          <p
            className="login_btn"
            onClick={goLoginPage}
          >
            로그인하기
          </p>
        </div>
      </div>
    </div>
  );
}
