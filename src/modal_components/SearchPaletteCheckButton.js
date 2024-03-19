import axios from 'axios';
import React, { useState, useRef } from 'react';
import Modal from 'react-modal';
import CopyToClipboard from 'react-copy-to-clipboard';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import TypographySVG from '../svg_components/TypographySVG.js';
import PatternSVG from '../svg_components/PatternSVG.js';
import PosterSVG from '../svg_components/PosterSVG.js';
import PptSVG from '../svg_components/PptSVG.js';
import WebSVG from '../svg_components/WebSVG.js';
import '../rgblind/rgblind.js';
import '../rgblind/rgblind.css';
import '../style_components/CheckButton.css';
import { checkColors } from '../color-checker.js';

/*overlay는 모달 창 바깥 부분
content는 모달 창부분*/
const modalStyle = {
    overlay: {
        backgroundColor: "rgba(0, 0, 0, 0.4)",
        width: "100%",
        height: "100vh",
        zIndex: "10",
        position: "fixed",
        top: "0",
        left: "0",
      },
      content: {
        width: "1200px",
        height: "530px",
        zIndex: "150",
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        borderRadius: "10px",
        backgroundColor: "white",
        justifyContent: "center",
        overflow: "auto",
      },
};

function SearchPaletteCheckButton({hexColors}){
    const [modalOpen, setModalOpen] = useState(false); //로그인 여부 묻는 모달창 open
    const [selectedBoxIndex, setSelectedBoxIndex] = useState(null);
    const [imgUrl, setImgUrl] = useState('');
    const [randomColors, setRandomColors]=useState([...hexColors]);
    const [newcontrastRatios, setNewContrastRatios] = useState([]);
    const ref = useRef(null);
    const [selectedOption, setSelectedOption] = useState(null);

    const openModal=()=>{
        setModalOpen(true);
        changePaletteToImage();
        setRandomColors(hexColors.slice(0, 5));
    };

    const closeModal=()=>{
        setModalOpen(false);
        setRandomColors([]);
    }

    //색상 랜덤 적용
    const shuffleColors = (colors) => {
      return colors.slice().sort(() => Math.random() - 0.5);
    };

    const handleRadomColorBt=()=>{
      const newRandomColors=shuffleColors([...hexColors]);
      setRandomColors(newRandomColors);
    }

    //팔레트 이미지화 API 연결
    const changePaletteToImage=()=>{
      axios
        .post('https://port-0-color-train-server-am952nlsu6unuj.sel5.cloudtype.app/api/palettes/checkPalette',{palette:hexColors})
        .then((response)=>{
          setImgUrl(response.data.imgUrl);
        })
        .catch((error)=>{
          console.error('Error: ',error);
        });
    };

    const handleButtonClick = (option) => {
      setSelectedOption(option);
  };


    const handlePaletteColorClick = (index) => {
      const selectedForeground = hexColors[index];
      const contrastRatios = hexColors
        .filter((_, i) => i !== index)
        .map((background) => {
          let contrastValue;
          checkColors(selectedForeground, background, (result) => {
            contrastValue = result.contrast;
            console.log('Contrast Ratios:', result);
          });
          return contrastValue;
        });
      console.log(contrastRatios);
      setNewContrastRatios(contrastRatios);
      setSelectedBoxIndex(index); // 선택한 칸의 인덱스 설정
    };

    return(
        
        <div className="modalcheckList">
          <button className="checkbutton" onClick={openModal}>점검</button>
        
        <Modal
            isOpen={modalOpen}
            onRequestClose={()=>setModalOpen(false)}
            style={modalStyle}
            artaHideApp={false}
            contentLabel="check"
            shouldCloseOnOverlayClick={false}
        >
          {/*모달창 닫기 버튼*/}
          <button className="closebutton" onClick={closeModal}>X</button>


          <div className="modal-check">
            {/*생성한 컬러 팔레트 받아오기*/}
            <div className="checkButton-palette-container">
              {hexColors.map((color, index)=>(
                <div
                  className="checkButton-palette-color"
                  key={index}
                  style={{ backgroundColor: color }}
                ></div>

              ))}   
            </div>
            <div className="checkButton-palette-codes">
              {hexColors.map((color, index)=>(
                <div
                  key={index}
                  className="checkButton-palette-Code">
                  <CopyToClipboard text={color}  onCopy={() => alert("색상 코드가 복사되었습니다.")}>
                    <text className="ColorCodeText-on-check">
                      {color}
                    </text>
                  </CopyToClipboard>
                </div>
              ))}
            </div>
            <Tabs>
              <TabList>
                <Tab>색상 적용 예시</Tab>
                <Tab>색각이상자가 보는 팔레트</Tab>
                <Tab>고대비 점검</Tab>
              </TabList>

              <TabPanel>
                {/*색상 적용 예시*/}
                <div className="color-example">
                <div className="examples">
                    <button
                      className={`color-example-button${selectedOption === "typography" ? ' selected' : ''}`}
                      onClick={() => handleButtonClick("typography")}
                    >
                      타이포그래피
                    </button>
                    <button
                      className={`color-example-button${selectedOption === "pattern" ? ' selected' : ''}`}
                      onClick={() => handleButtonClick("pattern")}
                    >
                      패턴
                    </button>
                    <button
                      className={`color-example-button${selectedOption === "poster" ? ' selected' : ''}`}
                      onClick={() => handleButtonClick("poster")}
                    >
                      포스터
                    </button>
                    <button
                      className={`color-example-button${selectedOption === "ppt" ? ' selected' : ''}`}
                      onClick={() => handleButtonClick("ppt")}
                    >
                      피피티
                    </button>
                    <button
                      className={`color-example-button${selectedOption === "web" ? ' selected' : ''}`}
                      onClick={() => handleButtonClick("web")}
                    >
                      웹사이트
                    </button>
                  </div>
                  <div>
                    {selectedOption === "typography" && (
                      <div className="example-part">
                        <TypographySVG hexColors={randomColors} />
                        <div className="random-button-part">
                          <button className="random-button" onClick={handleRadomColorBt}>색상 랜덤 적용</button>
                          <div className="random-button-explain">버튼을 누르면 색상을 랜덤으로 지정할 수 있습니다.</div>
                        </div>
                      </div>
                    )}
                    {selectedOption === "pattern" && (
                      <div className="example-part">
                        <PatternSVG hexColors={randomColors} />
                        <div className="random-button-part">
                          <button className="random-button" onClick={handleRadomColorBt}>색상 랜덤 적용</button>
                          <div className="random-button-explain">버튼을 누르면 색상을 랜덤으로 지정할 수 있습니다.</div>
                        </div>
                      </div>
                    )}
                    {selectedOption === "poster" && (
                      <div className="example-part">
                        <PosterSVG hexColors={randomColors} />
                        <div className="random-button-part">
                          <button className="random-button" onClick={handleRadomColorBt}>색상 랜덤 적용</button>
                          <div className="random-button-explain">버튼을 누르면 색상을 랜덤으로 지정할 수 있습니다.</div>
                        </div>
                      </div>
                    )}
                     {selectedOption === "ppt" && (
                      <div className="example-part">
                        <PptSVG hexColors={randomColors} />
                        <div className="random-button-part">
                          <button className="random-button" onClick={handleRadomColorBt}>색상 랜덤 적용</button>
                          <div className="random-button-explain">버튼을 누르면 색상을 랜덤으로 지정할 수 있습니다.</div>
                        </div>
                      </div>
                    )}
                    {selectedOption === "web" && (
                      <div className="example-part">
                        <WebSVG hexColors={randomColors} />
                        <div className="random-button-part">
                          <button className="random-button" onClick={handleRadomColorBt}>색상 랜덤 적용</button>
                          <div className="random-button-explain">버튼을 누르면 색상을 랜덤으로 지정할 수 있습니다.</div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </TabPanel>

              <TabPanel>
                {/*색각이상자가 보는 컬러팔레트-이미지화해서 필터 적용*/}
                <div className="rgblind">
                  <div className="protanopia-part">
                    <div className="rgblind-title">적록색맹</div>
                    {imgUrl && <img src={imgUrl} className="protanopia" alt="적록색맹" />}
                  </div>
                  <div className="tritanopia-part">
                    <div className="rgblind-title">청황색맹</div>
                    {imgUrl && <img src={imgUrl}  className="tritanopia" alt="청황색맹" />}
                  </div>
                </div>
              </TabPanel>

              <TabPanel>
                {/*고대비 점검-칸 하나씩 선택하는 팔레트 생성 후 고대비 점검 수식 적용*/}
                <div className="color-contrast">
                  <div className="question">
                    <img src="/question.png" alt="설명" width="2.5%" height="2.5%" />
                    <div className="question-Explain">
                      <div className="question-explain-title">
                        웹 접근성이란? 
                      </div>
                      <div className="question-explain-part">
                        장애인이나 고령자분들이 웹 사이트에서 제공하는 정보를
                        비장애인과 동등하게 접근하고 이용 할 수 있도록 보장하는 것
                      </div>
                      <div className="question-explain-title">
                        WCAG AA란?
                      </div>
                      <div className="question-explain-part">
                        WCAG는 웹 콘텐츠 접근성 지침으로 장애가 있는 사용자
                        웹 콘텐츠에 더 쉽게 접근할 수 있도록 하는 국제 표준입니다. 
                        배경색과 글자색의 명암비가 4.5 이상이 되면 WCAG의 AA기준을 충족합니다. 
                      </div>
                      <div className="question-explain-title">
                        사용법
                      </div>
                      <div className="question-explain-part">
                       선택한 색이 글자색, 나머지 4개의 색이 배경색이 되어 4개의 명암비를 계산합니다. 
                       배경색과 글자색의 명암비가 WCAG의 AA기준을 충족하면 초록색으로 출력합니다.
                      </div>
                    </div>
                  </div>
                  <div className="contrast-palette-container">
                    {hexColors.map((hexColor, index) => (
                      <div
                        className={`contrast-palette-color${selectedBoxIndex === index ? ' selected' : ''}`}
                        onClick={() => handlePaletteColorClick(index)}
                        style={{ backgroundColor: hexColor }}
                        key={index}
                      ></div>
                    ))}
                  </div>
                  <div className="contrastRatios-part">
                    {newcontrastRatios.map((ratio, index) => (
                      <div key={index} className="contrastRatio"  style={{ color: ratio >= 4.5 ? '#0cae00': 'black' }}>
                        {ratio}
                      </div>
                    ))}
                  </div>    
                </div>
              </TabPanel>
            </Tabs>

          </div>  
        </Modal>

      </div>
    );

}

export default SearchPaletteCheckButton;