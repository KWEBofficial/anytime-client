import { Box } from '@mui/material';

import ResponsiveDrawer from '../Sidebar';

interface LayoutProps {
  children: React.ReactNode;
}
export function Layout({ children }: LayoutProps) {
  return (
    <Box display={'flex'} justifyContent={'center'} sx={{ backgroundColor: 'grey' }}>
      <Box width={'100%'} height="100vh">
        <Box height="100%" sx={{ backgroundColor: '#ffffff' }}>
          <ResponsiveDrawer />
          <Box sx={{ flexGrow: 1, p: 3, marginLeft: '180px', marginTop: '60px' }}>{children}</Box>
        </Box>
      </Box>
    </Box>
  );
}
