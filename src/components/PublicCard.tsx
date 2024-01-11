import { useNavigate } from 'react-router-dom';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Card from '@mui/material/Card';
import Box from '@mui/material/Box';
import AddIcon from '@mui/icons-material/Add';

// TeamListResDTO
interface PublicCardProps {
  teamId: number;
  name: string;
  color: string; // number
  description: string;
}

const PublicCard = ({ teamId, name, color, description }: PublicCardProps) => {
  const navigate = useNavigate();
  // onClick={() => navigate(`/team/${teamId}`)}
  const handleAddClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    // 아이콘 클릭시 구독 되는거 구현하면 될 듯
  };

  return (
    <Card
      sx={{ minWidth: 275, height: 'auto', marginBottom: 2, overflow: 'visible' }}
      onClick={() => navigate(`/team/${teamId}`)}
    >
      <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'stretch', height: 'auto' }}>
        <Box sx={{ backgroundColor: color, width: '20px', flexShrink: 0 }} />
        <CardContent sx={{ flexGrow: 1, whiteSpace: 'normal', overflowWrap: 'break-word' }}>
          <Typography variant="h5" component="div">
            {name}
          </Typography>
          <Typography variant="body2" sx={{ wordWrap: 'break-word', whiteSpace: 'normal' }}>
            {description}
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
