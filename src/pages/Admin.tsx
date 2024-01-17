import { useRecoilValue } from 'recoil'; // 로그인 유저 정보를 쓰기 위함
import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { enqueueSnackbar } from 'notistack';
import axios from 'axios';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';

import { userState } from '../state/userState'; // 로그인 유저 정보를 쓰기 위함
import TeamTitle from '../components/TeamTitle';
import TeamExp from '../components/TeamExp';
import NoticeBox from '../components/NoticeBox';
import { Layout } from '../components/Layout';
import CustomBox from '../components/CustomBox';
import { Calendar } from '../components/Calendar/Calendar';
// isPublic = true라고 가정
// 1. 모임 삭제, 수정 기능 2. 인원 명단(관리자는 표시) CustomBox를 이용해서 만들기 3. 공지사항 페이지로 이동하게
// 삭제 완 수정은 모달, 완  2. 인원 명단
// NoticeBox 연결 -> 인원 명단에 admin 표시 가능하게 -> 공지사항 페이지 이동 버튼
// 추가할 점: NoticeBox 띄울 수 있는 최대 갯수 제한(prop 줄 때 2개 줘야 했던 거 같기도..), isPrior에 따른 표시 필요
// 인원 명단 admin 표시 -> 관리자, 인원 명단 2개로 따로 박스 만들 것 /놉
// 공지사항 페이지 이동 /완 /로그인 후 어드민 페이지는 잘 오는데 공지사항 페이지로 가면 401에러가 뜸 공지사항 문제일 듯
// withCredentials: true, 를 axios에 추가해야 함
// 관리자에서 인원 명단으로 인원 명단에서 관리자로 갈 수 있게 만들기 /완
// 본인은 관리자에서 제외할 수 없게
// 공지사항은 getNotices를 백에서 2개만 주는 걸로 수정

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
  color: number;
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
  const [teamInfo, setTeamInfo] = useState<TeamReadResDTO>({
    teamname: '',
    color: 0,
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
  const memberList = teamInfo.members.map((member) => member.name);
  const isAdminList = teamInfo.members.map((member) => member.isAdmin);

  return (
    <Layout>
      <Grid container>
        <Grid item xs={8}>
          <TeamTitle title={teamInfo.teamname} onClick={handleDeleteClick} />
          <NoticeBox notices={teamInfo.notices.map((notice) => notice.content)} />
          <Box sx={{ width: '700px', height: '500px', backgroundColor: 'gray' }}>
            <Calendar />
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
