/*팔레트 점검*/
import axios from 'axios';
import React, { useState, useRef, useEffect } from "react";
import ColorPicker from './ColorPicker';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import TypographySVG from '../svg_components/TypographySVG.js';
import PatternSVG from '../svg_components/PatternSVG.js';
import '../style_components/Check.css';

export default function Check() {
    const [listColor, setListColor] = useState([1, 2, 3, 4, 5]);
    const [selectedBoxIndex, setSelectedBoxIndex] = useState(null);
    const [imgUrl, setImgUrl] = useState('');
    const [randomColors, setRandomColors]=useState([...listColor]);
    const [checklistVisible, setChecklistVisible] = useState(false);
    const ref = useRef(null);
  
    //컬러픽커, 팔레트 구성
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
    const handleColorChange = (color) => {
      if (selectedBoxIndex !== null) {
        const updatedListColor = [...listColor];
        updatedListColor[selectedBoxIndex] = color;
        setListColor(updatedListColor);
      }
    };
    useEffect(() => {
      const handleOutsideClick = (event) => {
        handleToggleClasslistRef(ref);
        setSelectedBoxIndex(null); 
      };
      const element = document.getElementById("check-palette-wrapper");
      element.addEventListener("click", handleOutsideClick);
      return () => {
        element.removeEventListener("click", handleOutsideClick);
      };
    }, []);

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
        .post('http://localhost:5000/api/palettes/checkPalette',{palette:listColor})
        .then((response)=>{
          setImgUrl(response.data.imgUrl);
        })
        .catch((error)=>{
          console.error('Error: ',error);
        });
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
    }


    return (
      <div className="check-container">
        <div className="colorpicker-palette-button">
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
          <div className="check-button-part">
            <button className="check-button" onClick={handleCheckingList}>
            점검
            </button>
          </div>
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
                  <div>
                    <TypographySVG  hexColors={randomColors} />
                    <PatternSVG hexColors={randomColors}  />
                  </div>
                  <div>
                    <button className="color-random-button" onClick={handleRadomColorBt}>색상 랜덤 적용</button>
                  </div>
                </div>
              </TabPanel>

              <TabPanel>
                {/*색각이상자가 보는 컬러팔레트-이미지화해서 필터 적용*/}
                <div className="rgblind">
                  <div>
                    적록색맹
                    {imgUrl && <img src={imgUrl} className="protanopia" alt="적록색맹" />}
                  </div>
                  <div>
                    청황색맹
                    {imgUrl && <img src={imgUrl}  className="tritanopia" alt="청황색맹" />}
                  </div>
                </div>
              </TabPanel>

              <TabPanel>
                {/*고대비 점검-칸 하나씩 선택하는 팔레트 생성 후 고대비 점검 수식 적용*/}
                <div className="color-contrast">
                  <div className="contrast-palette-container">
                    {listColor.map((color, index)=>(
                      <div
                        className={'contrast-palette-color'}
                        onClick={(event) => {
                          handleToggleClasslistRef(ref);
                          event.stopPropagation();
                          ref.current = event.target;
                          setSelectedBoxIndex(index);
                          handleToggleClasslistRef(ref);
                        }}
                        style={{ backgroundColor: color }}
                      ></div>
                    ))}
                  </div>    
                </div>
              </TabPanel>
            </Tabs>

            <button className="reset" onClick={closeCheckList}>
              팔레트 초기화
            </button>
          </div>
        )}
      </div>
      
    );
  }