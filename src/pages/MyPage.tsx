import { useRecoilValue } from 'recoil';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { Box, Grid, Typography } from '@mui/material';

import { userState } from '../state/userState';
import { AllScheSearchDTO } from '../models/AllScheSearch';
import TeamShowBox from '../components/TeamShowBox/TeamShowBox';
import { useModal } from '../components/Modal/useModal';
import { Layout } from '../components/Layout';
import { Calendar } from '../components/Calendar/Calendar';
// import Examples from '../components/Example';

// 일단 컴포넌트 대충 배열
// sche:scheType[] 만들기 useEffect로 teamInfo가 바뀌면 다시 만들도록
// teamShowBox에서 ishide 바뀌면 axios랑 teamInfo의 ishide가 바뀌게 만들어서 useEffect 할 수 있도록 하면 sche가 새롭게 업데이트 되겠지?
//

interface ScheType {
  scheId: number;
  teamId: number;
  name: string;
  startDate: Date;
  endDate: Date;
  explanation: string;
  color: string; // 개인 일정의 경우 color를 빈 문자열로 설정하시면 됩니다.
}
export default function MyPage() {
  const userId = useRecoilValue(userState);
  const [member, setMember] = useState();
  const [sche, setSche] = useState<ScheType[]>([]);
  const [allSche, setAllSche] = useState<AllScheSearchDTO>({
    mySchedules: [],
    teamSchedules: [],
  });
  const { openAlert, openSchedulePrompt } = useModal();

  const editSchedule = (Sche: ScheType) => {
    if (Sche.teamId)
      openSchedulePrompt({
        isEmpty: false,
        onSubmit: (title, content, start, end) => {
          openAlert({
            title: '일정이 수정되었습니다',
            message: `${title} ${content} ${start} ${end} `,
          });
        },
      });
  };

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
        /* empty */
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
        /* empty */
      }
    };
    fetchData();
  }, []);

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
      <Grid container sx={{ marginTop: 5, minWidth: '1100px' }}>
        <Grid lg={0.5} xl={1}></Grid>
        <Grid item xs={8} xl={7}>
          <Typography variant="h3" sx={{ color: '#696969', marginRight: '300px', marginBottom: 2 }}>
            {member}
          </Typography>
          <Box sx={{ width: '700px', height: '500px', backgroundColor: 'gray' }}>
            <Calendar width={'55vw'} height={'90vh'} schedules={sche} onClick={editSchedule} />
          </Box>
        </Grid>

        <Grid item xs={3} xl={4}>
          <TeamShowBox
            teams={allSche.teamSchedules.map((team) => ({
              id: team.teamId,
              name: team.teamname,
              isHide: team.isHide,
              color: team.color,
            }))}
            setState={setAllSche}
          />
        </Grid>
      </Grid>
    </Layout>
  );
}
