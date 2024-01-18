import { CirclePicker, ColorResult } from 'react-color';
import React, { useState } from 'react';

interface ColorPickProps {
  isPublic: boolean;
  onColorChange: (colorEvent: { target: { value: string } }) => void;
}

// const myColorList = ['#F9D9D9', '#F9E8D9', '#F8F9D9', '#D9F9E8', '#D9EAF9', '#EAD9F9', '#F9D9F7', '#FFFFFF'];
// const myColorList = ['#FF8B8B', '#FFCA8B', '#FFEC8B', '#D3FF8B', '#9BFF8B', '#8BFFCE', '#8BFFFF', '#8BB2FF'];

const ColorPick = ({ onColorChange, isPublic }: ColorPickProps) => {
  const [color, setColor] = useState<string>('#000');

  const handleChange = (selectedColor: ColorResult) => {
    const newColor = selectedColor.hex;
    setColor(newColor);
    onColorChange({ target: { value: newColor } });
  };

  let colorList = ['#ff595e', '#ff924c', '#ffca3a', '#52a675', '#1982c4', '#4267ac', '#6a4c93', '#b5a6c9'];

  if (isPublic) {
    // colorList = ['#F9D9D9', '#F9E8D9', '#F8F9D9', '#D9F9E8', '#D9EAF9', '#EAD9F9', '#F9D9F7', '#FFFFFF'];
    colorList = ['#FFADAD', '#FFD6A5', '#FDFFB6', '#CAFFBF', '#9BF6FF', '#A0C4FF', '#BDB2FF', '#FFC6FF'];
  }

  return (
    <div>
      <CirclePicker color={color} onChange={handleChange} colors={colorList} width="300" />
    </div>
  );
};

export default ColorPick;
