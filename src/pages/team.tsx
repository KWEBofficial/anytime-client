// import { useRecoilValue } from 'recoil';
import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
// import { userState } from '../state/userState';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';

import { ScheType } from '../models/calendar';
import TeamTitle from '../components/TeamTitle';
import TeamExp from '../components/TeamExp';
import { Layout } from '../components/Layout';
import { InviteField } from '../components/InviteField';
import CustomBox from '../components/CustomBox';
import { Calendar } from '../components/Calendar/Calendar';

interface TeamSchedule {
  id: number;
  schedulename: string;
  startTime: Date;
  endTime: Date;
  explanation: string;
}
interface TeamMember {
  id: number;
  name: string;
  isAdmin: number;
}
interface TeamInfo {
  teamname: string;
  color: string;
  explanation: string;
  isPublic: number;
  member: TeamMember[];
  schedule: TeamSchedule[];
}

export default function TeamPage() {
  const params = useParams();
  const { teamId } = params;
  const navigate = useNavigate();
  // const userId = useRecoilValue(userState); // {userId}

  const [sches, setSche] = useState<ScheType[]>([]);

  const [teamInfo, setTeamInfo] = useState<TeamInfo>({
    teamname: '',
    color: '',
    explanation: '',
    isPublic: 0,
    member: [],
    schedule: [],
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/team/${teamId}`, {
          headers: {
            'Content-Type': 'application/json',
          },
          withCredentials: true,
        });

        if (response.status === 200) {
          setTeamInfo({
            teamname: response.data.teamname,
            color: response.data.color,
            explanation: response.data.explanation,
            isPublic: response.data.isPublic,
            member: response.data.members,
            schedule: response.data.schedules,
          });
        }
      } catch (e) {
        /* empty */
      }
    };
    fetchData();
  }, [teamId]);

  useEffect(() => {
    setSche(
      teamInfo.schedule.map((t) => {
        const result: ScheType = {
          teamId: teamId as unknown as number,
          scheId: t.id,
          name: t.schedulename,
          startDate: new Date(t.startTime),
          endDate: new Date(t.endTime),
          explanation: t.explanation,
          color: teamInfo.color,
        };
        return result;
      }),
    );
  }, [teamInfo.schedule]);

  const memberList = teamInfo.member.map((member) => member.name);

  const onClick = () => {};
  const height = '90vh';
  const width = '55vw';

  return (
    <Layout>
      <Grid container sx={{ marginTop: 5, minWidth: '1100px' }}>
        <Grid lg={0.5} xl={1}></Grid>
        <Grid item xs={8} xl={7}>
          <TeamTitle title={teamInfo.teamname} />
          <Box sx={{ width: '700px', height: '500px', backgroundColor: 'gray' }}>
            <Calendar onClick={onClick} height={height} width={width} schedules={sches} />
          </Box>
          <TeamExp explanation={teamInfo.explanation} />
        </Grid>

        <Grid item xs={3} xl={4}>
          <InviteField teamId={teamId} setTeamInfo={setTeamInfo} />

          <CustomBox title="인원명단" items={memberList} />
          <Button
            onClick={() => {
              if (teamInfo.isPublic) {
                navigate(`/team/${teamId}/admin`);
              } else {
                navigate(`/team/${teamId}/schedule`);
              }
            }}
            variant="outlined"
            style={{
              width: '100%',
              maxWidth: 300,
              borderRadius: 5,
              border: '2px solid',
              borderColor: 'divider',
              backgroundColor: 'transparent',
              marginBottom: 2,
              color: '#696969',
            }}
          >
            {teamInfo.isPublic ? '공적모임 어드민' : '사적모임 일정생성'}
          </Button>
        </Grid>
      </Grid>
    </Layout>
  );
}
