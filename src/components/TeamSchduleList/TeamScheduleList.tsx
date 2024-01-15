import * as React from 'react';
import { format } from 'date-fns';
import { Grid, List, ListItemText, Typography, ListItem } from '@mui/material';

interface Schedule {
  name: string;
  startDate: Date;
  endDate: Date;
  explanation: string;
}

export default function TeamShowBox() {
  const teamSche: Schedule[] = [
    {
      name: 'check1',
      startDate: new Date('2024-01-11'),
      endDate: new Date('2024-01-12'),
      explanation: 'example 1',
    },
    {
      name: 'check2',
      startDate: new Date('2024-01-11'),
      endDate: new Date('2024-01-14'),
      explanation: 'example',
    },
    {
      name: 'check3',
      startDate: new Date('2024-01-14'),
      endDate: new Date('2024-01-14'),
      explanation: 'example 3.',
    },
    {
      name: 'check4',
      startDate: new Date('2024-01-15'),
      endDate: new Date('2024-01-19'),
      explanation: 'example 4.',
    },
    {
      name: 'check5',
      startDate: new Date('2024-01-17'),
      endDate: new Date('2024-01-17'),
      explanation: 'example 5.',
    },
    {
      name: 'check6',
      startDate: new Date('2024-01-22'),
      endDate: new Date('2024-01-22'),
      explanation: 'example 6.',
    },
    {
      name: 'check7',
      startDate: new Date('2024-01-22'),
      endDate: new Date('2024-01-24'),
      explanation: 'example 7.',
    },
  ];

  const scheBox = (
    <Grid>
      <List
        className="scroll"
        sx={{
          display: 'flex',
          direction: 'column',
          bgcolor: '#dfdfdf',
          width: '20vw',
          height: '20vw',
          borderRadius: '10px',
          fontSize: '4vh',
          fontWeight: 'bold',
          boxShadow: 3,
          overflow: 'scroll',

          [`&.MuiList-root:hover`]: {
            transition: '0.2s ease-in-out',
            transform: 'scale(1.05)',
            boxShadow: '4',
          },
          [`&.MuiList-root:not(:hover)`]: { transition: '0.2s ease-in-out', transfrom: 'scale(1)' },
        }}
      >
        <li>
          {teamSche.map((sche) => (
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
                    color="text.primary"
                    width={'100%'}
                    sx={{
                      fontSize: '2vh',
                      fontWeight: '800',
                    }}
                  >
                    {sche.name}
                  </Typography>
                }
                secondary={
                  <React.Fragment>
                    <Typography
                      sx={{ display: 'inline', fontSize: '1.6vh', fontWeight: 'bold' }}
                      component="div"
                      variant="body2"
                      color="text.primary"
                    >
                      {format(sche.startDate, 'y-M-d') === format(sche.endDate, 'y-M-d')
                        ? `${format(sche.startDate, 'y년 M월 d일 hh:mm')} ~ ${format(sche.endDate, 'hh:mm')}`
                        : `${format(sche.startDate, 'y년 M월 d일 hh:mm')} ~ ${format(
                            sche.endDate,
                            'yy년 MM월 dd일 HH:MM',
                          )}`}
                    </Typography>
                    <Typography sx={{ fontSize: '1.5vh', fontWeight: 'bold' }}>{sche.explanation}</Typography>
                  </React.Fragment>
                }
              ></ListItemText>
            </ListItem>
          ))}
        </li>
      </List>
    </Grid>
  );
  return scheBox;
}
