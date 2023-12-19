/*컬러픽커*/

import React, {useState} from 'react';
import { ChromePicker } from 'react-color';

function ColorPicker({ onColorChange }) {
  const [color, setColor] = useState('#fff');

  const handleColorChange = (updatedColor) => {
    setColor(updatedColor.hex);
    onColorChange(updatedColor.hex); 
  };

  return (
    <div className="ColorPicker">
      <ChromePicker
        color={color}
        onChange={handleColorChange}
      />
    </div>
  );
}

export default ColorPicker;




