import * as React from 'react';
import axios from 'axios';
import Popover from '@mui/material/Popover';
import Button from '@mui/material/Button';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { Divider, IconButton, List, ListItem, ListItemText, Stack } from '@mui/material';
import { useRecoilValue } from 'recoil';
import { userState } from '../state/userState';

//AlarmResDTO
interface AlarmProps {
  id: number;
  content: string;
  createdAt: string;
  isRead: boolean;
}

export default function Alarm() {
  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(null);
  const [selectedContents, setSelectedContents] = React.useState<number[]>([]);
  const [alarmInfo, setAlarmInfo] = React.useState<AlarmProps[]>([]);

  const userId = useRecoilValue(userState);

  React.useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/alarm`, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      setAlarmInfo(response.data);
    };
    fetchData();
  }, []);

  const deleteData = async (id: number) => {
    const response = await axios.delete(`${process.env.REACT_APP_API_URL}/alarm/${id}`, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
  };

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
    //db에서 selectedContent에 있는 것들을 지움
    selectedContents.map((id) => deleteData(id));
    setAlarmInfo((prevAlarmInfo) => prevAlarmInfo.filter((item) => !selectedContents.includes(item.id)));
    setSelectedContents([]);
  };

  const handleDeleteClick = (index: number) => {
    setSelectedContents((prevSelected) => {
      if (prevSelected.includes(index)) {
        return prevSelected.filter((item) => item !== index);
      } else {
        return [...prevSelected, index];
      }
    });
  };

  const textStyle = (index: number) => {
    return {
      color: selectedContents.includes(index) ? '#bcbcbc' : '#173A5E',
    };
  };

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
          {alarmInfo.map((alarm) => (
            <Stack direction="column" justifyContent="center" key={alarm.id}>
              <ListItem
                alignItems="flex-start"
                secondaryAction={
                  <IconButton edge="end" onClick={() => handleDeleteClick(alarm.id)}>
                    <DeleteOutlineIcon />
                  </IconButton>
                }
              >
                <ListItemText primary={alarm.content} secondary={alarm.createdAt} sx={textStyle(alarm.id)} />
              </ListItem>
              <Divider component="li" />
            </Stack>
          ))}
        </List>
      </Popover>
    </div>
  );
}
