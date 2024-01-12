import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material';

import { RouteComponent } from './route';
// import { Layout } from './components/Layout';

import './App.css';
import { useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

import CustomModal from './components/modal';
import React from 'react';
import FormDialog from './components/dialog';
import ColorPick from './components/colorPick';
import { ModalContextProvider } from './useModal';
import Examples from './components/Example';

/**
 * mui에서 제공하는 테마 설정입니다.
 * 글꼴을 Pretendard로 설정했습니다.
 */
const theme = createTheme({
  typography: {
    fontFamily: 'Pretendard-Regular',
  },
});

/**
 * ThemeProvider : 위에서 설정한 테마를 적용하는 Provider(아직은 뭔지 몰라도 됩니다)
 * BrowserRouter : 브라우저의 주소를 관리하는 Provider, 이게 있어야 react router를 사용하여 url 주소를 관리할 수 있습니다.
 * Layout : 페이지의 레이아웃을 담당하는 컴포넌트입니다. 모든 페이지에 들어가야 할 컴포넌트(BottomNavigation 등)을 넣었습니다.
 * RouteComponent : 페이지의 라우팅을 담당하는 컴포넌트입니다. 페이지의 주소와 페이지를 매칭시켜줍니다.
 */
function App() {
  const [open, setOpen] = React.useState(false);
  const openModal = () => setOpen(true);
  const closeModal = () => setOpen(false);
  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <RouteComponent />
        <ModalContextProvider>
          <Examples />
        </ModalContextProvider>
        <FormDialog />

        {/*}
           <ModalContextProvider>
            <Examples />
          </ModalContextProvider>
          <div>
            <button onClick={openModal}>Open Modal</button>
            <CustomModal isOpen={open} closeModal={closeModal}>
              <Box>
                <Typography variant="h6" component="h2">
                  hi
                </Typography>
                <Typography sx={{ mt: 2 }}>it's me</Typography>
              </Box>
            </CustomModal>
          </div>
  {*/}
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
