import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function Header() {
  const navigate = useNavigate();

  const goLoginPage = () => {
    navigate('/login');
  };

  const goJoinPage = () => {
    navigate('/join');
  };

  return (
    <header id="header_container">
      <div id="contents_wrapper">
        <div id="img_wrapper">
          <img
            src="./images/scratchNowLogo.png"
            alt="로고 이미지"
          />
        </div>
        <div id="btn_wrapper">
          <button
            className="login_btn"
            onClick={goLoginPage}
          >
            로그인
          </button>
          <p
            className="join_btn"
            onClick={goJoinPage}
          >
            회원 가입
          </p>
        </div>
      </div>
    </header>
  );
}
