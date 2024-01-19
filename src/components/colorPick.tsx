import { CirclePicker, ColorResult } from 'react-color';
import React, { useState } from 'react';

interface ColorPickProps {
  isPublic: boolean;
  onColorChange: (colorEvent: { target: { value: string } }) => void;
}

const ColorPick = ({ onColorChange, isPublic }: ColorPickProps) => {
  const [color, setColor] = useState<string>('#000');

  const handleChange = (selectedColor: ColorResult) => {
    const newColor = selectedColor.hex;
    setColor(newColor);
    onColorChange({ target: { value: newColor } });
  };

  let colorList = ['#ff595e', '#ff924c', '#ffca3a', '#52a675', '#1982c4', '#4267ac', '#6a4c93', '#b5a6c9'];

  if (isPublic) {
    colorList = ['#FFADAD', '#FFD6A5', '#FDFFB6', '#CAFFBF', '#9BF6FF', '#A0C4FF', '#BDB2FF', '#FFC6FF'];
  }

  return (
    <div>
      <CirclePicker color={color} onChange={handleChange} colors={colorList} width="300" />
    </div>
  );
};

export default ColorPick;
