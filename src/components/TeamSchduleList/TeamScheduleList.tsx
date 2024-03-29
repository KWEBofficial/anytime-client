import * as React from 'react';
import { format } from 'date-fns';
import { Grid, List, ListItemText, Typography, ListItem } from '@mui/material';
import './TeamScheduleList.css';

interface Schedule {
  id: number;
  schedulename: string;
  startTime: Date;
  endTime: Date;
  explanation: string;
}
interface TeamScheduleListProps {
  teamSche: Schedule[];
}
const style = {
  display: 'flex',
  direction: 'column',
  py: 0,
  width: '100%',
  height: '20vw',
  maxWidth: 300,
  borderRadius: 2,
  border: '2px solid',
  borderColor: 'divider',
  backgroundColor: 'background.paper',
  marginBottom: 2,
  color: '#696969',
  overflow: 'scroll',
};

export default function TeamScheduleList({ teamSche }: TeamScheduleListProps) {
  const scheBox = (
    <Grid>
      <List className="scroll" sx={style}>
        <li>
          {teamSche.length > 0 ? (
            teamSche.map((sche) => (
              <ListItem
                sx={{
                  paddingTop: 0.5,
                  paddingBottom: 0,
                  width: '20vw',
                }}
              >
                <ListItemText
                  primary={
                    <Typography
                      component="div"
                      variant="body2"
                      color="#696969"
                      width={'100%'}
                      sx={{
                        fontSize: '2vh',
                        fontWeight: '800',
                      }}
                    >
                      {sche.schedulename}
                    </Typography>
                  }
                  secondary={
                    <React.Fragment>
                      <Typography
                        sx={{ display: 'inline', fontSize: '1.6vh', fontWeight: 'bold' }}
                        component="div"
                        variant="body2"
                        color="#696969"
                      >
                        {format(new Date(sche.startTime), 'y-M-d') === format(new Date(sche.endTime), 'y-M-d')
                          ? `${format(new Date(sche.startTime), 'yy년 MM월 dd일 hh:mm')} ~ ${format(
                              new Date(sche.endTime),
                              'hh:mm',
                            )}`
                          : `${format(new Date(sche.startTime), 'yy년 MM월 dd일 hh:mm')} ~ ${format(
                              new Date(sche.endTime),
                              'yy년 MM월 dd일 hh:mm',
                            )}`}
                      </Typography>
                      <Typography sx={{ fontSize: '1.5vh', fontWeight: 'bold' }}>{sche.explanation}</Typography>
                    </React.Fragment>
                  }
                ></ListItemText>
              </ListItem>
            ))
          ) : (
            <Typography sx={{ fontSize: '2vh', py: 1, paddingLeft: 1 }}>예정된 일정이 없어요</Typography>
          )}
        </li>
      </List>
    </Grid>
  );
  return scheBox;
}
