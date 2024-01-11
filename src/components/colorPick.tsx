import { useState } from 'react';
import * as S from './colorPick.styles';

export default function ColorPick() {
  const [isSelect, setIsSelect] = useState([
    { key: '0', value: '#FF8B8B', checked: false },
    { key: '1', value: '#FFCA8B', checked: false },
    { key: '2', value: '#FFEC8B', checked: false },
    { key: '3', value: '#D3FF8B', checked: false },
    { key: '4', value: '#9BFF8B', checked: false },
    { key: '5', value: '#8BFFCE', checked: false },
    { key: '6', value: '#8BFFFF', checked: false },
    { key: '7', value: '#8BB2FF', checked: false },
    { key: '8', value: '#8B90FF', checked: false },
    { key: '9', value: '#D38BFF', checked: false },
    { key: '10', value: '#FD8BFF', checked: false },
    { key: '11', value: '#FF8BB5', checked: false },
  ]);
  /*
  const onChangeCheck = (el) => (event) => {
    const temp = isSelect.map((el, idx) => {
      return { ...el, checked: idx === Number(event?.target.id) };
    });
    setIsSelect(temp);
    props.setColor(el.value);
  };
  */

  return (
    <S.Wrapper>
      {isSelect.map((el, idx) => (
        <label className="checkbox" key={el.key}>
          <input type="checkbox" key={el.key} /*id={idx} onChange={onChangeCheck(el)} checked={Boolean(el.checked)}*/ />
          <S.Circle className="checkbox_color" style={{ backgroundColor: el.value }}></S.Circle>
        </label>
      ))}
    </S.Wrapper>
  );
}
