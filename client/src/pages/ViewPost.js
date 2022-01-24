import React from "react";
import styled from "styled-components";

export const Container= styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  align-items: center;
  flex-direction: column; // 글 위치
`;
export const Navcontainer = styled.div`
  display: flex;
  width: 100%;
  height : 120px;
  align-items: center;
`
export const Maincontent = styled.div`
  display: flex;
  width: 1240px;
  height : 700px;
  padding-top: 30px;
  flex-direction: row;
`
export const Picturecontainer = styled.div`
display: flex;
`
export const Picture = styled.div`
width: 900px;
height: 670px;
background-color: white;
border-radius: 30px;
align-items: center;
`
export const Textcontainer = styled.div`
display: flex;
padding-left = 30px;
margin:20px;
align-items: center;
transform: translate(3%, -2.3%)
`
export const Text = styled.div`
  border-radius: 30px;
  display: flex;
  width: 320px;
  height: 670px;
  background-color: #fcfcf7;
  flex-direction: column;
`

export const Proplie = styled.div`
  display: flex;
  border-radius: 100%;
  background-color: white;
  width: 100px;
  height: 100px;
`
export const Textarea = styled.div`
  padding-top : 30px;
  padding-left : 15px;
  padding-bottom : 20px;
  display: flex;
  flex-direction: row;
`
export const Proplie1 = styled.div`
  display: flex;
  border-radius: 100%;
  background-color: green;
  width: 50px;
  height: 50px;
`
export const Message = styled.div`
  display: flex;
  margin-left: 13px;
  padding-left: 10px;
  border-radius: 10%;
  background-color: #fff8d6;
  align-items: center;
  width: 210px;
  height: 70px;
  transform: translate(0%, -15%)
`
export const Comment = styled.div`
  display: flex;
  word-break:break-all;
  word-wrap:break-word;
  grid-template-columns: repeat(1, 150px); 
  margin-left: 13px;
  padding-left: 10px;
  border-radius: 10%;
  align-items: center;
  width: 210px;
  height: 70px;
  transform: translate(0%, -15%)
`
export const Comment1 = styled.div`
display: flex;
margin-top: 13px;
`
export const Commentsarea = styled.div`
      flex-direction: column;
      display: flex;
      margin-left: 10px;
      width: 320px;
      border_radius: 30%;
		  height: 500px;
      padding-left: 5px;
		  overflow: scroll;
      &::-webkit-scrollbar-thumb{
      }
      &::-webkit-scrollbar {
        height: 5px;
    }
    &::-webkit-scrollbar-track {
      height:10px;
      border_radius: 50%;
    }
`;

export const Namecontainer = styled.div`
  display: flex;
  padding-left : 40px;
  align-items: center;
  font-size: 1.8rem;
  width: 650px;
  height: 100px;
`

export const Contentbox = styled.div`
  box-sizing: border-box;
  width: 1320px;
  height: 900px;
  background: #FFF8D6;
  padding: 30px 10px 100px 40px; //글자위치
  border-radius: 30px;
  align-items: stretch;
  margin: 100px;
  margin-top: 150px; 
  border: 1px solid rgba(0, 0, 0, 0);
  overflow: hidden;
  transform: translate(10%, -10%)
  flex-direction: row;
`;

const ViewPostPage = () => {
  return(
  <Container>
    <Contentbox>
      <Navcontainer>
        <Proplie></Proplie>
        <Namecontainer>Crayon</Namecontainer>
      </Navcontainer>
      <Maincontent>
        <Picturecontainer>
        <Picture></Picture>
        </Picturecontainer>
        <Textcontainer>
        <Text>
          <Textarea >
          <Proplie1></Proplie1>
          <Message>Type something...</Message>
          </Textarea>
          <Commentsarea>
          <Comment1>
          <Proplie1></Proplie1>
          <Comment>댓글asdfasdfsadfsadfasdfdasfsdf</Comment>
          </Comment1>
          </Commentsarea>
        </Text>
        </Textcontainer>
      </Maincontent>
    </Contentbox>
  </Container>
  )
};

export default ViewPostPage;
