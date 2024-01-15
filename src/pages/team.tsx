// import { useRecoilValue } from 'recoil';
import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
// import { userState } from '../state/userState';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';

import TeamTitle from '../components/TeamTitle';
import TeamExp from '../components/TeamExp';
import { Layout } from '../components/Layout';
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
  color: number;
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

  const [teamInfo, setTeamInfo] = useState<TeamInfo>({
    teamname: '',
    color: 0,
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

  const memberList = teamInfo.member.map((member) => member.name);

  return (
    <Layout>
      <Grid container>
        <Grid item xs={8}>
          <TeamTitle title={teamInfo.teamname} />
          <Box sx={{ width: '700px', height: '500px', backgroundColor: 'gray' }}>
            <Calendar />
          </Box>
          <TeamExp explanation={teamInfo.explanation} />
        </Grid>

        <Grid item xs={4} md={4}>
          <CustomBox title="인원명단" items={memberList} />
          <div>
            <button onClick={() => navigate(`/team/${teamId}/schedule`)}>사적모임 일정생성</button>
          </div>
        </Grid>
      </Grid>
    </Layout>
  );
}
