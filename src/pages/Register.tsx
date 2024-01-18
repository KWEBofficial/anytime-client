import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { enqueueSnackbar } from 'notistack';
import axios from 'axios';
import { Box, Button, Divider, Stack, Typography } from '@mui/material';

import { CustomTextfield } from '../components/CustomTextfield';

/**
 * 유저 생성 페이지입니다.
 * 회원가입을 위한 정보를 입력받습니다.
 * 회원가입 버튼을 누르면 백엔드 서버에 회원가입 요청을 보냅니다.
 */
export default function RegisterPage() {
  const [input, setInput] = useState({
    email: '',
    membername: '',
    password: '',
    passwordConfirm: '',
  });

  const [errMessage, setErrMessage] = useState({
    email: '',
    membername: '',
    password: '',
    passwordConfirm: '',
  });

  const [isErr, setIsErr] = useState({
    email: false,
    membername: false,
    password: false,
    passwordConfirm: false,
  });
  const navigate = useNavigate();

  function onChange(event: React.ChangeEvent<HTMLInputElement>) {
    setInput({
      ...input,
      [event.target.id]: event.target.value,
    });
    const message = validation(event.target.value, event.target.id);
    if (message) {
      setErrMessage({
        ...errMessage,
        [event.target.id]: message,
      });
      setIsErr({
        ...isErr,
        [event.target.id]: true,
      });
    } else {
      setErrMessage({
        ...errMessage,
        [event.target.id]: '',
      });
      setIsErr({
        ...isErr,
        [event.target.id]: false,
      });
    }
  }
  function validation(value: string, id: string): string {
    const emailErrMessage = '이메일 형식으로 작성해주세요.';
    const emailLenErrMessage = '64자 이하여야 합니다.';
    const pwErrMessage = '적어도 하나 이상의 영문자, 숫자가 필요하며 8자 이상 입력해주세요.';
    const pwConErrMessage = '비밀번호와 일치하지 않습니다.';
    const emailRegExp = /^[a-zA-z0-9._-]+@[a-zA-z0-9.-]+\.[a-zA-z.]+$/;
    const passwordRegExp = /^(?=.*[a-zA-Z])(?=.*[0-9]).{8,25}$/;
    if (id === 'email') {
      if (value.length > 64) return emailLenErrMessage;
      if (!emailRegExp.test(value)) return emailErrMessage;
    }
    if (id === 'password' && !passwordRegExp.test(value)) return pwErrMessage;
    if (id === 'passwordConfirm' && input.password !== value) return pwConErrMessage;
    return '';
  }

  async function handleRegister() {
    try {
      if (Object.values(input).some((value) => value === '')) window.alert('내용을 입력하시기 바랍니다.');
      else if (Object.values(isErr).some((value) => value)) window.alert('요구사항을 충족하지 않았습니다.');
      else {
        const response = await axios.post(
          `${process.env.REACT_APP_API_URL}/auth/register`,
          { email: input.email, membername: input.membername, password: input.password },
          {
            headers: {
              'Content-Type': 'application/json',
            },
            withCredentials: true,
          },
        );
        if (response.status === 200) {
          navigate('/');
          enqueueSnackbar('회원가입이 완료되었습니다.', { variant: 'success' });
        }
      }
    } catch (e) {
      enqueueSnackbar('회원가입에 실패했습니다.', { variant: 'error' });
    }
  }

  return (
    <Box
      padding={2}
      paddingTop={4}
      width={400}
      marginTop={10}
      marginX="auto"
      boxShadow="0px 4px 8px rgba(0, 0, 0, 0.2)"
    >
      <Box marginBottom={4} textAlign={'center'}>
        <Typography variant="h4">Register</Typography>
      </Box>
      <Box>
        <Box marginY={2}>
          <Divider />
        </Box>
        <Stack spacing={3}>
          <CustomTextfield
            error={isErr.email}
            helperText={errMessage.email}
            required={true}
            id="email"
            label="e-mail"
            onChange={onChange}
            onKeyDown={(event) => {
              if (event.key === 'Enter') handleRegister();
            }}
          />
          <CustomTextfield
            type="password"
            error={isErr.password}
            helperText={errMessage.password}
            required={true}
            id="password"
            label="비밀번호"
            onChange={onChange}
            onKeyDown={(event) => {
              if (event.key === 'Enter') handleRegister();
            }}
          />

          <CustomTextfield
            type="password"
            error={isErr.passwordConfirm}
            helperText={errMessage.passwordConfirm}
            required={true}
            id="passwordConfirm"
            label="비밀번호 확인"
            onChange={onChange}
            onKeyDown={(event) => {
              if (event.key === 'Enter') handleRegister();
            }}
          />

          <CustomTextfield
            error={isErr.membername}
            helperText={errMessage.membername}
            required={true}
            id="membername"
            label="이름"
            onChange={onChange}
            onKeyDown={(event) => {
              if (event.key === 'Enter') handleRegister();
            }}
          />
        </Stack>
      </Box>
      <Box paddingY={6} marginX={'auto'} width={350}>
        <Button fullWidth variant="contained" color="primary" onClick={handleRegister}>
          회원 가입
        </Button>
      </Box>
    </Box>
  );
}
