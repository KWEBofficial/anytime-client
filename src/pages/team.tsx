// import { useRecoilValue } from 'recoil';
import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
// import { userState } from '../state/userState';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
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

  const onClick = () => {};
  const height = '90vh';
  const width = '55vw';
  const sches = [
    {
      name: 'KWEB 해커톤 최종발표',
      startDate: new Date('2024-01-19'),
      endDate: new Date('2024-01-19'),
      explanation: '우정정보관',
      color: 'red',
    },
    {
      name: '해커톤 시작',
      startDate: new Date('2024-01-08'),
      endDate: new Date('2024-01-13'),
      explanation: 'test1',
      color: 'red',
    },
    {
      name: '해커톤 시작222',
      startDate: new Date('2024-01-02'),
      endDate: new Date('2024-01-04'),
      explanation: 'test2',
      color: 'red',
    },
    {
      name: 'testtest',
      startDate: new Date('2023-12-31'),
      endDate: new Date('2023-12-31'),
      explanation: 'test2',
      color: '',
    },
    {
      name: 'testtttt',
      startDate: new Date('2024-01-29'),
      endDate: new Date('2024-02-02'),
      explanation: 'test2',
      color: '',
    },
    {
      name: 'stacktest',
      startDate: new Date('2024-01-10'),
      endDate: new Date('2024-01-10'),
      explanation: 'test2',
      color: 'blue',
    },
    {
      name: 'stacktest',
      startDate: new Date('2024-01-10'),
      endDate: new Date('2024-01-10'),
      explanation: 'test2',
      color: '',
    },
    {
      name: 'stacktest',
      startDate: new Date('2024-01-10'),
      endDate: new Date('2024-01-10'),
      explanation: 'test2',
      color: '',
    },
    {
      name: 'stacktest',
      startDate: new Date('2024-01-10'),
      endDate: new Date('2024-01-10'),
      explanation: 'test2',
      color: '',
    },
  ];

  return (
    <Layout>
      <Grid container>
        <Grid item xs={8}>
          <TeamTitle title={teamInfo.teamname} />
          <Box sx={{ width: '700px', height: '500px', backgroundColor: 'gray' }}>
            <Calendar onClick={onClick} height={height} width={width} schedules={sches} />
          </Box>
          <TeamExp explanation={teamInfo.explanation} />
        </Grid>

        <Grid item xs={4} md={4}>
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
