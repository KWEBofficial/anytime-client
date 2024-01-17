import { Box, Typography, List, ListItemButton, ListItem } from '@mui/material';
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

interface CustomBoxProps {
  title: string;
  items: string[];
  isAdmins?: boolean[];
  onClick?: (event: React.MouseEvent<HTMLDivElement, MouseEvent>, index: number) => void;
}

const CustomBox = ({ title, items, isAdmins, onClick }: CustomBoxProps) => {
  return (
    <Box sx={style}>
      <Typography variant="h6" textAlign="center" fontWeight="bold">
        {title}
      </Typography>
      <List>
        {isAdmins && onClick
          ? items.map((item, index) => (
              <ListItemButton
                key={index}
                style={{ justifyContent: 'center' }}
                onClick={(e) => {
                  onClick(e, index);
                }}
              >
                <Typography lineHeight={1}>{item}</Typography>
                {isAdmins[index] ? <CheckIcon /> : ''}
              </ListItemButton>
            ))
          : items.map((item) => (
              <ListItem key={item} style={{ justifyContent: 'center' }}>
                <Typography lineHeight={1}>{item}</Typography>
              </ListItem>
            ))}
      </List>
    </Box>
  );
};

export default CustomBox;
