import { useNavigate } from 'react-router-dom';
import React from 'react';
import axios from 'axios';
import Typography from '@mui/material/Typography';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import AppBar from '@mui/material/AppBar';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

import { useSidebar } from '../contexts/sidebarContext';

import { useModal } from './Modal/useModal';

interface TeamTitleProps {
  title: string;
  teamId: number;
  onClick?: () => void;
  isAdmin: boolean;
}

export default function TeamTitle({ title, teamId, isAdmin, onClick }: TeamTitleProps) {
  const { openAlert, openPrompt } = useModal();
  const navigate = useNavigate();
  const { refresh } = useSidebar();

  const editTeam = (isPublic: boolean) => {
    openPrompt({
      isPublic,
      titleText: '모임 수정',
      buttonText: '수정',
      onSubmit: (teamName, content, color) => {
        openAlert({
          title: '모임 정보가 수정되었습니다',
          message: `모임 이름: ${teamName} 모임 설명: ${content} 모임 색상: ${color}`,
        });
      },
    });
  };

  const deleteTeam = async () => {
    try {
      const response = await axios.delete(`${process.env.REACT_APP_API_URL}/team/${teamId}`, {
        headers: {
          'Content-Type': 'application/json',
        },
        withCredentials: true,
      });
      if (response.status === 200) {
        openAlert({ title: '모임이 삭제되었습니다.' });
        refresh();
        navigate(`/main`, { replace: true });
      }
    } catch (e) {
      openAlert({ title: '모임 삭제를 실패하였습니다..' });
    }
  };

  const exitTeam = async () => {
    try {
      const response = await axios.delete(`${process.env.REACT_APP_API_URL}/team/subscribe/${teamId}`, {
        headers: {
          'Content-Type': 'application/json',
        },
        withCredentials: true,
      });
      if (response.status === 200) {
        openAlert({ title: '모임에서 탈퇴되었습니다.' });
        refresh();
        navigate(`/main`, { replace: true });
      }
    } catch (e) {
      openAlert({ title: '모임 탈퇴를 실패하였습니다..' });
    }
  };

  return (
    <AppBar position="static" sx={{ backgroundColor: '#fff', boxShadow: 'none' }}>
      <Toolbar>
        <Typography variant="h3" sx={{ color: '#696969', marginRight: '300px', marginBottom: 2 }}>
          {title}
        </Typography>
        {isAdmin ? (
          <IconButton sx={{ color: '#696969' }} aria-label="Edit">
            <EditIcon onClick={() => editTeam(true)} />
          </IconButton>
        ) : null}
        <IconButton sx={{ color: '#696969' }} aria-label="Delete" onClick={onClick}>
          {isAdmin ? <DeleteIcon onClick={() => deleteTeam()} /> : <DeleteIcon onClick={() => exitTeam()} />}
        </IconButton>
      </Toolbar>
    </AppBar>
  );
}
