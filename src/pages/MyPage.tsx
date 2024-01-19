import { useRecoilValue } from 'recoil';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { enqueueSnackbar } from 'notistack';
import axios from 'axios';
import { Grid, Typography } from '@mui/material';

import { userState } from '../state/userState';
import { ResponseDataType } from '../models/ResponseDataType';
import { AllScheSearchDTO } from '../models/AllScheSearch';
import { useCalender } from '../contexts/calenderContext';
import TeamShowBox from '../components/TeamShowBox/TeamShowBox';
import { Layout } from '../components/Layout';
import { Calendar } from '../components/Calendar/Calendar';

interface ScheType {
  scheId: number;
  teamId: number;
  name: string;
  startDate: Date;
  endDate: Date;
  explanation: string;
  color: string;
}
export default function MyPage() {
  const userId = useRecoilValue(userState);
  const [member, setMember] = useState();
  const [sche, setSche] = useState<ScheType[]>([]);
  const [allSche, setAllSche] = useState<AllScheSearchDTO>({
    mySchedules: [],
    teamSchedules: [],
  });

  const navigate = useNavigate();
  const { refreshCalender } = useCalender();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/member/${userId}`, {
          headers: {
            'Content-Type': 'application/json',
          },
          withCredentials: true,
        });

        if (response.status === 200) {
          setMember(response.data.membername);
        }
      } catch (e) {
        if (axios.isAxiosError<ResponseDataType>(e)) {
          enqueueSnackbar(e.response?.data.message, { variant: 'error' });
        }
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/schedule`, {
          headers: {
            'Content-Type': 'application/json',
          },
          withCredentials: true,
        });

        if (response.status === 200) {
          setAllSche(response.data);
        }
      } catch (e) {
        if (axios.isAxiosError<ResponseDataType>(e)) {
          if (e.response?.status === 401) {
            enqueueSnackbar(e.response?.data.message, { variant: 'error' });
            navigate('/');
          } else {
            enqueueSnackbar(e.response?.data.message, { variant: 'error' });
            navigate(-1);
          }
        }
      }
    };
    fetchData();
  }, [refreshCalender]);

  useEffect(() => {
    setSche(() => [
      ...allSche.mySchedules.map((mySche) => ({
        scheId: mySche.scheId,
        teamId: 0,
        name: mySche.name,
        startDate: new Date(mySche.startTime),
        endDate: new Date(mySche.endTime),
        explanation: mySche.explanation,
        color: '',
      })),
      ...allSche.teamSchedules
        .filter((teamInfo) => !teamInfo.isHide)
        .flatMap(
          (teamInfo) =>
            teamInfo.schedules?.map((Sche) => ({
              scheId: Sche.scheId,
              teamId: teamInfo.teamId,
              name: Sche.name,
              startDate: new Date(Sche.startTime),
              endDate: new Date(Sche.endTime),
              explanation: Sche.explanation,
              color: teamInfo.color,
            })) || [],
        ),
    ]);
  }, [allSche]);
  return (
    <Layout>
      <Grid container sx={{ marginTop: 2, minWidth: '1100px' }}>
        <Grid sx={{ marginLeft: '5vw' }} item xs={8.4} xl={7}>
          <Typography variant="h4" sx={{ color: 'black', marginBottom: 2, maxWidth: 700 }}>
            {member}님의 일정
          </Typography>
          <Calendar width={'800px'} height={'500px'} schedules={sche} isEditable={true} isMyPage={true} />
        </Grid>

        <Grid sx={{ marginLeft: '5vw' }} item xs={2}>
          <TeamShowBox
            teams={allSche.teamSchedules.map((team) => ({
              id: team.teamId,
              name: team.teamname,
              isHide: team.isHide,
              color: team.color,
            }))}
            setState={setAllSche}
          />
          <Grid xs={0.5}></Grid>
        </Grid>
      </Grid>
    </Layout>
  );
}
