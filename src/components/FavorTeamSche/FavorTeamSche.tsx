import { useNavigate } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import { format } from 'date-fns';
import axios from 'axios';
import { Grid, Stack, List, ListItemText, Typography, ListItem, Divider } from '@mui/material';

interface Schedule {
  name: string;
  startTime: string;
  endTime: string;
  explanation: string;
}
interface TeamDetail {
  teamId: number;
  teamname: string;
  color: number;
  schedule: Schedule[];
}
interface TeamInfo {
  teamId: number;
  teamname: string;
  isPublic: number;
  isAdmin: number;
  isFavor: number;
  isHide: number;
}

export default function FavorTeamSche() {
  const navigate = useNavigate();

  const [myTeam, setMyTeam] = useState<TeamInfo[]>([]);
  const [teamDetails, setTeamDetails] = useState<TeamDetail[]>([]);

  const navigateToTeam = (teamId: number) => {
    navigate(`/team/${teamId}`);
  };

  useEffect(() => {
    // 전체 팀 정보
    const fetchData = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/team`, {
          headers: {
            'Content-Type': 'application/json',
          },
          withCredentials: true,
        });

        if (response.status === 200) {
          setMyTeam(response.data);
        }
      } catch (e) {
        /* empty */
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    // 즐겨찾기 팀 정보
    const FavorTeamIds = myTeam.filter((team) => team.isFavor === 1).map((team) => team.teamId);

    const fetchAllTeamsInfo = async () => {
      await Promise.all(FavorTeamIds.map(fetchTeamInfo));
    };

    if (FavorTeamIds.length > 0) {
      fetchAllTeamsInfo();
    }
  }, [myTeam]);

  const fetchTeamInfo = async (teamId: number) => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/team/${teamId}`, {
        headers: {
          'Content-Type': 'application/json',
        },
        withCredentials: true,
      });
      if (response.status === 200) {
        setTeamDetails((prevDetails) => {
          // 이미 로드된 팀 정보를 다시 추가하지 않도록
          if (prevDetails.some((detail) => detail.teamname === response.data.teamname)) {
            return prevDetails;
          }
          const newDetails = [
            ...prevDetails,
            {
              teamId,
              teamname: response.data.teamname,
              color: response.data.color,
              schedule: response.data.schedules,
            },
          ];
          // 팀이름 기준 정렬
          newDetails.sort((a, b) => a.teamname.localeCompare(b.teamname));
          return newDetails;
        });
      }
    } catch (error) {
      /* empty */
    }
  };

  const validSche = teamDetails.map<TeamDetail>((team) => {
    return {
      teamId: team.teamId,
      teamname: team.teamname,
      color: team.color,
      schedule: team.schedule
        .filter((sche) => {
          return format(new Date(sche.endTime), 'y-M-d') >= format(new Date(), 'y-M-d');
        })
        .sort((a, b) => (format(new Date(a.startTime), 'y-M-d') < format(new Date(b.startTime), 'y-M-d') ? -1 : 1)),
    };
  });

  return (
    <Stack display={'flex'} justifyContent={'center'} direction={'row'} spacing={10} width={'80vw'}>
      <Grid container spacing={5}>
        {validSche.map((team, index) => (
          <Grid item xs={12} sm={6} md={4} key={index} onClick={() => navigateToTeam(team.teamId)}>
            <List
              sx={{
                bgcolor: '#d3e9f6',
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
              <li key={team.teamname}>
                <ListItem>{team.teamname}</ListItem>
                <Divider />

                {team.schedule.length > 0 ? (
                  team.schedule.map((sche, scheIndex) => (
                    <ListItem
                      sx={{
                        paddingTop: 0.5,
                        paddingBottom: 0,
                        width: '20vw',
                      }}
                      key={team.teamname + scheIndex}
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
                  <ListItem>
                    <Typography sx={{ fontSize: '2vh' }}>예정된 일정이 없어요</Typography>
                  </ListItem>
                )}
              </li>
            </List>
          </Grid>
        ))}
      </Grid>
    </Stack>
  );
}
