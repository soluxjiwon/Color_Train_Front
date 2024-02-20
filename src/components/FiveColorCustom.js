/*5색 커스텀 컬러픽커, 팔레트*/
/*저장, 점검 컴포넌트 추가해야 함*/

import React, { useState, useRef, useEffect } from "react";
import ColorPicker from './ColorPicker'
import SaveButton from '../modal_components/SaveButton';
import CreatePaletteCheckButton from '../modal_components/CreatePaletteCheckButton';
import '../style_components/FiveColorCustom.css';

export default function FiveColorCustom() {
    const [listColor, setListColor] = useState([1, 2, 3, 4, 5]);
    const [selectedBoxIndex, setSelectedBoxIndex] = useState(null);
    const ref = useRef(null);
  
    //선택한 칸 테두리 추가
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
  
    //색상 변경
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
      
      const element = document.getElementById("wrapper");
        element.addEventListener("click", handleOutsideClick);
        return () => {
          element.removeEventListener("click", handleOutsideClick);
        };
    }, []);
  
    return (
      <div className="container">
        <div className="fiveColorpickerPart">
          <div className="fivecolorpicker">
            <ColorPicker onColorChange={handleColorChange} />
          </div>
        </div>
        
        <div className="colorpicker-palette-divider"></div>
    
        <div className="fivePalette-bts">
          <div className="fiveColor-Explain">
            칸을 선택한 후 컬러픽커에서 색을 선택하면 색상이 적용됩니다.
          </div>
          <div id="wrapper">
            {listColor.map((item, index) => {
              return (
                <div className="palette-color-wrapper">
                  <div
                    className="palette-color"
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

          <div className="button-five">
            <div className="FiveColorSaveBt">
              <SaveButton  hexColors={listColor} />
            </div>
            <div className="FiveColorCheckBt">
              <CreatePaletteCheckButton hexColors={listColor}/>
            </div>
          </div>
        </div>
      </div>
    );
  }