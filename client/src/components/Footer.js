import React from "react";
import styled from "styled-components";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
// import { faGithub } from "@fortawesome/free-brands-svg-FaIcons"

// footer는 높이를 지정하지 않는다.
// 푸터 스타일
// 푸터 컨테이너
// 푸터 컨테이너 내부 컴포넌트
// 제목, 본문 | 깃헙 링크 | 멤버 깃헙 링크

const StyledFooter = styled.footer`
  min-height: 100%;
  position: fixed; // 스크롤을 움직여도 위치가 고정된다.
  padding: 4rem 2rem;
  border-top: 1px solid var(--color-lightgray);
  font-family: Interop-Regular;
  /* width: 100%; */
  /* bottom: 0; */
`;

const Container = styled.div`
  display: flex;
  margin-bottom: 3rem;
  gap: 3rem;
`;

const DescWrapper = styled.div`
  flex: 2;
`;

const Wrapper = styled.div`
  flex: 1;
  list-style: none;

`;

const Heading = styled.h1`
  font-size: 1rem;
  margin-bottom: 1rem;
  font-family: Interop-Medium;
  color: var(--color-black);
`;

const Paragraph = styled.p`
  word-break: keep-all;
  line-height: var(--lineHeight-relaxed);
`;

const Items = styled.ul``;

const Item = styled.li`
  :not(:last-child) {
    margin-bottom: 0.5rem;
  }
`;

const Link = styled.a`
  text-decoration: underline;
  /* svg {
    vertical-align: text-bottom;
    font-size: 1.25rem;
    margin-right: 0.5rem;
  } */
`;

const Copyright = styled.span``;

const Footer = () => {
  return (
    <StyledFooter>
      <Container>
        <DescWrapper>
          <Heading>Crayon Diary</Heading>
          <Paragraph>
            Crayon Diary는 어렸을 때 그렸던 그림 일기처럼 일상을 그림으로
            기록하는 웹 서비스입니다. 일기장과 크레파스를 직접 구매하는 대신,
            웹을 통해 간편하게 그림 일기 감성을 다시 한 번 느낄 수 있는 가치를
            제공하기 위해 기획되었습니다.
          </Paragraph>
        </DescWrapper>
        <Wrapper>
          <Heading>Project</Heading>
          <Items>
            <Item>
              <Link
                href="https://github.com/codestates/crayondiary"
                target="_blank"
              >
                Github
              </Link>
            </Item>
            <Item>
              <Link
                href="https://github.com/codestates/crayondiary/wiki"
                target="_blank"
              >
                Wiki
              </Link>
            </Item>
          </Items>
        </Wrapper>
        <Wrapper>
          <Heading>Team Members</Heading>
          <Items>
            <Item>
              <Link href="https://github.com/Jaekomplett" target="_blank">
                김제완
              </Link>
            </Item>
            <Item>
              <Link href="https://github.com/alsrlqor" target="_blank">
                백민기
              </Link>
            </Item>
            <Item>
              <Link href="https://github.com/leesangsuk-cloud" target="_blank">
                이상석
              </Link>
            </Item>
            <Item>
              <Link href="https://github.com/sunwoong3" target="_blank">
                정선우
              </Link>
            </Item>
          </Items>
        </Wrapper>
      </Container>

      <Copyright>© 2021 Crayondiary. All rights reserved.</Copyright>
    </StyledFooter>
  );
};

export default Footer;



