import { useNavigate } from 'react-router-dom';
import * as React from 'react';
import { enqueueSnackbar } from 'notistack';
import axios from 'axios';
import Popover from '@mui/material/Popover';
import Button from '@mui/material/Button';
import { Divider, IconButton, List, ListItem, ListItemText, Stack } from '@mui/material';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';

import { ResponseDataType } from '../models/ResponseDataType';

// AlarmResDTO
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
  const navigate = useNavigate();

  React.useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/alarm`, {
        headers: {
          'Content-Type': 'application/json',
        },
        withCredentials: true,
      });
      setAlarmInfo(response.data);
    };
    fetchData();
  }, []);

  const deleteData = async (id: number) => {
    try {
      await axios.delete(`${process.env.REACT_APP_API_URL}/alarm/${id}`, {
        headers: {
          'Content-Type': 'application/json',
        },
        withCredentials: true,
      });
    } catch (e) {
      if (axios.isAxiosError<ResponseDataType>(e)) {
        if (e.response?.status === 401) {
          enqueueSnackbar(e.response?.data.message, { variant: 'error' });
          navigate('/');
        } else {
          enqueueSnackbar(e.response?.data.message, { variant: 'error' });
        }
      }
    }
  };

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
    // db에서 selectedContent에 있는 것들을 지움
    selectedContents.map((id) => deleteData(id));
    setAlarmInfo((prevAlarmInfo) => prevAlarmInfo.filter((item) => !selectedContents.includes(item.id)));
    setSelectedContents([]);
  };

  const handleDeleteClick = (index: number) => {
    setSelectedContents((prevSelected) => {
      if (prevSelected.includes(index)) return prevSelected.filter((item) => item !== index);
      return [...prevSelected, index];
    });
  };

  const textStyle = (index: number) => {
    return {
      color: selectedContents.includes(index) ? '#bcbcbc' : '#173A5E',
    };
  };

  const dateStyle = (original: string) => {
    const dateObject = new Date(original);
    return dateObject.toLocaleString();
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

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
                <ListItemText primary={alarm.content} secondary={dateStyle(alarm.createdAt)} sx={textStyle(alarm.id)} />
              </ListItem>
              <Divider component="li" />
            </Stack>
          ))}
        </List>
      </Popover>
    </div>
  );
}
