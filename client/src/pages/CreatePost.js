import { useRef, useEffect, useState } from "react";
import styled from "styled-components";

// 다이어리 전체 컨테이너 (좌측 Tool, 중앙 Canvas, 우측 Writing)
const DiaryContainer = styled.div`
  width: 1200px;
  height: 700px;
  background: #fff8d6;
  display: flex;
  margin: 70px auto;
  /* justify-content: center;
  align-items: center; */
`;

// 좌측 그림판 캔버스 컨테이너

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
  font-family: 'roboto';
  font-weight: bold;

  div.save_btn {
    display: flex;
    margin: 10px;
    width: 80px;
    height: 50px;
    background: #FFF1AD;
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

  input.input-style {
    border-radius: 30px;
    border: none;
    font-family: "Gaegu";
    font-size: 30px;
    padding: 0;
    width: 290px;
    height: 490px;
    outline: none;
  }
`;

const CanvasContainer = styled.div`
  width: 626px;
  height: 650px;
  /* border: 1px solid; */
  margin: auto;
  
  // html 속성이라 styled
  canvas {
    background-color: #fff;
    border-radius: 30px;
    display: flex;
    cursor: pointer;
  }
`;

const DrawingTool = styled.div`
  
  div.controls_range {
    font-size: 0.9em;
    color: #666;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }


  div.controls_btns {
    display: flex;
    justify-content: center;
  }

  // button css reset
  div.controls_btns button {
    margin: 1.2rem 0.2rem 0.5rem;
    padding: 0.3rem 0.6rem;
    border: 1px solid #ccc;
    background: #fff;s
    border-radius: 4px;
  }

  div.controls_btns button.active {
    border: 1px solid #999;
    box-shadow: 0 0 4px 0 rgba(0, 0, 0, 0.2);
  }
  
  // 색상 버튼 컨테이너
  ul {
    /* margin: 1rem; */
    /* display: flex; */
    /* justify-content: center; */
  }
  
  // 색상 버튼
  li {
    list-style: none;
    width: 2.5rem;
    height: 2.5rem;
    margin: 0 0.2rem;
    border-radius: 50%;
    cursor: pointer;
  }
`;

const CreatePost = ({ DrawingHandler, SaveDrawingHandler, drawingImg }) => {
  const canvasRef = useRef(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [isFillMode, setIsFillMode] = useState(false);
  const [lineWidth, setLineWidth] = useState(7.5);
  let previousImg = drawingImg;

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
      // previousImg = 'https://geutda-cors.herokuapp.com/' + drawingImg;
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

  return (
      <DiaryContainer>
      <DrawingTool>
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
            <button onClick={fillWhiteHandler}>Clear</button>
            <button
              onClick={fillModeHandler}
              className={!isFillMode ? "active" : ""}
              data-mode="paint"
            >
              Paint
            </button>
            <button
              onClick={fillModeHandler}
              className={isFillMode ? "active" : ""}
              data-mode="fill"
            >
              Fill
            </button>
            <button onClick={SaveImgHandler}>Save</button>
          </div>
        </div>
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
            <div className="save_btn">저장</div>
          </SaveContainer>
          <WeatherContainer>
            <div className="weathers">
            <i class="fas fa-sun fa-2x"></i>
            </div>
            <div className="weathers">
              <i class="fa-solid fa-cloud fa-2x"></i>
            </div>

            <div className="weathers"><i class="fas fa-umbrella fa-2x"></i></div>
            <div className="weathers"><i class="fas fa-snowflake fa-2x"></i></div>
          </WeatherContainer>
          <LetterContainer>
            <input className="input-style" type="text"></input>
          </LetterContainer>
        </WritingContainer>
      </DiaryContainer>
  );
};

export default CreatePost;
