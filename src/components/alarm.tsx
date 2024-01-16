import * as React from 'react';
import Popover from '@mui/material/Popover';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { Checkbox, Divider, List, ListItem, ListItemText, Stack } from '@mui/material';

export default function Alarm() {
  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(null);
  //const [checked, setChecked] = React.useState([1]);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  //const handleToggle = (value: number) => () => {
  //  const currentIndex = checked.indexOf(value);
  //  console.log(currentIndex);
  //}

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  const contents = [
    ['고딩팸에 술약속 일정이 추가되었습니다', '2024년 10월 18일 18:00'],
    ['KWEB에 해커톤 회의 일정이 추가되었습니다', '2024년 1월 4일 13:00'],
    ['모임3의 일정1이 삭제되었습니다', '2024년 3월 1일 11:00'],
    ['모임4의 일정3이 변경되었습니다', '2024년 11월 11일 20:00'],
    ['모임5에 초대되었습니다', '2024년 12월 1일 21:00'],
  ];

  return (
    <div>
      <Button aria-describedby={id} onClick={handleClick} sx={{ my: 2, color: '#696969', display: 'block' }}>
        알람
      </Button>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
      >
        <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
          {contents.map((content) => (
            <Stack direction="column" justifyContent="center">
              <ListItem
                alignItems="flex-start"
                secondaryAction={
                  <Checkbox
                    edge="end"
                    //onChange={handleToggle(value)}
                    //checked={checked.indexOf(value) !== -1}
                    //inputProps={{ 'aria-labelledby': labelId }}
                  />
                }
              >
                <ListItemText primary={content[0]} secondary={content[1]} />
              </ListItem>
              <Divider component="li" />
            </Stack>
          ))}
        </List>
      </Popover>
    </div>
  );
}
