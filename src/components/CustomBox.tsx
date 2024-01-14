import { Box, Typography, List, ListItem } from '@mui/material';

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
}
const CustomBox = ({ title, items }: CustomBoxProps) => {
  return (
    <Box sx={style}>
      <Typography variant="h6" textAlign="center" fontWeight="bold">
        {title}
      </Typography>
      <List>
        {items.map((item) => (
          <ListItem style={{ justifyContent: 'center' }}>
            <Typography lineHeight={1}>{item}</Typography>
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default CustomBox;
