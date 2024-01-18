import { useState } from 'react';
import { enqueueSnackbar } from 'notistack';
import axios from 'axios';
import { Box, Button, TextField } from '@mui/material';

const style = {
  py: 0,
  width: '100%',
  maxWidth: 400,
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

interface InviteFieldProps {
  teamId?: string;
  setTeamInfo?: React.Dispatch<React.SetStateAction<TeamInfo>>;
}

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
      if (response.status === 200) {
        enqueueSnackbar(`${keyword} 유저가 초대되었습니다. `, { variant: 'success' });
        if (setTeamInfo)
          setTeamInfo((prevState) => ({
            ...prevState,
            member: [...prevState.member, { id: member.data.memberId, name: member.data.membername, isAdmin: 0 }],
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
        label="초대할 유저의 e-mail을 입력하세요"
        onChange={(event) => setKeyword(event.target.value)}
        onKeyDown={(event) => {
          if (event.key === 'Enter') handleClick();
        }}
        sx={{ width: '200px' }}
      />
      <Button
        variant="contained"
        color="primary"
        onClick={handleClick}
        sx={{ marginLeft: '5px', backgroundColor: '#d3e9f6', color: '#696969' }}
      >
        초대
      </Button>
    </Box>
  );
}
