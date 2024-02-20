/*1색 커스텀 컬러픽커, 팔레트*/

  import axios from 'axios';
  import React, { useState, useEffect } from "react";
  import SaveButton from '../modal_components/SaveButton';
  import ColorPicker from './ColorPicker';
  import CreatePaletteCheckButton from '../modal_components/CreatePaletteCheckButton';
  import '../style_components/OneColorCustom.css';
  
  export default function OneColorCustom() {
    const[currentColor, setCurrentColor] =useState('')
    const [createdColors, setCreatedColors] = useState([]);
    const [selectedOption, setSelectedOption] = useState('');
  
    const handleColorChange = (color) => {
      setCurrentColor(color);
    };
  
    const handleOptionChange = (event) => {
      const option = event.target.value;
      if (currentColor) {
        setSelectedOption(option);
      } else {
        alert("색상을 선택한 후 옵션을 선택해주세요.");
      }
    };
    
  
    const createPalette = () => {
      if (currentColor && selectedOption){
        axios
          .post('http://localhost:5000/api/palettes/create-one',  {
            type: selectedOption,
            hexColor: currentColor 
          })
          .then((response) => {
            const { palette } = response.data;
            setCreatedColors(palette);
          })
          .catch((error) => {
            console.error('Error generating palette:', error);
          });
      }
    };

    useEffect(() => {
      if (currentColor && selectedOption) {
        createPalette(currentColor, selectedOption);
      }
    }, [currentColor, selectedOption]);
  
  
    return (
      <div className="container">
        <div className="colorpicker-option">
          <div className="colorpicker-part">
            <ColorPicker color={currentColor} onColorChange={handleColorChange} />
          </div>
          <div className="option">
            <label>
              <input
                type="radio"
                value="similar"
                checked={selectedOption === 'similar'}
                onChange={handleOptionChange}
              />
              유사색
            </label>
            <label>
              <input
                type="radio"
                value="mono"
                checked={selectedOption === 'mono'}
                onChange={handleOptionChange}
              />
              단색
            </label>
            <label>
              <input
                type="radio"
                value="complementary"
                checked={selectedOption === 'complementary'}
                onChange={handleOptionChange}
              />
              보색
            </label>
          </div>
          <div className="picker-palette-divider"></div>
        </div>

        
        <div className="OnePlatte-bts">
          <div className="OneColor-Explain">
            컬러픽커에서 색을 선택하고 원하는 조건을 선택하면 팔레트가 생성됩니다.
          </div>
          <div className="onecolor-palette-container">
            <div className="color-palettes">
              {createdColors && createdColors.map((color, index) => (
                <div key={index} className="color-palette" 
                  style={{backgroundColor: color}}
                ></div>
              ))}
            </div>
          </div>
          
          <div className="button-one">
            <div className="OneColorSaveBt">
              <SaveButton  hexColors={createdColors} />
            </div>
            <div className="OneColorCheckBt">
              <CreatePaletteCheckButton hexColors={createdColors}/>
            </div>
          </div>
        </div>
      </div>
      );
    }




