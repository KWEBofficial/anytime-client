import React from 'react';
import Typography from '@mui/material/Typography';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import AppBar from '@mui/material/AppBar';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

interface TeamTitleProps {
  title: string;
}

export default function TeamTitle({ title }: TeamTitleProps) {
  return (
    <AppBar position="static" sx={{ backgroundColor: '#fff', boxShadow: 'none' }}>
      <Toolbar>
        <Typography variant="h3" sx={{ color: '#696969', marginRight: '200px' }}>
          {title}
        </Typography>
        <IconButton sx={{ color: '#696969' }} aria-label="Edit">
          <EditIcon />
        </IconButton>
        <IconButton sx={{ color: '#696969' }} aria-label="Delete">
          <DeleteIcon />
        </IconButton>
      </Toolbar>
    </AppBar>
  );
}
