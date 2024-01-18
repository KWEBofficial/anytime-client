// import { useRecoilValue } from 'recoil';
import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
// import { userState } from '../state/userState';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';

import TeamTitle from '../components/TeamTitle';
import TeamScheduleList from '../components/TeamSchduleList/TeamScheduleList';
import TeamExp from '../components/TeamExp';
import NoticeBox from '../components/NoticeBox';
import { Layout } from '../components/Layout';
import { InviteField } from '../components/InviteField';
import CustomBox from '../components/CustomBox';
import { Calendar } from '../components/Calendar/Calendar';

const buttonStyle = {
  width: '100%',
  maxWidth: 300,
  borderRadius: 5,
  border: '2px solid',
  borderColor: 'divider',
  backgroundColor: 'transparent',
  marginBottom: 2,
  color: '#696969',
};

interface TeamNotice {
  noticeId: number;
  content: string;
  createdAt: Date;
  isPrior: boolean;
}
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
  notice: TeamNotice[];
  isAdmin: number;
}

export default function TeamPage() {
  const params = useParams();
  const { teamId } = params;
  const navigate = useNavigate();

  const [teamInfo, setTeamInfo] = useState<TeamInfo>({
    teamname: '',
    color: 0,
    explanation: '',
    isPublic: 0,
    member: [],
    schedule: [],
    notice: [],
    isAdmin: 0,
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
            notice: response.data.notices,
            isAdmin: response.data.isAdmin,
          });
        }
      } catch (e) {
        /* empty */
      }
    };
    fetchData();
  }, [teamId]);

  const memberList = teamInfo.member.map((member) => member.name);
  const adminList = teamInfo.member.filter((member) => member.isAdmin === 1).map((member) => member.name);

  const pageButton = () => {
    if (teamInfo.isPublic && teamInfo.isAdmin) {
      return (
        <Button onClick={() => navigate(`/team/${teamId}/admin`)} variant="outlined" style={buttonStyle}>
          어드민 페이지
        </Button>
      );
    }
    if (!teamInfo.isPublic) {
      return (
        <Button onClick={() => navigate(`/team/${teamId}/schedule`)} variant="outlined" style={buttonStyle}>
          일정 생성 페이지
        </Button>
      );
    }
    return null;
  };

  const onClick = () => {};
  const height = '90vh';
  const width = '55vw';
  const sches = [
    {
      scheId: 1,
      teamId: 2,
      name: 'KWEB 해커톤 최종발표',
      startDate: new Date('2024-01-19'),
      endDate: new Date('2024-01-19'),
      explanation: '우정정보관',
      color: 'red',
    },
    {
      scheId: 2,
      teamId: 2,
      name: '해커톤 시작',
      startDate: new Date('2024-01-08'),
      endDate: new Date('2024-01-13'),
      explanation: 'test1',
      color: 'red',
    },
    {
      scheId: 3,
      teamId: 2,
      name: '해커톤 시작222',
      startDate: new Date('2024-01-02'),
      endDate: new Date('2024-01-04'),
      explanation: 'test2',
      color: 'red',
    },
    {
      scheId: 4,
      teamId: 2,
      name: 'testtest',
      startDate: new Date('2023-12-31'),
      endDate: new Date('2023-12-31'),
      explanation: 'test2',
      color: '',
    },
    {
      scheId: 5,
      teamId: 2,
      name: 'testtttt',
      startDate: new Date('2024-01-29'),
      endDate: new Date('2024-02-02'),
      explanation: 'test2',
      color: '',
    },
    {
      scheId: 6,
      teamId: 2,
      name: 'stacktest',
      startDate: new Date('2024-01-10'),
      endDate: new Date('2024-01-10'),
      explanation: 'test2',
      color: 'blue',
    },
    {
      scheId: 7,
      teamId: 2,
      name: 'stacktest',
      startDate: new Date('2024-01-10'),
      endDate: new Date('2024-01-10'),
      explanation: 'test2',
      color: '',
    },
    {
      scheId: 8,
      teamId: 2,
      name: 'stacktest',
      startDate: new Date('2024-01-10'),
      endDate: new Date('2024-01-10'),
      explanation: 'test2',
      color: '',
    },
    {
      scheId: 9,
      teamId: 2,
      name: 'stacktest',
      startDate: new Date('2024-01-10'),
      endDate: new Date('2024-01-10'),
      explanation: 'test2',
      color: '',
    },
  ];

  return (
    <Layout>
      <Grid container sx={{ marginTop: 2, minWidth: '1100px' }}>
        <Grid lg={0.5} xl={1}></Grid>
        <Grid item xs={8} xl={7}>
          <TeamTitle title={teamInfo.teamname} />
          <TeamExp explanation={teamInfo.explanation} />
          {teamInfo.isPublic ? <NoticeBox notices={teamInfo.notice.map((n) => n.content)} /> : null}
          <Calendar onClick={onClick} height={height} width={width} schedules={sches} />
        </Grid>
        <Grid item xs={3} xl={4}>
          <InviteField teamId={teamId} setTeamInfo={setTeamInfo} />
          {teamInfo.isPublic ? (
            <CustomBox title="관리자" items={adminList} />
          ) : (
            <CustomBox title="만날 사람들" items={memberList} />
          )}
          <TeamScheduleList teamSche={teamInfo.schedule} />
          {pageButton()}
        </Grid>
      </Grid>
    </Layout>
  );
}
