/*1색 커스텀 컬러픽커, 팔레트*/

  import axios from 'axios';
  import React, { useState, useEffect } from "react";
  import SaveButton from '../modal_components/SaveButton';
  import ColorPicker from './ColorPicker';
  import CreatePaletteCheckButton from '../modal_components/CreatePaletteCheckButton';
  import '../style_components/OneColorCustom.css';
  
  export default function OneColorCustom() {
    const[currentColor, setCurrentColor] =useState("#fff")
    const [createdColors, setCreatedColors] = useState([]);
  
    const handleColorChange = (color) => {
      setCurrentColor(color);
    };
  
      /*옵션 버튼과 선택 event*/
      const [selectedOption, setSelectedOption] = useState('');
      const handleOptionChange = (event) => {
        setSelectedOption(event.target.value);
      };
  
      const createPalette = () => {
    
        if (currentColor && selectedOption) {
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
      createPalette();
    }, [currentColor, selectedOption]);
  
  
      return (
        <div className="container">
          <div className="colorpicker-option">
            <ColorPicker color={currentColor} onColorChange={handleColorChange} />
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
              <div className="image-palette-divider"></div>
          </div> 

          <div className="color-palettes">
          {createdColors.map((color, index) => (
            <div key={index} className="color-palette" 
              style={{
                backgroundColor: color
              }}></div>
          ))}
        </div>

        <div className="button-one">
          <SaveButton hexColors={createdColors} />
          <CreatePaletteCheckButton hexColors={createdColors} />
          </div>
        </div>
      );
    }