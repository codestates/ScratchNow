import React from 'react';

export default function LoginPage() {
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
          <input placeholder="이메일" />
          <input placeholder="비밀 번호" />
          <button className="login_btn">로그인</button>
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
          <p className="join_btn">가입하기</p>
        </div>
      </div>
    </div>
  );
}
