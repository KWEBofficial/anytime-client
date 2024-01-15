import { useState } from 'react';
import axios from 'axios';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Card from '@mui/material/Card';
import Box from '@mui/material/Box';
import RemoveIcon from '@mui/icons-material/Remove';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';

import NoticeInput from './NoticeInput';

interface NoticeAllResDTO {
  teamname: string;
  noticeId: number;
  content: string;
  createdAt: Date;
  startDate: Date;
  endDate: Date;
  isPrior: boolean;
}
interface NoticeCardProps {
  index: number;
  noticeId: number;
  content: string;
  createdAt: Date;
  startDate: Date;
  endDate: Date;
  isPrior: boolean;
  onChange: (value: React.SetStateAction<NoticeAllResDTO[]>) => void;
}
interface DateBlockProp {
  date: Date;
}

function DateBlock({ date }: DateBlockProp) {
  return (
    <CardContent sx={{ width: '80px' }}>
      <Typography variant="body2">
        {new Date(date).toLocaleDateString()}
        <br />
        {new Date(date).toLocaleTimeString()}
      </Typography>
    </CardContent>
  );
}
//
const NoticeCard = ({
  index,
  noticeId,
  content,
  createdAt,
  startDate,
  endDate,
  isPrior,
  onChange,
}: NoticeCardProps) => {
  const [swit, setSwit] = useState(false);
  const [modify, setModify] = useState(false);

  const handleAddClick = () => {
    setModify(() => false);
    setSwit(() => !swit);
  };
  const handleEditClick = () => {
    setModify(() => !modify);
  };
  const handleDeleteClick = () => {
    const fetchData = async () => {
      await axios.delete(`${process.env.REACT_APP_API_URL}/notice/${noticeId}`, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
    };
    if (window.confirm('정말 삭제하시겠습니까?')) {
      alert('삭제되었습니다.');
      fetchData();
      setSwit(() => !swit);
      onChange((notices) => [...notices.slice(0, index), ...notices.slice(index + 1)]);
    }
  };
  return (
    <Card sx={{ minWidth: 275, height: 'auto', marginBottom: 1 }}>
      {!modify ? (
        <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'stretch', height: 'auto' }}>
          <DateBlock date={createdAt} />
          <DateBlock date={startDate} />
          <CardContent
            sx={{
              maxWidth: '1010px',
              flexGrow: 1,
              whiteSpace: 'normal',
              overflowWrap: 'break-word',
            }}
          >
            <Typography
              variant="body2"
              sx={{
                wordWrap: !swit ? 'break-word' : '',
                display: !swit ? '-webkit-box' : '',
                WebkitBoxOrient: !swit ? 'vertical' : '',
                WebkitLineClamp: !swit ? 3 : '',
                overflow: 'hidden',
                whiteSpace: 'pre-wrap',
              }}
            >
              {isPrior ? '!중요! ' : ''}
              {content}
            </Typography>
          </CardContent>
          <DateBlock date={endDate} />
          <CardActions disableSpacing sx={{ width: '40px', justifyContent: 'flex-end', padding: '8px' }}>
            {!swit ? (
              <IconButton onClick={handleAddClick}>
                <AddIcon />
              </IconButton>
            ) : (
              <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'stretch' }}>
                <IconButton onClick={handleAddClick}>
                  <RemoveIcon />
                </IconButton>
                <IconButton onClick={handleEditClick}>
                  <ModeEditIcon />
                </IconButton>
                <IconButton onClick={handleDeleteClick}>
                  <DeleteIcon />
                </IconButton>
              </Box>
            )}
          </CardActions>
        </Box>
      ) : (
        <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'stretch', height: 'auto' }}>
          <NoticeInput
            noticeId={noticeId.toString()}
            type="수정"
            teamId=""
            content={content}
            startDate={startDate}
            endDate={endDate}
            isPrior={isPrior}
          />
          <CardActions disableSpacing sx={{ width: '40px', justifyContent: 'flex-end', padding: '8px' }}>
            {!swit ? (
              <IconButton onClick={handleAddClick}>
                <AddIcon />
              </IconButton>
            ) : (
              <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'stretch' }}>
                <IconButton onClick={handleAddClick}>
                  <RemoveIcon />
                </IconButton>
                <IconButton onClick={handleEditClick}>
                  <ModeEditIcon />
                </IconButton>
                <IconButton onClick={handleDeleteClick}>
                  <DeleteIcon />
                </IconButton>
              </Box>
            )}
          </CardActions>
        </Box>
      )}
    </Card>
  );
};

export default NoticeCard;
