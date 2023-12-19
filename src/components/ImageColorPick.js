/*생성파트의 이미지 추출 컴포넌트
점검, 저장을 구성한 컴포넌트 필요-> 추천, 생성 모두 사용
추천에서는 컬러팔레트를 선택했을 때, 점검컴포넌트연결/생성에서는 버튼으로 구현*/

import React, { useState, useRef, useEffect } from "react";
import ColorThief from 'colorthief';
import SaveButton from '../modal_components/SaveButton';
import CreatePaletteCheckButton from '../modal_components/CreatePaletteCheckButton';
import '../style_components/ImageColorPick.css';

function ImageColorPick(){
  
    const inputRef = useRef(null);
    const [image,setImage] = useState("");
    const [colors, setColors] = useState([]);
    const [hexColors, setHexColors] = useState([]);
    const [selectedBoxIndex, setSelectedBoxIndex] = useState(null);
    const [error, setError] = useState('');
    const ref = useRef(null);

    //이미지 업로드
    const handleImageClick = () =>{
        inputRef.current.click();
    };
    const handleImageChange = (event) =>{
        const file = event.target.files[0];
        setImage(file);
    };
    const handleUpload = () => {
      if (image) {
        getColorsFromImage(image);
      }
    };
    

    //colorthief로 이미지의 색상 추출
    const colorThief = new ColorThief();
    const getColorsFromImage = (imageFile) => {
      const img = new Image();
      img.src = URL.createObjectURL(imageFile);
      img.onload = () => {
        const colorPalette = colorThief.getPalette(img, 5); // 5개 색 추출
        const hexPalette = colorPalette.map((color) =>
          `#${color.map((component) => component.toString(16).padStart(2, '0')).join('')}`);
        setColors(colorPalette);
        setHexColors(hexPalette);
      };
    };
    
    
    //색상 변경할 팔레트 선택-팔레트 생성
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

    //eyedropper
   /* const useEyeDropper = (hexColors, setHexColors, setError) => {
      return () => {
        const resultElement = document.getElementById('result');
  
        if (!window.EyeDropper) {
          setError('Your browser does not support the EyeDropper API');
          return;
        }
  
        const eyeDropper = new EyeDropper();
  
        eyeDropper
          .open()
          .then((result) => {
            if (selectedBoxIndex !== null) {
              const updatedHexColors = [...hexColors];
              updatedHexColors[selectedBoxIndex] = result.sRGBHex;
              setHexColors(updatedHexColors);
              resultElement.style.backgroundColor = result.sRGBHex;
              setError('');
            }
          })
          .catch((e) => {
            setError(e);
          });
      };
    };
  
    const handleEyeDropperClick = useEyeDropper(hexColors, setHexColors, setError);*/
  
    /*const hexColorsList = hexColors.join(',');*/
    
  

    return(
    <div className="container">
      <div className="box-decoration">
        <div onClick={handleImageClick}>
          {image ? (
            <img src={URL.createObjectURL(image)} alt="" className="img-display" />
          ) : (
            <img src="./upload.png" alt="" className="img-display"/>
          )}
          <input
            type ="file"
            ref={inputRef}
            onChange={handleImageChange}
            style={{display: "none"}}/>
        </div>

        <div>
          <button className="image-upload-button" onClick={handleUpload}>upload</button>
        </div>
        <div>
          <img className="eyedropper-button" src="./eyedropper.png" alt="eyedropper" /*onClick={handleEyeDropperClick}*//>
        </div>

      </div>

      <div className="image-palette-divider"></div>
    
      <div id="wrapper">
          {hexColors.map((hexColor, index) => {
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
                  style={{ backgroundColor: hexColor }}
                ></div>
              </div>
            );
          })}
    
          <div className="button-image">
            <SaveButton  hexColors={hexColors} />
            <CreatePaletteCheckButton hexColors={hexColors}/>
          </div>
          
        </div>
    </div>
  );

}
export default ImageColorPick;
