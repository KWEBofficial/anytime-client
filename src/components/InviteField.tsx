import { useState } from 'react';
import { enqueueSnackbar } from 'notistack';
import axios from 'axios';
import { Box, Button, TextField } from '@mui/material';
// 초대하고자 하는 멤버의 id를 email로 조회
// 그 id와 teamId를 넘겨서 초대
const style = {
  py: 0,
  width: '100%',
  maxWidth: 400,
  marginBottom: 2,
  color: '#696969',
};
interface TeamMemberDTO {
  id: number;
  name: string;
  isAdmin: boolean;
}
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
interface InviteFieldProps {
  teamId?: string;
  setTeamInfo: React.Dispatch<React.SetStateAction<TeamReadResDTO>>;
}
// 멤버를 초대하고 인원 명단에 바로 추가되었으면 함
// 그럼 state에 추가해야 함
//
export function InviteField({ teamId, setTeamInfo }: InviteFieldProps) {
  const [keyword, setKeyword] = useState('');

  const handleClick = async () => {
    try {
      const member = await axios.get(`${process.env.REACT_APP_API_URL}/member/search`, {
        params: { email: keyword },
        headers: {
          'Content-Type': 'application/json',
        },
        withCredentials: true,
      });
      const Id = member.data.memberId;
      console.log(member.data);
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/team/member`,
        { teamId, memberId: Id },
        {
          headers: {
            'Content-Type': 'application/json',
          },
          withCredentials: true,
        },
      );
      console.log(response);
      if (response.status === 200) {
        enqueueSnackbar(`${keyword} 유저가 초대되었습니다. `, { variant: 'success' });
        setTeamInfo((prevState) => ({
          ...prevState,
          members: [...prevState.members, { id: member.data.memberId, name: member.data.membername, isAdmin: false }],
        }));
      }
    } catch (e) {
      enqueueSnackbar('초대에 실패했습니다.', { variant: 'error' });
    }
  };
  return (
    <Box sx={style}>
      <TextField
        size="small"
        id="keyword"
        label="유저의 e-mail을 입력하세요"
        onChange={(event) => setKeyword(event.target.value)}
        onKeyDown={(event) => {
          if (event.key === 'Enter') handleClick();
        }}
      />
      <Button variant="contained" color="primary" onClick={handleClick} sx={{ marginLeft: '3px' }}>
        초대
      </Button>
    </Box>
  );
}
