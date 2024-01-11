import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';

import { useModal } from '../useModal';

function Examples() {
  const { openAlert, openPostUploadModal } = useModal();

  const openAlertExample = () => {
    openAlert({
      title: 'Alert Example',
      message: 'Hello Dev.to!',
    });
  };

  const openPostUploadModalExample = () => {
    openPostUploadModal({
      onSubmit: (title, content) => {
        openAlert({
          title: 'Form Data',
          message: `title: ${title} content: ${content}`,
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
          <Button onClick={openPostUploadModalExample}>Form</Button>
        </Grid>
      </Grid>
    </Container>
  );
}

export default Examples;
