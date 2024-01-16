import { RecoilRoot } from 'recoil';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material';

import { RouteComponent } from './route';

import './App.css';
import { ModalContextProvider } from './components/Modal/useModal';

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
  return (
    <RecoilRoot>
      <ThemeProvider theme={theme}>
        <BrowserRouter>
          <RouteComponent />
        </BrowserRouter>
      </ThemeProvider>
    </RecoilRoot>
  );

  /*}

    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <RouteComponent />
        <ModalContextProvider>
          <Examples />
        </ModalContextProvider>
        <FormDialog />
        <Alarm />

        
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
 
      </BrowserRouter>
    </ThemeProvider>
    {*/
}

export default App;
