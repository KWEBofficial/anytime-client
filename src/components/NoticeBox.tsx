import * as React from 'react';
import ListItemText from '@mui/material/ListItemText';
import ListItem from '@mui/material/ListItem';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';

const style = {
  py: 0,
  width: '100%',
  maxWidth: 700,
  borderRadius: 2,
  border: '1px solid',
  borderColor: 'divider',
  backgroundColor: 'background.paper',
  marginBottom: 2,
};

interface NoticeBoxProps {
  notices: string[];
}
const NoticeBox = ({ notices }: NoticeBoxProps) => {
  return (
    <List sx={style}>
      {notices.map((notice, index) => (
        <React.Fragment key={index}>
          <ListItem>
            <ListItemText primary={`notice ${index + 1}`} secondary={notice} />
          </ListItem>
          {index < notices.length - 1 && <Divider component="li" />}
        </React.Fragment>
      ))}
    </List>
  );
};

export default NoticeBox;
