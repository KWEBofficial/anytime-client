import { useNavigate } from 'react-router-dom';
import React from 'react';
import { enqueueSnackbar } from 'notistack';
import axios from 'axios';
import Typography from '@mui/material/Typography';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import AppBar from '@mui/material/AppBar';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

import { useModal } from './Modal/useModal';

interface TeamTitleProps {
  title: string;
  teamId: number;
  onClick?: () => void;
  isAdmin: boolean;
}

export default function TeamTitle({ title, teamId, isAdmin, onClick }: TeamTitleProps) {
  const { openAlert, openPrompt, openConfirm } = useModal();
  const navigate = useNavigate();

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

  async function deleteTeamFunc() {
    try {
      const response = await axios.delete(`${process.env.REACT_APP_API_URL}/team/${teamId}`, {
        headers: {
          'Content-Type': 'application/json',
        },
        withCredentials: true,
      });
      if (response.status === 200) {
        enqueueSnackbar('모임이 삭제되었습니다.', { variant: 'success' });
        navigate(`/main`, { replace: true });
      }
    } catch (e) {
      enqueueSnackbar('모임 삭제에 실패하였습니다.', { variant: 'error' });
    }
  }

  async function exitTeamFunc() {
    try {
      const response = await axios.delete(`${process.env.REACT_APP_API_URL}/team/subscribe/${teamId}`, {
        headers: {
          'Content-Type': 'application/json',
        },
        withCredentials: true,
      });
      if (response.status === 200) {
        enqueueSnackbar('모임에서 탈퇴되었습니다.', { variant: 'success' });
        navigate(`/main`, { replace: true });
      }
    } catch (e) {
      enqueueSnackbar('모임 탈퇴에 실패하였습니다.', { variant: 'error' });
    }
  }

  const deleteTeam = () => {
    openConfirm({
      title: '모임 삭제',
      message: '정말 삭제하시겠습니까?',
      cancelText: '아니오',
      confirmText: '예',
      onConfirm: () => deleteTeamFunc(),
    });
  };

  const exitTeam = () => {
    openConfirm({
      title: '모임 탈퇴',
      message: '정말 탈퇴하시겠습니까?',
      cancelText: '아니오',
      confirmText: '예',
      onConfirm: () => exitTeamFunc(),
    });
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
