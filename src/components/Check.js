/*팔레트 점검*/
import axios from 'axios';
import React, { useState, useRef } from "react";
import ColorPicker from './ColorPicker';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import TypographySVG2 from '../svg_components/TypographySVG2.js';
import PatternSVG2 from '../svg_components/PatternSVG2.js';
import PosterSVG2 from '../svg_components/PosterSVG2.js';
import PptSVG2 from '../svg_components/PptSVG2.js';
import WebSVG2 from '../svg_components/WebSVG2.js';
import { checkColors } from '../color-checker.js';
import '../style_components/Check.css';

export default function Check() {
    const [listColor, setListColor] = useState([1, 2, 3, 4, 5]);
    const [selectedBoxIndex, setSelectedBoxIndex] = useState(null);
    const [imgUrl, setImgUrl] = useState('');
    const [randomColors, setRandomColors]=useState([...listColor]);
    const [checklistVisible, setChecklistVisible] = useState(false);
    const [newcontrastRatios, setNewContrastRatios] = useState([]);
    const [selectedOption, setSelectedOption] = useState(null);
    const ref = useRef(null);
  
    //팔레트 구성
    const handleToggleClasslistRef = (ref) => {
      if (!ref.current) {
        return;
      }
      if (!ref.current.classList.contains("big-border")) {
        ref.current.classList.add("big-border");
      } else {
        ref.current.classList.remove("big-border");
        ref.current = null;
      }
    };

    //컬러픽커
    const handleColorChange = (color) => {
      if (selectedBoxIndex !== null) {
        const updatedListColor = [...listColor];
        updatedListColor[selectedBoxIndex] = color;
        setListColor(updatedListColor);
      }
    };

    //점검사항 구성
    //색상 랜덤 적용
     const shuffleColors = (colors) => {
      return colors.slice().sort(() => Math.random() - 0.5);
    };
    const handleRadomColorBt=()=>{
      const newRandomColors=shuffleColors([...listColor]);
      setRandomColors(newRandomColors);
    }
    
    //팔레트 이미지화 API 연결
    const changePaletteToImage=()=>{
      axios
        .post('https://port-0-color-train-server-am952nlsu6unuj.sel5.cloudtype.app/api/palettes/checkPalette',{palette:listColor})
        .then((response)=>{
          setImgUrl(response.data.imgUrl);
        })
        .catch((error)=>{
          console.error('Error: ',error);
        });
    };

     //고대비
     const handlePaletteColorClick = (index) => {
      const selectedForeground =  listColor[index];
      const contrastRatios =  listColor
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

    //점검 버튼
    const handleCheckingList = () => {
      setChecklistVisible(true);
      changePaletteToImage();
      setRandomColors(listColor.slice(0, 5));
    };
    //팔레트 초기화 버튼
    const closeCheckList=()=>{
      setChecklistVisible(false);
      setRandomColors([]);
      setNewContrastRatios([]);
    }

    const handleButtonClick = (option) => {
      setSelectedOption(option);
  };

    return (
      <div className="check-container">
        <div className="colorpicker-palette-button">
          <div className="check-Explain">
              칸을 선택한 후 컬러픽커에서 색을 선택하면 색상이 적용됩니다.<br/>
              점검 기능은 저장 기능이 없습니다.
          </div>
          <div className="check-colorpicker">
          <ColorPicker onColorChange={handleColorChange} />
          </div>
          <div id="check-palette-wrapper">
            {listColor.map((item, index) => {
              return (
                <div className="check-palette-color-wrapper">
                  <div
                    className="check-palette-color"
                    onClick={(event) => {
                      handleToggleClasslistRef(ref);
                      event.stopPropagation();
                      ref.current = event.target;
                      setSelectedBoxIndex(index);
                      handleToggleClasslistRef(ref);
                    }}
                    style={{ backgroundColor: listColor[index] }}
                  ></div>
                </div>
              );
            })}
          </div>
            <button className="check-button" onClick={handleCheckingList}>
            점검
            </button>
        </div>
       
        {checklistVisible && (
          <div className="checklist">
            <Tabs>
              <TabList>
                <Tab>색상 적용 예시</Tab>
                <Tab>색각이상자가 보는 팔레트</Tab>
                <Tab>고대비 점검</Tab>
              </TabList>

              <TabPanel>
                {/*색상 적용 예시*/}
                <div className="color-example">
                  <div className="check-examples">
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
                      <div className="color-example-part1">
                        <TypographySVG2 hexColors={randomColors} />
                        <div className="color-random-button-part">
                          <button className="color-random-button" onClick={handleRadomColorBt}>색상 랜덤 적용</button>
                          <div className="color-random-button-explain">버튼을 누르면 색상을 랜덤으로 지정할 수 있습니다.</div>
                        </div>
                      </div>
                    )}
                    {selectedOption === "pattern" && (
                      <div className="color-example-part">
                        <PatternSVG2 hexColors={randomColors} />
                        <div className="color-random-button-part">
                          <button className="color-random-button" onClick={handleRadomColorBt}>색상 랜덤 적용</button>
                          <div className="color-random-button-explain">버튼을 누르면 색상을 랜덤으로 지정할 수 있습니다.</div>
                        </div>
                      </div>
                    )}
                    {selectedOption === "poster" && (
                      <div className="color-example-part">
                        <PosterSVG2 hexColors={randomColors} />
                        <div className="color-random-button-part">
                          <button className="color-random-button" onClick={handleRadomColorBt}>색상 랜덤 적용</button>
                          <div className="color-random-button-explain">버튼을 누르면 색상을 랜덤으로 지정할 수 있습니다.</div>
                        </div>
                      </div>
                    )}
                    {selectedOption === "ppt" && (
                      <div className="example-part">
                        <PptSVG2 hexColors={randomColors} />
                        <div className="random-button-part">
                          <button className="random-button" onClick={handleRadomColorBt}>색상 랜덤 적용</button>
                          <div className="random-button-explain">버튼을 누르면 색상을 랜덤으로 지정할 수 있습니다.</div>
                        </div>
                      </div>
                    )}
                    {selectedOption === "web" && (
                      <div className="example-part">
                        <WebSVG2 hexColors={randomColors} />
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
                <div className="check-rgblind">
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
                <div className="check-color-contrast">
                  <div className="check-question">
                    <img src="/question.png" alt="설명" width="3%" height="3%" />
                    <div className="check-question-Explain">
                      <div className="check-question-explain-title">
                        웹 접근성이란? 
                      </div>
                      <div className="check-question-explain-part">
                        장애인이나 고령자분들이 웹 사이트에서 제공하는 정보를 <br/>
                        비장애인과 동등하게 접근하고 이용 할 수 있도록 보장하는 것
                      </div>
                      <div className="check-question-explain-title">
                        WCAG AA란?
                      </div>
                      <div className="check-question-explain-part">
                        WCAG는 웹 콘텐츠 접근성 지침으로 장애가 있는 사용자가<br/>
                        웹 콘텐츠에 더 쉽게 접근할 수 있도록 하는 국제 표준입니다.<br/>
                        배경색과 글자색의 명암비가 4.5 이상이 되면 WCAG의 AA기준을 충족합니다. 
                      </div>
                      <div className="check-question-explain-title">
                        사용법
                      </div>
                      <div className="check-question-explain-part">
                       선택한 색이 글자색, 나머지 4개의 색이 배경색이 되어 4개의 명암비를 계산합니다<br/>
                       배경색과 글자색의 명암비가 WCAG의 AA기준을 충족하면 초록색으로 출력합니다.<br/>
                      </div>
                    </div>
                  </div>
                  <div className="check-contrast-palette-container">
                    {listColor.map((color, index)=>(
                      <div
                        className={`check-contrast-palette-color${selectedBoxIndex === index ? ' selected' : ''}`}
                        onClick={() => handlePaletteColorClick(index)}
                        style={{ backgroundColor: color }}
                        key={index}
                      ></div>
                    ))}
                  </div>
                  <div className="check-contrastRatios-part">
                    {newcontrastRatios.map((ratio, index) => (
                      <div key={index} className="check-contrastRatio" style={{ color: ratio >= 4.5 ? '#0cae00' : 'black' }}>
                       {ratio}
                      </div>
                    ))}
                  </div>
                </div>
              </TabPanel>
            </Tabs>

            <div className="reset-part">
              <button className="reset" onClick={closeCheckList}>점검사항 초기화</button>
              <div className="reset-Explain">점검 사항을 초기화 한 후 다른 팔레트를 점검해보세요</div>
            </div>

          </div>
        )}
      </div>
      
    );
  }