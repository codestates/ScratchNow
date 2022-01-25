import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  align-items: center;
  flex-direction: column; // 글 위치
`;
export const Navcontainer = styled.div`
  display: flex;
  width: 100%;
  height: 120px;
  align-items: center;
`;
export const Maincontent = styled.div`
  display: flex;
  width: 1240px;
  height: 700px;
  padding-top: 30px;
  flex-direction: row;
`;
export const Picturecontainer = styled.div`
  display: flex;
`;
export const Picture = styled.div`
  width: 900px;
  height: 670px;
  background-color: white;
  border-radius: 30px;
  align-items: center;
`;
export const Textcontainer = styled.div`
  display: flex;
  margin: 20px;
  margin-top: -15px;
  align-items: center;
  height: 700px;
  // transform: translate(3%, -2.3%);
`;
export const Text = styled.div`
  border-radius: 30px;
  display: flex;
  width: 320px;
  height: 670px;
  background-color: #fcfcf7;
  flex-direction: column;
`;

export const Proplie = styled.div`
  display: flex;
  border-radius: 100%;
  background-color: white;
  width: 100px;
  height: 100px;
`;
export const Textarea = styled.div`
  padding-top: 30px;
  padding-left: 15px;
  padding-bottom: 20px;
  display: flex;
  flex-direction: row;
`;
export const Proplie1 = styled.div`
  display: flex;
  border-radius: 100%;
  background-color: green;
  width: 50px;
  height: 50px;
  margin-top: 10px;
`;
export const Message = styled.input`
  // display: flex;
  margin-left: 13px;
  padding-left: 10px;
  border-radius: 10px;
  background-color: #fff8d6;
  align-items: center;
  width: 210px;
  height: 70px;
  //transform: translate(0%, -15%);
  border: none;
`;
export const Comment = styled.div`
  display: flex;
  word-break: break-all;
  word-wrap: break-word;
  grid-template-columns: repeat(1, 150px);
  margin-left: 13px;
  margin-top: 10px;
  padding-left: 10px;
  border-radius: 10%;
  align-items: center;
  width: 210px;
  height: 70px;
  transform: translate(0%, -15%);
`;
export const Comment1 = styled.div`
  display: flex;
  margin-top: 13px;
`;
export const Commentsarea = styled.div`
  flex-direction: column;
  display: flex;
  margin-left: 10px;
  width: 320px;
  height: 500px;
  padding-left: 5px;
  overflow: scroll;
  &::-webkit-scrollbar-thumb {
  }
  &::-webkit-scrollbar {
    height: 0px;
  }
  &::-webkit-scrollbar-track {
    height: 10px;
    border-radius: 50%;
  }
`;

export const Namecontainer = styled.div`
  display: flex;
  padding-left: 40px;
  align-items: center;
  font-size: 1.8rem;
  width: 550px;
  height: 100px;
`;
export const ButtonBox = styled.div`
  width: 10%;
`;
export const EditButton = styled.button`
  border: none;
  background: rgb(255, 241, 173);
  color: black;
  padding: 10px;
  cursor: pointer;
  outline: none;
  border-radius: 8px;
  margin: 10px;
  width: 80px;
  height: 50px;
  font-size: 1rem;
  :hover {
    background: #ce724a;
    color: white;
    transition: background-color 0.5s;
  }
`;
export const RightBox = styled.div`
  width: 320px;
  height: 100px;
  margin-left: 40px;
  //flex-direction: row;
  display: flex;
  align-items: column;
`;
export const Contentbox = styled.div`
  box-sizing: border-box;
  width: 1320px;
  height: 900px;
  background: #fff8d6;
  padding: 30px 10px 100px 40px; //글자위치
  border-radius: 30px;
  align-items: stretch;
  margin: 70px auto;
  border: 1px solid rgba(0, 0, 0, 0);
  overflow: hidden;
  flex-direction: row;
`;

export const Weather = styled.div`
  padding-left: 10px;
  width: 250px;
  padding-top: 8px;
`;

export const Like = styled.div`
  display: flex;
  padding: 5px;
`;

export const LikeCount = styled.div`
  width: 80px;
  //diplay: flex;
  padding-left: 10px;
  font-size: 1.5rem;
  padding-top: 8px;
`;

const ViewPost = () => {
  const [like, setLike] = useState(false);
  const likeClick = () => {
    setLike(!like);
  };
  return (
    <Container>
      <Contentbox>
        <Navcontainer>
          <Proplie></Proplie>
          <Link to="/feeds">
            <Namecontainer>Crayon</Namecontainer>
          </Link>
          {/* 유저 이름 누르면 유저피드로 가는 링크 걸어주기 */}
          {/* 포스트아이디랑 유저아이디가 같으면 수정 삭제 버튼 없애기 */}
          <EditButton>수정</EditButton>
          <EditButton>삭제</EditButton>
          <RightBox>
            <Weather>
              <i class="fas fa-umbrella fa-2x"></i>
            </Weather>
            {like ? (
              <Like onClick={likeClick}>
                <i class="fas fa-heart fa-2x"></i>
              </Like>
            ) : (
              <Like onClick={likeClick}>
                <i class="far fa-heart fa-2x"></i>
              </Like>
            )}
            <LikeCount>100</LikeCount>
          </RightBox>
        </Navcontainer>
        <Maincontent>
          <Picturecontainer>
            <Picture></Picture>
          </Picturecontainer>
          <Textcontainer>
            <Text>
              <Textarea>
                <Proplie1></Proplie1>
                <Message />
              </Textarea>
              <Commentsarea>
                <Comment1>
                  <Link to="/feeds">
                    <Proplie1></Proplie1>
                  </Link>
                  {/* 유저피드 링크 걸어주기 */}
                  <Comment>댓글asdfasdfsadfsadfasdfdasfsdf</Comment>
                </Comment1>
              </Commentsarea>
            </Text>
          </Textcontainer>
        </Maincontent>
      </Contentbox>
    </Container>
  );
};

export default ViewPost;
