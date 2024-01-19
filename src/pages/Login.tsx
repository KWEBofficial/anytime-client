import { useRecoilState } from 'recoil';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { enqueueSnackbar } from 'notistack';
import axios from 'axios';
import { TextField, Button, Typography, Link, Box, Grid } from '@mui/material';

import { userState } from '../state/userState';
import Intro from '../components/intro';

import '../fonts/fonts.css';

export default function LoginPage() {
  const [input, setInput] = useState({
    email: '',
    password: '',
  });
  const [, setLoginUser] = useRecoilState(userState);

  const navigate = useNavigate();
  function handleInput(event: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target;
    setInput({
      ...input,
      [name]: value,
    });
  }

  async function handleLogin(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    try {
      const response = await axios.post(`${process.env.REACT_APP_API_URL}/auth/login`, input, {
        headers: {
          'Content-Type': 'application/json',
        },
        withCredentials: true,
      });

      if (response.status === 200) {
        setLoginUser(response.data.userId);
        navigate('/main');
        enqueueSnackbar('로그인 되었습니다', { variant: 'success' });
      }
    } catch (e) {
      if (axios.isAxiosError(e) && e.response) {
        const { message } = e.response.data;
        window.alert(message);
      } else {
        window.alert('로그인에 실패했습니다.');
      }
    }
  }

  return (
    <Grid container style={{ height: '100vh' }}>
      <Grid item xs={8}>
        <Intro />
      </Grid>
      <Grid item xs={4} sx={{ backgroundColor: '#d3e9f6', height: '100%' }}>
        <Box sx={{ maxWidth: 300, margin: 'auto', p: 4, marginTop: 10 }}>
          <Typography variant="body2" fontWeight="bold" color="#696969">
            우리 언제 만날래
          </Typography>
          <Typography variant="h4" fontWeight="bold" color="#696969" marginBottom="10px" fontFamily={'GmarketSansBold'}>
            언제든지
          </Typography>
          <form onSubmit={handleLogin}>
            <TextField name="email" label="email" variant="outlined" fullWidth margin="normal" onChange={handleInput} />
            <TextField
              name="password"
              label="password"
              type="password"
              variant="outlined"
              fullWidth
              margin="normal"
              onChange={handleInput}
            />
            <Button type="submit" variant="contained" color="primary" fullWidth style={{ margin: '20px 0' }}>
              로그인
            </Button>
          </form>
          <Typography style={{ textAlign: 'center' }}>
            <Link href="#" onClick={() => navigate('/register')}>
              아직 회원이 아니신가요?
            </Link>
          </Typography>
        </Box>
      </Grid>
    </Grid>
  );
}
