import React, { useState } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import FollowingModal from '../components/FollowingModal';

export const Contentbox = styled.div`
  box-sizing: border-box;
  width: 1320px;
  height: 100%;
  background: #fff8d6;
  padding: 20px 10px 100px 10px; //글자위치
  border-radius: 30px;
  align-items: stretch;
  margin: auto;
  border: 1px solid rgba(0, 0, 0, 0);
  overflow: hidden;
  // transform: translate(10%, -10%)
`;
export const Buttoncontainer = styled.div`
  justify-content: end;
  display: flex;
`;
export const Container1 = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 400px);
  gap: 20px 40px;
  margin: auto;
`;
export const Container2 = styled.div`
  display: flex;
  width: 150px;
  height: 500px;
  padding-top: 20px;
`;
export const Namecontainer = styled.div`
  display: flex;
  height: 100%;
  font-size: 2.4rem;
  padding: 20px 10px 100px 10px; //글자위치
  flex-direction: column;
`;
export const Loginsetcontainer = styled.div`
  display: flex;
  font-size: 1.2rem;
  padding-top: 20px;
`;
export const Textcontainer = styled.div`
  display: flex;
  font-size: 1.2rem;
  padding: 30px 300px 0px 30px;
  font-weight: 10; // 글씨 밝기
`;
export const Followcontainer = styled.div`
  margin: auto;
  padding-top: 25px;
  font-size: 1.2rem;
  display: flex;
  flex-direction: row;
  gap: 50px;
`;
export const Followercontainer = styled.div`
  flex-direction: column;
  display: flex;
  align-items: center; //글 위치
`;
export const Followingcontainer = styled.div`
  flex-direction: column;
  display: flex;
  align-items: center; //글 위치
`;
export const Followernumber = styled.div`
  display: flex;
  font-size: 1.8rem;
`;
export const Followingnumber = styled.div`
  display: flex;
  font-size: 1.8rem;
`;
export const Followertext = styled.div`
  display: flex;
`;
export const Followingtext = styled.div`
  display: flex;
`;

export const Writebutton = styled.button`
  margin: 10px;
  box-sizing: border-box;
  width: 100px;
  height: 50px;
  font-size: 16px;
  border: none;
  border-radius: 10px;
  background: #fff1ac;
  :hover {
    background: #ce724a;
    color: white;
    transition: background-color 0.5s;
  }
`;

export const Proplie1 = styled.div`
  display: flex;
  border-radius: 100%;
  background-color: white;
  width: 120px;
  height: 120px;
`;
export const Icon = styled.div`
  display: flex;
  padding: 5px;
`;

export const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  margin: 100px auto;
  flex-direction: column;
  align-items: stretch;
`;

export const Namebox = styled.main`
  box-sizing: border-box;
  width: 1320px;
  height: 280px;
  background: #fff8d6;
  padding: 50px 0px 100px 50px; //글자위치
  border-radius: 30px;
  border: 1px solid rgba(0, 0, 0, 0);
  overflow: hidden;
  display: flex;
  margin: auto;
  margin-bottom: 30px;
  // transform: translate(10%, 40%)
`;

export const Cardcontainer = styled.article`
  display: flex;
  flex-direction: column; // 글 위치
  border-radius: 20px; // 테두리 둥글게
  justify-content: center; // 글높이
  align-items: center; //글 위치
  box-sizing: border-box;
  border: ${(props) => (props.isContent ? 'none' : '0.063rem solid #e0dde1;')};
  width: 400px; // 박스 넓이
  height: 428px; // 박스 높이
  font-family: 'Gmarket Sans TTF';
  font-weight: 100; // 글씨 밝기
  font-size: 1rem;
  color: #2d2d2d;
  background-color: #fdfbfe;
  margin: ${(props) => (props.isContent ? '0 0 0.813rem 10px' : '4px 0 0.813rem 10px')};
  cursor: ${(props) => (props.isContent ? 'pointer' : 'Default')};
  @media screen and (max-width: 37.5rem) {
    width: 100%;
    font-size: 0.9rem;
  }
`;

// export const Followcontainer = styled.div`
// font-size: 1.2rem;
// display: flex;
// `
// export const Followercontainer= styled.div`
// display: flex;
// `
// export const Followingcontainer=styled.div`
// display: flex;
// `
// export const Followernumber=styled.div`
// display: flex;
// `
// export const Followingnumber=styled.div`
// display: flex;
// `
// export const Followertext=styled.div`
// display: flex;
// `
// export const Followingtext=styled.div`
// display: flex;
// `

const PostPage = () => {
  const [isOopen, setIsOpen] = useState(false);
  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  return (
    <Container>
      <Namebox>
        <Container2>
          <Proplie1></Proplie1>
        </Container2>
        <Namecontainer>
          <div>CrayonPop</div>
          <Loginsetcontainer>
            <Link to="/user/:userId">
              <div>로그인 계정 정보</div>
              {/* 에디트유저인포로 가는 링크 걸어주기 */}
            </Link>
            <Icon>
              <i class="fas fa-user-edit"></i>
            </Icon>
          </Loginsetcontainer>
        </Namecontainer>
        <Textcontainer>자유로운여행중...</Textcontainer>
        <Followcontainer onClick={openModal}>
          <Followercontainer>
            <Followernumber>100</Followernumber>
            <Followertext>팔로워</Followertext>
            {/* 팔로워 모달 링크 */}
          </Followercontainer>
          <Followingcontainer>
            <Followingnumber>100</Followingnumber>
            <Followingtext>팔로잉</Followingtext>
            {/* 팔로워 모달 링크 */}
          </Followingcontainer>
        </Followcontainer>
        {isOopen ? <FollowingModal isOpen={openModal} close={closeModal} /> : null}
      </Namebox>
      <Contentbox>
        <Buttoncontainer>
          <Link to="/post">
            <Writebutton>글쓰기</Writebutton>
          </Link>
          {/* createpost 링크 걸어주기 */}
        </Buttoncontainer>
        <Container1>
          <Link to="/post/:postId">
            <Cardcontainer>
              <div>게시글이 없습니다.</div>
              {/* 뷰포스트로 가지도록 링크 */}
            </Cardcontainer>
          </Link>
          <Link to="/post/:postId">
            <Cardcontainer>
              <div>게시글이 없습니다.</div>
              {/* 뷰포스트로 가지도록 링크 */}
            </Cardcontainer>
          </Link>
          <Link to="/post/:postId">
            <Cardcontainer>
              <div>게시글이 없습니다.</div>
              {/* 뷰포스트로 가지도록 링크 */}
            </Cardcontainer>
          </Link>
          <Link to="/post/:postId">
            <Cardcontainer>
              <div>게시글이 없습니다.</div>
              {/* 뷰포스트로 가지도록 링크 */}
            </Cardcontainer>
          </Link>
        </Container1>
      </Contentbox>
    </Container>
  );
};

export default PostPage;
