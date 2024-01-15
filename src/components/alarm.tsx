import * as React from 'react';
import Popover from '@mui/material/Popover';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { Divider, List, ListItem, ListItemText } from '@mui/material';

export default function Alarm() {
  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(null);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  const contents = [
    ['고딩팸에 술약속 일정이 추가되었습니다', '2024년 10월 18일 18:00'],
    ['KWEB에 해커톤 회의 일정이 추가되었습니다', '2024년 1월 4일 13:00'],
    //{title:'모임3의 일정1이 삭제되었습니다', schedule: '2023년 3월 1일 11:00' },
    //{title:'모임4의 일정3이 변경되었습니다', schedule: '2025년 11월 11일 20:00'},
  ];

  return (
    <div>
      <Button aria-describedby={id} variant="contained" onClick={handleClick}>
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
            <List>
              <ListItem alignItems="flex-start">
                <ListItemText primary={content[0]} secondary={content[1]} />
              </ListItem>
              <Divider component="li" />
            </List>
          ))}

          <Divider component="li" />
          <ListItem alignItems="flex-start">
            <ListItemText
              primary="Summer BBQ"
              secondary={
                <React.Fragment>
                  <Typography sx={{ display: 'inline' }} component="span" variant="body2" color="text.primary">
                    to Scott, Alex, Jennifer
                  </Typography>
                  {" — Wish I could come, but I'm out of town this…"}
                </React.Fragment>
              }
            />
          </ListItem>
          <Divider component="li" />
          <ListItem alignItems="flex-start">
            <ListItemText
              primary="Oui Oui"
              secondary={
                <React.Fragment>
                  <Typography sx={{ display: 'inline' }} component="span" variant="body2" color="text.primary">
                    Sandra Adams
                  </Typography>
                  {' — Do you have Paris recommendations? Have you ever…'}
                </React.Fragment>
              }
            />
          </ListItem>
        </List>
        <Typography sx={{ p: 2 }}>content</Typography>
      </Popover>
    </div>
  );
}
