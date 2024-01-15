import axios from 'axios';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Divider from '@mui/material/Divider';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Card from '@mui/material/Card';
import Box from '@mui/material/Box';
import AddIcon from '@mui/icons-material/Add';

// TeamListResDTO
interface PublicCardProps {
  id: number;
  teamname: string;
  color: string; // string
  explanation: string;
}

const PublicCard = ({ id, teamname, color, explanation }: PublicCardProps) => {
  const handleAddClick = async () => {
    try {
      const response = await axios.post(`${process.env.REACT_APP_API_URL}/team/subscribe/${id}`, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (response.status === 200) {
        window.alert('구독되었습니다.');
      }
    } catch (e) {
      window.alert('이미 구독 중입니다.');
    }
  };

  return (
    <Card sx={{ minWidth: 275, height: 'auto', marginBottom: 2, overflow: 'hidden' }}>
      <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'stretch', height: 'auto' }}>
        <Box sx={{ backgroundColor: color, width: '20px', flexShrink: 0 }} />
        <CardContent sx={{ maxWidth: '1200px', flexGrow: 1, whiteSpace: 'normal', overflowWrap: 'break-word' }}>
          <Typography variant="h5" component="div">
            {teamname}
          </Typography>
          <Divider sx={{ marginY: '10px' }} />
          <Typography variant="body2" sx={{ wordWrap: 'break-word', overflow: 'hidden', whiteSpace: 'pre-wrap' }}>
            {explanation}
          </Typography>
        </CardContent>
        <CardActions disableSpacing sx={{ justifyContent: 'flex-end', padding: '8px' }}>
          <IconButton onClick={handleAddClick}>
            <AddIcon />
          </IconButton>
        </CardActions>
      </Box>
    </Card>
  );
};

export default PublicCard;
