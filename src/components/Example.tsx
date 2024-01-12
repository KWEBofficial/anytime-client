import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';

import { useModal } from '../useModal';

function Examples() {
  const { openAlert, openPrompt } = useModal();

  const openAlertExample = () => {
    openAlert({
      title: 'Alert Example',
      message: 'Hello Dev.to!',
    });
  };

  const openPromptExample = () => {
    openPrompt({
      onSubmit: (title, content) => {
        openAlert({
          title: '모임이 생성되었습니다',
          message: `모임 이름: ${title} 모임 설명: ${content}`,
        });
      },
    });
  };

  return (
    <Container maxWidth="sm" sx={{ textAlign: 'center', marginTop: 12 }}>
      <Grid container spacing={2} direction="column">
        <Grid item>
          <Button variant="contained" onClick={openAlertExample}>
            Alert
          </Button>
          <Button onClick={openPromptExample}>Form</Button>
        </Grid>
      </Grid>
    </Container>
  );
}

export default Examples;
