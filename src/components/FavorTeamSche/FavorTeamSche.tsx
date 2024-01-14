import React, { useEffect, useState } from 'react';
import { format } from 'date-fns';
import { Grid, Stack, List, ListItemText, Typography, ListItem, Divider } from '@mui/material';

interface Schedule {
  name: string;
  startDate: Date;
  endDate: Date;
  explanation: string;
}

interface MyTeamSche {
  teamname: string;
  isFavor: boolean;
  isHide: boolean;
  schedule: Schedule[];
}

export default function FavorTeamSche() {
  const [favor, setFavor] = useState<MyTeamSche[]>([
    {
      teamname: 'test1',
      isFavor: true,
      isHide: false,
      schedule: [
        {
          name: 'sche1',
          startDate: new Date(),
          endDate: new Date(),
          explanation: 'sche1',
        },
        {
          name: 'sche2',
          startDate: new Date(),
          endDate: new Date(),
          explanation: 'sche2',
        },
      ],
    },
    {
      teamname: 'not Favor test',
      isFavor: false,
      isHide: false,
      schedule: [
        {
          name: 'not Favor sche1',
          startDate: new Date(),
          endDate: new Date(),
          explanation: 'not Favor sche1',
        },
      ],
    },
    {
      teamname: 'check it out',
      isFavor: true,
      isHide: false,
      schedule: [
        {
          name: 'check11111111111111',
          startDate: new Date('2024-01-11'),
          endDate: new Date('2024-01-12'),
          explanation: 'check that it should not be appeared at FavorTeam scheBox',
        },
        {
          name: 'check222222222222',
          startDate: new Date('2024-01-11'),
          endDate: new Date('2024-01-14'),
          explanation: 'Check that it should be appeared at FavorTeam scheBox. string이 칸을 넘어갈 경우 공백을 기준으로 줄바꿈이 이루어짐.',
        },
        {
          name: 'check3',
          startDate: new Date('2024-01-14'),
          endDate: new Date('2024-01-14'),
          explanation: 'Check that it should be appeared at FavorTeam scheBox.',
        },
        {
          name: 'check4',
          startDate: new Date('2024-01-15'),
          endDate: new Date('2024-01-19'),
          explanation: 'Check that it should be appeared at FavorTeam scheBox.',
        },
        {
          name: 'check5',
          startDate: new Date('2024-01-17'),
          endDate: new Date('2024-01-17'),
          explanation: 'Check that it should be appeared at FavorTeam scheBox.',
        },
        {
          name: 'check6',
          startDate: new Date('2024-01-22'),
          endDate: new Date('2024-01-22'),
          explanation: 'Check that it should be appeared at FavorTeam scheBox.',
        },
        {
          name: 'check7',
          startDate: new Date('2024-01-22'),
          endDate: new Date('2024-01-24'),
          explanation: 'Check that it should be appeared at FavorTeam scheBox.',
        },
      ],
    },
  ]);

  useEffect(() => {
    setFavor((curr) => curr);
  }, []);
  /*
  useEffect(() => {
    setFavor((curr) => [
      ...curr,
      {
        teamname: 'test2',
        isFavor: true,
        isHide: false,
        schedule: [
          {
            name: 'test2',
            startDate: new Date(),
            endDate: new Date(),
            explanation: 'test2',
          },
        ],
      },
    ]);
  }, []);
  */
  const validTeam: MyTeamSche[] = [];
  for (let i = 0; i < favor.length; i += 1) {
    if (validTeam.length === 3) break;
    if (favor[i].isFavor === true && favor[i].isHide === false) {
      validTeam.push(favor[i]);
    }
  }
  const validSche = validTeam.map<MyTeamSche>((team) => {
    return {
      teamname: team.teamname,
      isFavor: team.isFavor,
      isHide: team.isHide,
      schedule: team.schedule
        .filter((sche) => {
          return format(sche.endDate, 'y-M-d') >= format(new Date(), 'y-M-d');
        })
        .sort((a, b) => (format(a.startDate, 'y-M-d') < format(b.startDate, 'y-M-d') ? -1 : 1)),
    };
  });

  const scheBox = [];
  for (let i = 0; i < validSche.length; i += 1) {
    scheBox.push(
      <Grid>
        <List
          sx={{
            bgcolor: '#cfe8fc',
            width: '20vw',
            height: '50vh',
            borderRadius: '20px',
            fontSize: '4vh',
            fontWeight: 'bold',
            boxShadow: 3,
            overflow: 'hidden',
            [`&.MuiList-root:hover`]: {
              transition: '0.2s ease-in-out',
              transform: 'scale(1.05)',
              boxShadow: '4',
            },
            [`&.MuiList-root:not(:hover)`]: { transition: '0.2s ease-in-out', transfrom: 'scale(1)' },
          }}
        >
          <li key={validSche[i].teamname}>
            <ListItem>{validSche[i].teamname}</ListItem>

            <Divider />

            {validSche[i].schedule.map((sche) => (
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
                          ? `${format(sche.startDate, 'yy년 MM월 dd일 hh:mm')} ~ ${format(sche.endDate, 'hh:mm')}`
                          : `${format(sche.startDate, 'yy년 MM월 dd일 hh:mm')} ~ ${format(
                              sche.endDate,
                              'yy년 MM월 dd일 hh:mm',
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
      </Grid>,
    );
  }

  return (
    <Stack display={'flex'} justifyContent={'center'} direction={'row'} spacing={10} width={'88vw'}>
      {scheBox}
    </Stack>
  );
}
