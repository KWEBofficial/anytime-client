import { useState } from 'react';
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

// NoticeResDTO 수정 필요
interface NoticeCardProps {
  noticeId: number;
  content: string;
  createdAt: Date;
  startDate: Date;
  endDate: Date;
  isPrior: boolean;
}

interface DateBlockProp {
  date: string;
}

function DateBlock({ date }: DateBlockProp) {
  return (
    <CardContent sx={{ width: '80px' }}>
      <Typography variant="body2">{date} </Typography>
    </CardContent>
  );
}

const NoticeCard = ({ noticeId, content, createdAt, startDate, endDate, isPrior }: NoticeCardProps) => {
  const [swit, setSwit] = useState(true);

  const handleAddClick = () => {
    setSwit(() => !swit);
  };
  const handleEditClick = () => {};
  const handleDeleteClick = () => {};

  return (
    <Card sx={{ minWidth: 275, height: 'auto', marginBottom: 1 }}>
      {/* 최소 크기가 있고, 최대 크기도 있으면 좋겠음, 내용이 최대 크기를 넘어서면 말줄임표하고 싶음 */}
      {/* 생성 일자, 게시 일자, 내용, 게시 기한, + */}
      <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'stretch', height: 'auto' }}>
        <DateBlock date="2020-01-01 14:15:16" />
        <DateBlock date="2024-01-01 17:18:19" />
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
            component="div"
            sx={{
              wordWrap: swit ? 'break-word' : '',
              display: swit ? '-webkit-box' : '',
              WebkitBoxOrient: swit ? 'vertical' : '',
              WebkitLineClamp: swit ? 3 : '',
              overflow: 'hidden',
              whiteSpace: 'normal',
            }}
          ></Typography>
        </CardContent>
        <DateBlock date="2025-01-01 20:21:22" />
        <CardActions disableSpacing sx={{ width: '40px', justifyContent: 'flex-end', padding: '8px' }}>
          {swit ? (
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
    </Card>
  );
};

export default NoticeCard;
