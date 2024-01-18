import { useRecoilValue } from 'recoil';
import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { enqueueSnackbar } from 'notistack';
import axios from 'axios';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';

import { userState } from '../state/userState';
import { ScheType } from '../models/calendar';
import TeamTitle from '../components/TeamTitle';
import TeamExp from '../components/TeamExp';
import NoticeBox from '../components/NoticeBox';
import { Layout } from '../components/Layout';
import CustomBox from '../components/CustomBox';
import { isDeclareInterface } from '@babel/types';
import { Calendar } from '../components/Calendar/Calendar';
// import { Calendar } from '../components/Calendar/Calendar';

interface TeamSchedule {
  id: number;
  schedulename: string;
  startTime: Date;
  endTime: Date;
  explanation: string;
}
interface NoticeResDTO {
  noticeId: number;
  content: string;
  createdAt: Date;
  isPrior: boolean;
}
interface TeamMemberDTO {
  id: number;
  name: string;
  isAdmin: boolean;
}
interface TeamReadResDTO {
  teamname: string;
  color: string;
  explanation: string;
  isPublic: boolean;
  members: TeamMemberDTO[];
  schedules: TeamSchedule[];
  notices: NoticeResDTO[];
  isAdmin: boolean;
}

export default function AdminPage() {
  const params = useParams();
  const { teamId } = params;
  const navigate = useNavigate();
  const userId = useRecoilValue(userState);
  const [sche, setSche] = useState<ScheType[]>([]);
  const [teamInfo, setTeamInfo] = useState<TeamReadResDTO>({
    teamname: '',
    color: '',
    explanation: '',
    isPublic: false,
    members: [],
    schedules: [],
    notices: [],
    isAdmin: false,
  });
  const handleDeleteClick = async () => {
    const fetchData = async () => {
      await axios.delete(`${process.env.REACT_APP_API_URL}/team/${teamId}`, {
        headers: {
          'Content-Type': 'application/json',
        },
        withCredentials: true,
      });
    };

    if (window.confirm('정말 삭제하시겠습니까?')) {
      fetchData();
      navigate('/main');
      enqueueSnackbar('모임이 삭제되었습니다', { variant: 'success' });
    }
  };

  const handleMemberClick = async (event: React.MouseEvent<HTMLDivElement, MouseEvent>, index: number) => {
    try {
      if (teamInfo.members[index].id === userId) {
        enqueueSnackbar('본인의 권한은 변경할 수 없습니다.', { variant: 'error' });
        return;
      }
      const response = await axios.patch(
        `${process.env.REACT_APP_API_URL}/team/admin`,
        { memberId: teamInfo.members[index].id, teamId, isAdmin: !teamInfo.members[index].isAdmin },
        {
          headers: {
            'Content-Type': 'application/json',
          },
          withCredentials: true,
        },
      );
      if (response.status === 200) {
        setTeamInfo({
          ...teamInfo,
          members: [
            ...teamInfo.members.slice(0, index), // 기존 members 배열에서 해당 인덱스 이전의 요소들을 그대로 복사
            {
              ...teamInfo.members[index], // 해당 인덱스에 있는 객체를 복사
              isAdmin: !teamInfo.members[index].isAdmin, // 또는 다른 값을 할당
            },
            ...teamInfo.members.slice(index + 1), // 해당 인덱스 이후의 요소들을 그대로 복사
          ],
        });
        enqueueSnackbar('권한이 변경되었습니다', { variant: 'success' });
      }
    } catch (e) {
      /* empty */
    }
  };

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
            members: response.data.members,
            schedules: response.data.schedules,
            notices: response.data.notices,
            isAdmin: response.data.isAdmin,
          });
        }
      } catch (e) {
        /* empty */
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    setSche(
      teamInfo.schedules.map((Sche) => ({
        scheId: Sche.id,
        teamId: Number(teamId),
        name: Sche.schedulename,
        startDate: new Date(Sche.startTime),
        endDate: new Date(Sche.endTime),
        explanation: Sche.explanation,
        color: teamInfo.color,
      })),
    );
  }, [teamInfo.schedules]);

  const memberList = teamInfo.members.map((member) => member.name);
  const isAdminList = teamInfo.members.map((member) => member.isAdmin);

  return (
    <Layout>
      <Grid container>
        <Grid item xs={8}>
          <TeamTitle title={teamInfo.teamname} onClick={handleDeleteClick} />
          <NoticeBox notices={teamInfo.notices.map((notice) => notice.content)} />

          <Box sx={{ width: '700px', height: '500px', backgroundColor: 'gray' }}>
            <Calendar width="700px" height="800px" schedules={sche} isEditable={true} />
          </Box>

          <TeamExp explanation={teamInfo.explanation} />
        </Grid>
        <Grid item xs={4} md={4}>
          <CustomBox title="인원명단" items={memberList} isAdmins={isAdminList} onClick={handleMemberClick} />
          <Button
            onClick={() => {
              navigate(`/notice/${teamId}`);
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
            공지사항 페이지
          </Button>
        </Grid>
      </Grid>
    </Layout>
  );
}
