import { RecoilRoot } from 'recoil';
import { BrowserRouter } from 'react-router-dom';
import { SnackbarProvider } from 'notistack';
import { ThemeProvider, createTheme } from '@mui/material';

import { RouteComponent } from './route';
import './App.css';
import { TeamTitleProvider } from './contexts/teamTitleContext';
import { SidebarProvider } from './contexts/sidebarContext';
import { CalenderProvider } from './contexts/calenderContext';
import { ModalContextProvider } from './components/Modal/useModal';

const theme = createTheme({
  typography: {
    fontFamily: 'Pretendard-Regular',
  },
});

function App() {
  return (
    <ModalContextProvider>
      <CalenderProvider>
        <SidebarProvider>
          <TeamTitleProvider>
            <SnackbarProvider maxSnack={3}>
              <RecoilRoot>
                <ThemeProvider theme={theme}>
                  <BrowserRouter>
                    <RouteComponent />
                  </BrowserRouter>
                </ThemeProvider>
              </RecoilRoot>
            </SnackbarProvider>
          </TeamTitleProvider>
        </SidebarProvider>
      </CalenderProvider>
    </ModalContextProvider>
  );
}

export default App;
