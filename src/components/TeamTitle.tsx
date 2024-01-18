import React from 'react';
import Typography from '@mui/material/Typography';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import AppBar from '@mui/material/AppBar';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

import { useModal } from './Modal/useModal';

interface TeamTitleProps {
  title: string;
  onClick?: () => void;
}

export default function TeamTitle({ title, onClick }: TeamTitleProps) {
  const { openAlert, openPrompt } = useModal();

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

  return (
    <AppBar position="static" sx={{ backgroundColor: '#fff', boxShadow: 'none' }}>
      <Toolbar>
        <Typography variant="h3" sx={{ color: '#696969', marginRight: '300px', marginBottom: 2 }}>
          {title}
        </Typography>
        <IconButton sx={{ color: '#696969' }} aria-label="Edit">
          <EditIcon onClick={() => editTeam(true)} />
        </IconButton>
        <IconButton sx={{ color: '#696969' }} aria-label="Delete" onClick={onClick}>
          <DeleteIcon />
        </IconButton>
      </Toolbar>
    </AppBar>
  );
}
