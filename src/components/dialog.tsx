import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import ColorPick from './colorPick';
import Box from '@mui/material/Box';

export default function FormDialog() {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <React.Fragment>
      <Button variant="outlined" onClick={handleClickOpen}>
        Open form
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>모임 생성</DialogTitle>
        <DialogContent>
          <DialogContentText>모임 정보를 입력해주세요</DialogContentText>
          <TextField required margin="dense" id="name" label="모임 이름" type="string" fullWidth variant="standard" />
          <TextField
            margin="dense"
            id="explanation"
            label="모임 설명"
            type="string"
            fullWidth
            multiline
            maxRows={4}
            variant="standard"
          />
          <ColorPick />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>취소</Button>
          <Button onClick={handleClose}>생성</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
