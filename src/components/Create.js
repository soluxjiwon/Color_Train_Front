/*팔레트 생성 페이지*/

import React, { useState } from 'react';
import ImageColorPick from './ImageColorPick';
import OneColorCustom from './OneColorCustom';
import FiveColorCustom from './FiveColorCustom';
import '../style_components/Create.css';

function Create() {
  const [selectedOption, setSelectedOption] = useState(null);
  
  const handleOptionClick = (option) => {
      setSelectedOption(option);
    };

  return (
    <div>
      <div className="navbar">
        {/* Option 1: 이미지 추출 */}
        <button 
          className={selectedOption === "imagecolorpick" ? "selected" : ""}
          onClick={() => handleOptionClick("imagecolorpick")}>
            이미지 추출
        </button>
        {/* Option 2: 1색 커스텀 */}
        <button 
          className={selectedOption === "onecolorcustom" ? "selected" : ""}
          onClick={() => handleOptionClick("onecolorcustom")}>
            1색 커스텀
        </button>
        {/* Option 3: 5색 커스텀 */}
        <button
          className={selectedOption === "fivecolorcustom" ? "selected" : ""}
          onClick={() => handleOptionClick("fivecolorcustom")}>
            5색 커스텀
        </button>
      </div>
      {selectedOption === "imagecolorpick" && <ImageColorPick />}
      {selectedOption === "onecolorcustom" && <OneColorCustom />}
      {selectedOption === "fivecolorcustom" && <FiveColorCustom />}
    </div>
  );
}
export default Create;