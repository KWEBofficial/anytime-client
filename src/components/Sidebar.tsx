import { useNavigate } from 'react-router-dom';
import * as React from 'react';
// import Typography from '@mui/material/Typography';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Toolbar from '@mui/material/Toolbar';
import ListItemText from '@mui/material/ListItemText';
// import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemButton from '@mui/material/ListItemButton';
import ListItem from '@mui/material/ListItem';
import List from '@mui/material/List';
import Drawer from '@mui/material/Drawer';
import Divider from '@mui/material/Divider';
import CssBaseline from '@mui/material/CssBaseline';
import Collapse from '@mui/material/Collapse';
import Box from '@mui/material/Box';
import AppBar from '@mui/material/AppBar';
// import InboxIcon from '@mui/icons-material/MoveToInbox';
// import MailIcon from '@mui/icons-material/Mail';
import SearchIcon from '@mui/icons-material/Search';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import AddIcon from '@mui/icons-material/Add';

import ResponsiveAppBar from './TopNavigation';

import { useModal } from './Modal/useModal';
//import { PromptProps } from './Modal/Prompt/Team';

const drawerWidth = 180;

interface TeamInfo {
  teamId: number;
  teamname: string;
  isPublic: number;
  isAdmin: number;
  isFavor: number;
  isHide: number;
}
export default function ClippedDrawer() {
  const navigate = useNavigate();
  const [openPrivate, setOpenPrivate] = useState(false);
  const [openPublic, setOpenPublic] = useState(false);
  const [myTeam, setMyTeam] = useState<TeamInfo[]>([]);
  const { openAlert, openPrompt } = useModal();

  const handlePrivateClick = () => {
    setOpenPrivate(!openPrivate);
  };

  const handlePublicClick = () => {
    setOpenPublic(!openPublic);
  };

  const navigateToTeam = (teamId: number) => {
    navigate(`/team/${teamId}`);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/team`, {
          headers: {
            'Content-Type': 'application/json',
          },
          withCredentials: true,
        });

        if (response.status === 200) {
          setMyTeam(response.data);
        }
      } catch (e) {
        /* empty */
      }
    };
    fetchData();
  }, []);

  const publicTeamNames = myTeam.filter((team) => team.isPublic === 1).map((team) => team.teamname);
  const publicTeamIds = myTeam.filter((team) => team.isPublic === 1).map((team) => team.teamId);
  const privateTeamNames = myTeam.filter((team) => team.isPublic === 0).map((team) => team.teamname);
  const privateTeamIds = myTeam.filter((team) => team.isPublic === 0).map((team) => team.teamId);

  async function createTeam(teamname: string, explanation: string, color: string, isPublic: boolean) {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/team/create`,
        { teamname: teamname, color: 1, explanation: explanation, isPublic: isPublic },
        {
          headers: {
            'Content-Type': 'application/json',
          },
          withCredentials: true,
        },
      );
      if (response.status === 201) {
        openAlert({ title: '모임이 성공적으로 생성되었습니다' });
      }
    } catch (e) {
      openAlert({ title: '모임 생성에 실패하였습니다..' });
    }
  }

  const createTeamModal = (isPublic: boolean) => {
    openPrompt({
      isPublic: isPublic,
      titleText: '모임 생성',
      buttonText: '생성',
      onSubmit: (title, content, color) => {
        createTeam(title, content, color, isPublic);
      },
    });
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1, boxShadow: 'none' }}>
        <ResponsiveAppBar />
      </AppBar>
      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box' },
        }}
      >
        <Toolbar />
        <Box sx={{ overflow: 'auto' }}>
          <List>
            {['나의일정'].map((text) => (
              <ListItem key={text} disablePadding>
                <ListItemButton onClick={() => navigate('/mypage')}>
                  <ListItemText primary={text} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
          <Divider />
          <List>
            {['사적모임'].map((text) => (
              <React.Fragment key={text}>
                <ListItem disablePadding onClick={handlePrivateClick}>
                  <ListItemButton>
                    <ListItemIcon sx={{ minWidth: 'auto', mr: 1 }} onClick={handlePrivateClick}>
                      {openPrivate ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                    </ListItemIcon>
                    <ListItemText primary={text} />
                    <ListItemIcon sx={{ minWidth: 'auto', mr: 0 }}>
                      <AddIcon onClick={() => createTeamModal(false)} />
                    </ListItemIcon>
                  </ListItemButton>
                </ListItem>
                <Collapse in={openPrivate} timeout="auto" unmountOnExit>
                  {privateTeamNames.map((name, index) => (
                    <ListItemButton
                      key={privateTeamIds[index]}
                      sx={{ pl: 4 }}
                      onClick={() => navigateToTeam(privateTeamIds[index])}
                    >
                      <ListItemText primary={name} />
                    </ListItemButton>
                  ))}
                </Collapse>
              </React.Fragment>
            ))}
          </List>
          <Divider />
          <List>
            {['공적모임'].map((text) => (
              <React.Fragment key={text}>
                <ListItem disablePadding onClick={handlePublicClick}>
                  <ListItemButton>
                    <ListItemIcon sx={{ minWidth: 'auto', mr: 1 }} onClick={handlePublicClick}>
                      {openPublic ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                    </ListItemIcon>
                    <ListItemText primary={text} />
                    <ListItemIcon onClick={() => navigate('/team/search')} sx={{ minWidth: 'auto', mr: 1 }}>
                      <SearchIcon />
                    </ListItemIcon>
                    <ListItemIcon sx={{ minWidth: 'auto', mr: 0 }}>
                      <AddIcon onClick={() => createTeamModal(true)} />
                    </ListItemIcon>
                  </ListItemButton>
                </ListItem>
                <Collapse in={openPublic} timeout="auto" unmountOnExit>
                  {publicTeamNames.map((name, index) => (
                    <ListItemButton
                      key={publicTeamIds[index]}
                      sx={{ pl: 4 }}
                      onClick={() => navigateToTeam(publicTeamIds[index])}
                    >
                      <ListItemText primary={name} />
                    </ListItemButton>
                  ))}
                </Collapse>
              </React.Fragment>
            ))}
          </List>
        </Box>
      </Drawer>
    </Box>
  );
}

/*
      <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
        <ResponsiveAppBar />
      </AppBar>
*/

/*
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Toolbar />
        <Typography paragraph>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore
          magna aliqua. Rhoncus dolor purus non enim praesent elementum facilisis leo vel. Risus at ultrices mi tempus
          imperdiet. Semper risus in hendrerit gravida rutrum quisque non tellus. Convallis convallis tellus id interdum
          velit laoreet id donec ultrices. Odio morbi quis commodo odio aenean sed adipiscing. Amet nisl suscipit
          adipiscing bibendum est ultricies integer quis. Cursus euismod quis viverra nibh cras. Metus vulputate eu
          scelerisque felis imperdiet proin fermentum leo. Mauris commodo quis imperdiet massa tincidunt. Cras tincidunt
          lobortis feugiat vivamus at augue. At augue eget arcu dictum varius duis at consectetur lorem. Velit sed
          ullamcorper morbi tincidunt. Lorem donec massa sapien faucibus et molestie ac.
        </Typography>
      </Box>
*/
