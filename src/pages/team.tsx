import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { enqueueSnackbar } from 'notistack';
import axios from 'axios';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';

import { ResponseDataType } from '../models/ResponseDataType';
import { ScheType } from '../models/calendar';
import { useTeamTitle } from '../contexts/teamTitleContext';
import { useCalender } from '../contexts/calenderContext';
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

  const { refreshTitle } = useTeamTitle();
  const { refreshCalender } = useCalender();

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
  }, [teamId, refreshTitle, refreshCalender]);

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

  const height = '500px';
  const width = '800px';
  let isEditable = true;
  if (teamInfo.isPublic) isEditable = false;

  return (
    <Layout>
      <Grid container sx={{ marginTop: 2, minWidth: '1200px' }}>
        <Grid sx={{ marginLeft: '3vw' }} item xs={8} md={7.4} xl={7}>
          <TeamTitle
            title={teamInfo.teamname}
            teamId={teamId as unknown as number}
            isAdmin={teamInfo.isAdmin}
            isPublic={Boolean(teamInfo.isPublic)}
          />
          <TeamExp explanation={teamInfo.explanation} />
          {teamInfo.isPublic ? <NoticeBox notices={teamInfo.notice.map((n) => n.content)} /> : null}
          <Calendar isEditable={isEditable} height={height} width={width} schedules={sches} />
        </Grid>
        <Grid sx={{ marginLeft: '8vw' }} item xs={3}>
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
