import { useRef, useEffect, useState } from "react";
// import { useNavigate, useLocation } from 'react-router-dom';
import styled from "styled-components";
// import S3 from 'react-aws-s3';
// import { v4 as uuidv4 } from 'uuid';
// import axios from 'axios';
// import dotenv from 'dotenv';

// dotenv.config();

// 다이어리 전체 컨테이너 (좌측 Tool, 중앙 Canvas, 우측 Writing)
const DiaryContainer = styled.div`
  width: 1200px;
  height: 700px;
  background: #fff8d6;
  display: flex;
  margin: 70px auto;
  border-radius: 20px;
`;

// 우측 전체 컨테이너
const WritingContainer = styled.div`
  width: 300px;
  height: 650px;
  margin: auto;
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

// 저장 버튼 컨테이너
const SaveContainer = styled.div`
  display: flex;
  justify-content: end;
  font-family: "roboto";
  font-weight: bold;

  div.save_btn {
    display: flex;
    margin: 10px;
    width: 80px;
    height: 50px;
    background: #fff1ad;
    border-radius: 10px;
    /* margin: 0 30px 70px; */
    // 글씨 위치 중앙 설정
    justify-content: center;
    align-items: center;
  }
`;

// 날씨 선택 컨테이너
const WeatherContainer = styled.div`
  width: 290px;
  height: 120px;
  /* margin-top: auto; */
  display: flex;
  background: white;
  border-radius: 20px;

  div.weathers {
    width: 30px;
    height: 30px;
    margin: auto;
    color: #616161;
  }
`;

// 글 작성 컨테이너
const LetterContainer = styled.div`
  /* width: 290px;
  height: 550px; */
  /* font-size: 30px; */
  /* margin: auto; */

  textarea.text-style {
    border-radius: 30px;
    border: none;
    font-family: "Gaegu";
    font-size: 30px;
    padding: 10px 15px 10px;
    width: 260px;
    height: 470px;
    outline: none;
    resize: none;
    background-attachment: local;
    background-image: linear-gradient(to right, white 10px, transparent 10px),
      linear-gradient(to left, white 10px, transparent 10px),
      repeating-linear-gradient(
        white,
        white 55px,
        #ccc 40px,
        #ccc 41px,
        white 56px
      );
    line-height: 55px;
  }
`;

const CanvasContainer = styled.div`
  width: 576px;
  height: 650px;
  /* border: 1px solid; */
  margin: auto;
  margin-left: 0;

  // html 속성이라 styled
  canvas {
    background-color: #fff;
    border-radius: 30px;
    display: flex;
    cursor: pointer;
  }
`;

const DrawingTool = styled.div`
  width: 150px;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 20px auto 40px;

  /* justify-content: center; */

  div.controls_range {
    font-size: 0.9em;
    color: #666;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    input[type="range"] {
      -webkit-appearance: none; /*기본 스타일을 사용할지 말지 정하기 */
      width: 100%;
      height: 5px;
      background: #ce724a; /*바 선색, transparent 로 설정하면 배경생이랑 동일해진다. == 투명 */
      border-radius: 10px;
    }

    input[type="range"]::-webkit-slider-thumb {
      -webkit-appearance: none; /*기본 스타일을 사용할지 말지 정하기 */
      height: 15px;
      width: 15px;
      border-radius: 50%;
      background-color: black;
    }
  }

  div.controls_btns {
    display: flex;
    flex-direction: row;
    margin: auto;
    gap: 30px;
    z-index: 1;
  }

  // button css reset
  div.controls_btns div {
    color: #616161;
    display: flex;
    margin: auto;

    /* justify-content: center; */
  }

  // 색상 버튼 컨테이너
  ul {
    display: grid;
    grid-template-columns: repeat(2, 60px);
    gap: 15px;
    padding: 0;
  }

  // 색상 버튼
  li {
    list-style: none;
    width: 4rem;
    height: 4rem;
    margin: auto;
    border-radius: 50%;
    cursor: pointer;
  }
`;

const CreatePost = ({ DrawingHandler, SaveDrawingHandler, picture }) => {
  const canvasRef = useRef(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [isFillMode, setIsFillMode] = useState(false);
  const [lineWidth, setLineWidth] = useState(7.5);

  let previousImg = picture;

  const image = new Image();
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    image.setAttribute("crossOrigin", "*");
    image.src = previousImg;
    image.onload = () => {
      ctx.drawImage(image, 0, 0);
    };
    image.onerror = () => {
      // previousImg = 'https://geutda-cors.herokuapp.com/' + picture;
      image.src = previousImg;
      image.onload = () => {
        ctx.drawImage(image, 0, 0);
      };
    };

    // first draw
    ctx.strokeStyle = "#2c2c2c";
    ctx.lineWidth = 7.5;
    ctx.fillStyle = "#fff";
    ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
  }, []);

  // Draw start
  function initDraw({ nativeEvent }) {
    setIsDrawing(true);

    const ctx = canvasRef.current.getContext("2d");

    const { offsetX, offsetY } = nativeEvent;

    ctx.beginPath();
    ctx.moveTo(offsetX, offsetY);
  }

  // Draw 이벤트
  function draw({ nativeEvent }) {
    if (!isDrawing) {
      return;
    }

    const ctx = canvasRef.current.getContext("2d");

    const { offsetX, offsetY } = nativeEvent;

    ctx.lineTo(offsetX, offsetY);
    ctx.stroke();
  }

  // finish 이벤트
  function finishDraw() {
    setIsDrawing(false);
  }

  // color 변경 함수
  function handleColorClick({ nativeEvent }) {
    const ctx = canvasRef.current.getContext("2d");
    if (!isFillMode) {
      // fill모드 false일때 선 선색 변경
      ctx.strokeStyle = nativeEvent.target.style.backgroundColor;
    } else {
      // fill모드일때 색상 선택시 해당 색상으로 배경색 채우고 paint 모드로 변경
      ctx.globalCompositeOperation = "multiply";
      ctx.fillStyle = nativeEvent.target.style.backgroundColor;
      ctx.fillRect(0, 0, canvasRef.current.width, canvasRef.current.height);
      setIsFillMode(!isFillMode);
      ctx.globalCompositeOperation = "source-over";
    }
  }
  // lineWidth 변경 함수
  const handleRangeChange = ({ nativeEvent }) => {
    const ctx = canvasRef.current.getContext("2d");
    const size = nativeEvent.target.value;
    ctx.lineWidth = size;
    setLineWidth(size);
  };

  // 캔버스 Clear
  function fillWhiteHandler(event) {
    const ctx = canvasRef.current.getContext("2d");
    //클릭시 fillStyle을 white로 바꾸고
    ctx.fillStyle = "white";
    ctx.fillRect(0, 0, canvasRef.current.width, canvasRef.current.height);
    //fillRect(x축좌표, y축좌표, width, height)
  }

  // Fill, Paint 모드 변경 함수
  function fillModeHandler(event) {
    // fill 버튼 클릭시 fill 모드 true로 변경 (여러번 클릭해도 동일)
    if (event.target.dataset.mode === "fill") {
      setIsFillMode(true);
    }
    // paint 버튼 클릭시 fill 모드 false로 변경 (여러번 클릭해도 동일)
    else if (event.target.dataset.mode === "paint") {
      setIsFillMode(false);
    }
  }

  // 그림 저장 함수
  const SaveImgHandler = (event) => {
    //base64문자열로 받은 이미지
    const image = canvasRef.current.toDataURL();
    SaveDrawingHandler(image);
    DrawingHandler();
  };

  // 날씨 변경 탭
  // const [diaryInfo, setDiaryInfo] = useState([]);
  // const [pictureContent, setPictureContent] = useState(diaryInfo.drawing);
  // const [originPic, setOriginPic] = useState('');
  // const [weatherTap, setWeatherTap] = useState(0);
  // const [content, setContent] = useState('');
  // const [isLoading, setisLoading] = useState(true);
  // const [isDelete, setIsDelete] = useState(false);

  // const history = useNavigate();
  // const location = useLocation();

  // const s3config = {
  //   bucketName: process.env.REACT_APP_BUCKET_NAME,
  //   region: process.env.REACT_APP_REGION,
  //   accessKeyId: process.env.REACT_APP_ACCESS_ID,
  //   secretAccessKey: process.env.REACT_APP_ACCESS_KEY,
  // };
  // const ReactS3Client = new S3(s3config);

  // useEffect(() => {
  //   if (location.state._id) {
  //     axios
  //       .get('http://ec2-3-38-36-59.ap-northeast-2.compute.amazonaws.com:3000/api/contents', {
  //         ...config,
  //         params: { _id: location.state._id },
  //       })
  //       .then((res) => {
  //         // api 참고해서 수정하기
  //         setDiaryInfo(res.data);
  //         setPictureContent(res.data.drawing);
  //         setOriginPic(res.data.drawing);
  //         setWeatherTap(res.data.weather);
  //         setContent(res.data.text);
  //         setisLoading(false);
  //       })
  //       .catch((err) => {
  //         console.log(err);
  //         setisLoading(false);
  //       });
  //   }
  // }, []);

  return (
    <DiaryContainer>
      <DrawingTool>
        {/* 컬러 팔레트 */}
        <ul>
          <li
            style={{ backgroundColor: "#ffffff", border: "1px solid #ccc" }}
            onClick={handleColorClick}
          />
          <li
            style={{ backgroundColor: "#fffafa" }}
            onClick={handleColorClick}
          />
          <li
            style={{ backgroundColor: "#2c2c2c" }}
            onClick={handleColorClick}
          />
          <li
            style={{ backgroundColor: "#FAEBD7" }}
            onClick={handleColorClick}
          />
          <li
            style={{ backgroundColor: "#a52a2a" }}
            onClick={handleColorClick}
          />
          <li
            style={{ backgroundColor: "#d26c6c" }}
            onClick={handleColorClick}
          />
          <li
            style={{ backgroundColor: "#d2691e" }}
            onClick={handleColorClick}
          />
          <li
            style={{ backgroundColor: "#ffbb00" }}
            onClick={handleColorClick}
          />
          <li
            style={{ backgroundColor: "#8fbc8f" }}
            onClick={handleColorClick}
          />
          <li
            style={{ backgroundColor: "#339933" }}
            onClick={handleColorClick}
          />
          <li
            style={{ backgroundColor: "#b7e2fc" }}
            onClick={handleColorClick}
          />
          <li
            style={{ backgroundColor: "#4682b4" }}
            onClick={handleColorClick}
          />
          <li
            style={{ backgroundColor: "#f2f2fc" }}
            onClick={handleColorClick}
          />
          <li
            style={{ backgroundColor: "#c37fcc" }}
            onClick={handleColorClick}
          />
        </ul>
        <div className="controls">
          <div className="controls_range">
            <input
              type="range"
              min="0.1"
              max="15"
              value={lineWidth}
              step="0.1"
              onChange={handleRangeChange}
            />
            <div>{lineWidth}</div>
          </div>
          <div className="controls_btns">
            <div
              onClick={fillModeHandler}
              className={!isFillMode ? "active" : ""}
            >
              <i class="fas fa-paint-brush fa-3x" data-mode="paint"></i>
            </div>
            <div
              onClick={fillModeHandler}
              className={isFillMode ? "active" : ""}
            >
              <i class="fas fa-fill-drip fa-3x" data-mode="fill"></i>
            </div>
          </div>
        </div>
      </DrawingTool>
      <CanvasContainer>
        <canvas
          ref={canvasRef}
          onMouseDown={initDraw}
          onMouseUp={finishDraw}
          onMouseMove={draw}
          onMouseLeave={finishDraw}
          width="626"
          height="650"
        />
      </CanvasContainer>

      <WritingContainer>
        <SaveContainer>
          <div className="save_btn" onClick={fillWhiteHandler}>
            새 그림
          </div>
          <div className="save_btn" onClick={SaveImgHandler}>
            저장
          </div>
        </SaveContainer>
        <WeatherContainer>
          <div className="weathers">
            <i class="fas fa-sun fa-2x"></i>
          </div>
          <div className="weathers">
            <i class="fa-solid fa-cloud fa-2x"></i>
          </div>

          <div className="weathers">
            <i class="fas fa-umbrella fa-2x"></i>
          </div>
          <div className="weathers">
            <i class="fas fa-snowflake fa-2x"></i>
          </div>
        </WeatherContainer>
        <LetterContainer>
          <textarea
            className="text-style"
            type="text"
            maxlength="100"
          ></textarea>
        </LetterContainer>
      </WritingContainer>
    </DiaryContainer>
  );
};

export default CreatePost;
