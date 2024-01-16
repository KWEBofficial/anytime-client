import { Box, Typography, List, ListItemButton } from '@mui/material';
import CheckIcon from '@mui/icons-material/Check';

const style = {
  py: 0,
  width: '100%',
  maxWidth: 300,
  borderRadius: 2,
  border: '2px solid',
  borderColor: 'divider',
  backgroundColor: 'background.paper',
  marginBottom: 2,
  color: '#696969',
};
interface TeamMemberDTO {
  id: number;
  name: string;
  isAdmin: boolean;
}
interface CustomBoxProps {
  onClick: (event: React.MouseEvent<HTMLDivElement, MouseEvent>, index: number) => void;
  title: string;
  items: TeamMemberDTO[];
}

const CustomBox = ({ title, items, onClick }: CustomBoxProps) => {
  return (
    <Box sx={style}>
      <Typography variant="h6" textAlign="center" fontWeight="bold">
        {title}
      </Typography>
      <List>
        {items.map((item, index) => (
          <ListItemButton
            key={index}
            style={{ justifyContent: 'center' }}
            onClick={(e) => {
              onClick(e, index);
            }}
          >
            <Typography lineHeight={1}>{item.name}</Typography>
            {item.isAdmin ? <CheckIcon /> : ''}
          </ListItemButton>
        ))}
      </List>
    </Box>
  );
};

export default CustomBox;
