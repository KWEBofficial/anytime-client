import * as React from 'react';
import Typography from '@mui/material/Typography';
import { grey } from '@mui/material/colors';
import Box from '@mui/material/Box';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Accordion from '@mui/material/Accordion';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

interface NoticeBoxProps {
  notices: string[];
}
const NoticeBox = ({ notices }: NoticeBoxProps) => {
  const MAX_LENGTH = 50;
  const summarizeNotice = (notice: string) => {
    if (notice.length > MAX_LENGTH) {
      return `${notice.substring(0, MAX_LENGTH)}...`;
    }
    return notice;
  };
  const isToggleRequired = (notice: string) => notice.length > MAX_LENGTH;

  return (
    <Box sx={{ width: 800, marginBottom: 3 }}>
      {notices.map((notice, index) => (
        <Accordion sx={{ backgroundColor: grey[200] }} key={index}>
          <AccordionSummary
            expandIcon={isToggleRequired(notice) ? <ExpandMoreIcon /> : null}
            aria-controls={`panel${index}-content`}
            id={`panel${index}-header`}
          >
            <Typography component="span" sx={{ width: '15%', flexShrink: 0 }}>
              {`Notice ${index + 1}`}
            </Typography>
            <Typography noWrap>{summarizeNotice(notice)}</Typography>
          </AccordionSummary>
          {isToggleRequired(notice) && (
            <AccordionDetails>
              <Typography>{notice}</Typography>
            </AccordionDetails>
          )}
        </Accordion>
      ))}
    </Box>
  );
};

export default NoticeBox;

/*  
기존코드
import ListItemText from '@mui/material/ListItemText';
import ListItem from '@mui/material/ListItem';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
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
*/
