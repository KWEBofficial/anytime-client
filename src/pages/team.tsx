// import { useRecoilValue } from 'recoil';
import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
// import { userState } from '../state/userState';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';

import { ScheType } from '../models/calendar';
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
  color: string;
  explanation: string;
  isPublic: number;
  member: TeamMember[];
  schedule: TeamSchedule[];
  notice: TeamNotice[];
  isAdmin: boolean;
}

export default function TeamPage() {
  const params = useParams();
  const { teamId } = params;
  const navigate = useNavigate();

  const [sches, setSche] = useState<ScheType[]>([]);

  const [teamInfo, setTeamInfo] = useState<TeamInfo>({
    teamname: '',
    color: '',
    explanation: '',
    isPublic: 0,
    member: [],
    schedule: [],
    notice: [],
    isAdmin: true,
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

  return (
    <Layout>
      <Grid container sx={{ marginTop: 2, minWidth: '1100px' }}>
        <Grid lg={0.5} xl={1}></Grid>
        <Grid item xs={8} xl={7}>
          <TeamTitle title={teamInfo.teamname} teamId={teamId as unknown as number} isAdmin={teamInfo.isAdmin} />
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
