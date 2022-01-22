import React, { useState } from "react";
import styled from "styled-components";
import Logo from "../images/titlelogo.png"

const TitleBoard = styled.main`
  width: 100%;
  height: 31.25rem;
  background: #FFF1AD;
`;

const TitleLogo = styled.img`
  display: flex;
  padding-top: 8.5rem;
  width: 630px;
  height: 239px;
  margin: auto;
`

const Container = styled.div`
  min-height: 100vh;
  display: flex;
  margin: 0;
  padding: 0;
  /* height: 100vh; */
  flex-direction: column;
  
  /* 
  row  | | |

  column |
         |
         |
  */
`;


const FeedContainer = styled.div`
  display: flex;
  flex-direction: column;
  /* gap: 1rem; */
  `

// padding: 9.375 10.625 9.375 10.625rem;
// padding: 150 170 150 170;

const TapMenu = styled.ul`
  color: rgba(73, 73, 73, 0.5);
  display: flex; // flex-box 형태로 개별 단위로 나뉜다.
  margin: 0 18.75rem; // 
  font-size: 1.25rem;
  font-weight: bold;
  list-style: none; // ul 포인트 삭제
  gap: 3rem;

  .submenu {
    width: 100%;
    margin: 2rem;
    cursor: pointer;
  }

  .selected {
    color: black;
    transition: 0.2s;
  }
`;

const FeedPhoto = styled.div` 
  display: flex;
  width: 26.25rem;
  height: 28.125rem;
  background-color: #white;
  box-shadow: 3px 3px 10px 0px rgba(0, 0, 0, 0.17);
  border-radius: 1.875rem; 
  margin: 0 18.75rem; 
  cursor: position;
  
`



const MainPage = () => {
  const [currentTab, setCurrentTab] = useState(0);

  const menuArr = [{ name: "최신순" }, { name: "인기순" }, { name: "팔로잉" }];

  const selectMenuHandler = (idx) => {
    setCurrentTab(idx);
  };

  return (
    <>
      <Container>
        <TitleBoard>
          <TitleLogo src={Logo}/>
        </TitleBoard>
        <FeedContainer>

          <TapMenu>
            {menuArr.map((el, idx) => {
              return (
                <li
                  key={idx}
                  className={
                    currentTab === idx ? "submenu selected" : "submenu"
                  }
                  onClick={() => selectMenuHandler(idx)}
                >
                  {el.name}
                </li>
              );
            })}
          </TapMenu>
          <FeedPhoto />
          <FeedPhoto />
          <FeedPhoto />

        </FeedContainer>
      </Container>
    </>
  );
};

export default MainPage;
