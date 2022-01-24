import React from "react";
import styled from "styled-components";
import Logo from "../images/footerlogo.png";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

// footer는 높이를 지정하지 않는다.
// 푸터 스타일
// 푸터 컨테이너
// 푸터 컨테이너 내부 컴포넌트
// 제목, 본문 | 깃헙 링크 | 멤버 깃헙 링크

// flex-direction
// row | | |
// column ㅡ
//        ㅡ
//        ㅡ
// Footer 설정 point
// bottom: 0이 기본이 되어야 함

const FooterWrapper = styled.footer`
  font-family: "Noto Sans KR";
  color: #424242;

  /* min-height: 100vh; */
  /* position: fixed; */
  bottom: 0;
  // 하씨... 이놈이 범인이었다.
  // 해당 태그 위치를 하단 기준으로 어느 높이에 위치시킬건지 지정.
  left: 0;
  right: 0;
  width: 100%;
  display: flex;
  flex-direction: column;
  /* position: fixed; // 스크롤을 움직여도 위치가 고정된다. */
  padding-top: 3.5rem;
  // padding: 상 좌우 하
  border-top: solid 0.2rem #ecf0f1;
`;

const Container = styled.div`
  display: flex;
  margin: 0 0 3rem 3rem;
  /* gap: 3rem; */
`;

const DescWrapper = styled.div`
  flex: 2;
  padding-right: 17rem;
`;

const Wrapper = styled.div`
  flex: 1;
  list-style: none;
  /* padding-top: 20px; */
`;

const FooterLogo = styled.img`
  width: 300px;
  height: 47px;
`;

const Heading = styled.h1`
  font-size: 1.1rem;
  margin-bottom: 1rem;
`;

const Paragraph = styled.p`
  font-family: "Roboto";
  word-break: keep-all;
  line-height: var(--lineHeight-relaxed);
  font-size: 1rem;
`;

const Item = styled.li`
  margin-bottom: 0.5rem;
`;

const Href = styled.a`
  color: #424242;
  :hover {
    color: #ff7a1b;
  }
  text-decoration: none;
`;

const Copyright = styled.span`
  margin-left: 3rem;
  margin: 0 0 4rem 3rem;
`;

const Footer = () => {
  return (
    <FooterWrapper>
      <Container>
        <DescWrapper>
          <FooterLogo src={Logo} />
          <Paragraph>
            Crayon Diary는 어렸을 때 그렸던 그림 일기처럼 일상을 그림으로
            기록하는 웹 서비스입니다. 일기장과 크레파스를 직접 구매하는 대신,
            웹을 통해 간편하게 그림 일기 감성을 다시 한 번 느낄 수 있는 가치를
            제공하기 위해 기획되었습니다.
          </Paragraph>
        </DescWrapper>
        <Wrapper>
          <Heading>About Us</Heading>
          <Item>
            <Href
              href="https://github.com/codestates/crayondiary"
              target="_blank"
            >
              <></>
              Github
            </Href>
          </Item>
          <Item>
            <Href
              href="https://github.com/codestates/crayondiary/wiki"
              target="_blank"
            >
              Wiki
            </Href>
          </Item>
        </Wrapper>

        <Wrapper>
          <Heading>Contact</Heading>
          <Item>
            <Href href="https://github.com/Jaekomplett" target="_blank">
              {/* <img src={GithubLogo}></img> */}
              김제완
            </Href>
          </Item>
          <Item>
            <Href href="https://github.com/alsrlqor" target="_blank">
              백민기
            </Href>
          </Item>
          <Item>
            <Href href="https://github.com/leesangsuk-cloud" target="_blank">
              이상석
            </Href>
          </Item>
          <Item>
            <Href href="https://github.com/sunwoong3" target="_blank">
              정선우
            </Href>
          </Item>
        </Wrapper>
      </Container>
      <Copyright>© 2022 Crayondiary. All rights reserved.</Copyright>
    </FooterWrapper>
  );
};

export default Footer;
