import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';

import { useModal } from '../useModal';

function Examples() {
  const { openAlert, openPrompt, openConfirm, openSchedulePrompt } = useModal();

  const openAlertExample = () => {
    openAlert({
      title: 'Alert Example',
      message: 'Hello Dev.to!',
    });
  };
  /*}
  const createTeam = () => {
    openPrompt({
      onSubmit: (title, content, color) => {
        openAlert({
          title: '모임이 생성되었습니다',
          message: `모임 이름: ${title} 모임 설명: ${content} 모임 색상: ${color}`,
        });
      },
    });
  };
{*/

  const createSchedule = () => {
    openSchedulePrompt({
      onSubmit: (title, content, start, end) => {
        openAlert({
          title: '일정이 생성되었습니다',
          message: `${title} ${content} ${start} ${end} `,
        });
      },
    });
  };

  const openConfirmExample = () => {
    openConfirm({
      title: 'Confirm Example',
      message: 'Do you like this post?',
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
          <Button variant="contained" onClick={openAlertExample}>
            Alert
          </Button>
          <Button onClick={openConfirmExample}>Confirm</Button>
          <Button onClick={createSchedule}>일정 생성</Button>
        </Grid>
      </Grid>
    </Container>
  );
}

export default Examples;
