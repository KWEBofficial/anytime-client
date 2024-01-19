import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';

import { useModal } from './Modal/useModal';

function Examples() {
  const { openAlert, openConfirm, openSchedulePrompt } = useModal();

  const openAlertExample = () => {
    openAlert({
      title: 'Alert Example',
      message: 'Message',
    });
  };

  const createSchedule = () => {
    openSchedulePrompt({
      isEmpty: true,
      onSubmit: (title, content, start, end) => {
        openAlert({
          title: '일정이 생성되었습니다',
          message: `${title} ${content} ${start} ${end} `,
        });
      },
    });
  };

  const editSchedule = () => {
    openSchedulePrompt({
      isEmpty: false,
      onSubmit: (title, content, start, end) => {
        openAlert({
          title: '일정이 수정되었습니다',
          message: `${title} ${content} ${start} ${end} `,
        });
      },
    });
  };

  const openConfirmExample = () => {
    openConfirm({
      title: 'Confirm Example',
      message: 'Confirm Message',
      cancelText: 'NO',
      confirmText: 'YES',
      onCancel: () => openAlert({ message: 'clicked NO' }),
      onConfirm: () => openAlert({ message: 'clicked YES' }),
    });
  };

  return (
    <Container maxWidth="sm" sx={{ textAlign: 'center', marginTop: 12 }}>
      <Grid container spacing={2} direction="column">
        <Grid item>
          <Button onClick={openAlertExample}>Alert</Button>
          <Button onClick={openConfirmExample}>Confirm</Button>
          <Button onClick={createSchedule}>일정 생성</Button>
          <Button onClick={editSchedule}>일정 확인</Button>
        </Grid>
      </Grid>
    </Container>
  );
}

export default Examples;
