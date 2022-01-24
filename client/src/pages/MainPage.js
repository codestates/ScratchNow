import React, { useState } from "react";
import styled from "styled-components";
import Logo from "../images/titlelogo.png";
import { Link } from "react-router-dom";

const TitleBoard = styled.main`
  width: 100%;
  height: 31.25rem;
  margin: auto;
  background: #fff1ad;
`;

const TitleLogo = styled.img`
  display: flex;
  padding-top: 9rem;
  width: 500px;
  height: 190px;
  margin: auto;
`;

/* 
  row  가로 정렬  
  column 세로 정렬 
  */

// padding: 9.375 10.625 9.375 10.625rem;
// padding: 150 170 150 170;

const TapMenu = styled.ul`
  color: rgba(73, 73, 73, 0.5);
  display: flex; // flex-box 형태로 개별 단위로 나뉜다.
  margin: 2rem 19rem; //
  font-family: "Noto Sans KR";
  font-weight: bold;
  list-style: none; // ul 포인트 삭제
  gap: 5rem;

  .submenu {
    cursor: pointer;
  }

  .selected {
    color: #421f0a;
    transition: 0.2s;
  }
`;

const FeedCardContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 330px);
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 50px 10px;
  padding: 0 0 7rem 5rem;
`;

const FeedPhoto = styled.div`
  width: 300px; // rem 전환
  height: 321px;
  background-color: #white;
  box-shadow: 1px 3px 10px 0px rgba(0, 0, 0, 0.17);
  border-radius: 1.875rem;
  cursor: position;
`;

const PlusIcon = styled.div`
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #bdbdbd;
  :hover {
    color: #424242;
  }
`;

const MainPage = () => {
  const [currentTab, setCurrentTab] = useState(0);

  const menuArr = [{ name: "최신순" }, { name: "인기순" }, { name: "팔로잉" }];

  const selectMenuHandler = (idx) => {
    setCurrentTab(idx);
  };

  return (
    <>
      <TitleBoard>
        <TitleLogo src={Logo} />
      </TitleBoard>

      <TapMenu>
        {menuArr.map((el, idx) => {
          return (
            <li
              key={idx}
              className={currentTab === idx ? "submenu selected" : "submenu"}
              onClick={() => selectMenuHandler(idx)}
            >
              {el.name}
            </li>
          );
        })}
      </TapMenu>

      <FeedCardContainer>
        <Link to="/post">
          <FeedPhoto>
            <PlusIcon>
              <i class="fas fa-plus fa-3x"></i>
            </PlusIcon>
          </FeedPhoto>
        </Link>

        <Link to="/feeds">
          <FeedPhoto />
        </Link>
        <FeedPhoto />
        <FeedPhoto />
        <FeedPhoto />
        <FeedPhoto />
        {/* <FeedPhoto />
        <FeedPhoto />
        <FeedPhoto /> */}
      </FeedCardContainer>
    </>
  );
};

export default MainPage;
