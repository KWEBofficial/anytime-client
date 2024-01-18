import { useNavigate } from 'react-router-dom';
import * as React from 'react';
import { useEffect, useState } from 'react';
import { enqueueSnackbar } from 'notistack';
import axios from 'axios';
import Toolbar from '@mui/material/Toolbar';
import ListItemText from '@mui/material/ListItemText';
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
import StarRoundedIcon from '@mui/icons-material/StarRounded';
import StarBorderRoundedIcon from '@mui/icons-material/StarBorderRounded';
import SearchIcon from '@mui/icons-material/Search';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import AddIcon from '@mui/icons-material/Add';

import { useSidebar } from '../contexts/sidebarContext';

import ResponsiveAppBar from './TopNavigation';
import { useModal } from './Modal/useModal';
// import { PromptProps } from './Modal/Prompt/Team';

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
  const [publicIsFavor, setPublicIsFavor] = useState<number[]>([]);
  const [privateIsFavor, setPrivateIsFavor] = useState<number[]>([]);
  const { openPrompt } = useModal();
  const { refresh } = useSidebar();

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
          const { data } = response;
          setMyTeam(data);

          const initialPublicIsFavor = data
            .filter((team: TeamInfo) => team.isPublic === 1)
            .map((team: TeamInfo) => (team.isFavor === 1 ? 1 : 0));
          const initialPrivateIsFavor = data
            .filter((team: TeamInfo) => team.isPublic === 0)
            .map((team: TeamInfo) => (team.isFavor === 1 ? 1 : 0));
          setPublicIsFavor(initialPublicIsFavor);
          setPrivateIsFavor(initialPrivateIsFavor);
        }
      } catch (e) {
        /* empty */
      }
    };
    fetchData();
  }, [refresh]);

  const publicTeamNames = myTeam.filter((team) => team.isPublic === 1).map((team) => team.teamname);
  const publicTeamIds = myTeam.filter((team) => team.isPublic === 1).map((team) => team.teamId);
  const privateTeamNames = myTeam.filter((team) => team.isPublic === 0).map((team) => team.teamname);
  const privateTeamIds = myTeam.filter((team) => team.isPublic === 0).map((team) => team.teamId);

  const toggleFavor = async (teamId: number) => {
    // 별 눌렀을때 patch 요청 보내기
    try {
      await axios.patch(
        `${process.env.REACT_APP_API_URL}/team/favorite/${teamId}`,
        {},
        {
          headers: {
            'Content-Type': 'application/json',
          },
          withCredentials: true,
        },
      );
      refresh();
    } catch (e) {
      /* empty */
    }
  };

  // 별 모양 변경을 위한 함수
  const togglePrivateFavor = (index: number) => {
    const updatedIsFavor = [...privateIsFavor];
    updatedIsFavor[index] = updatedIsFavor[index] === 0 ? 1 : 0;
    setPrivateIsFavor(updatedIsFavor);
  };
  const togglePublicFavor = (index: number) => {
    const updatedIsFavor = [...publicIsFavor];
    updatedIsFavor[index] = updatedIsFavor[index] === 0 ? 1 : 0;
    setPublicIsFavor(updatedIsFavor);
  };

  async function createTeam(teamname: string, explanation: string, color: string, isPublic: boolean) {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/team/create`,
        { teamname, color, explanation, isPublic },
        {
          headers: {
            'Content-Type': 'application/json',
          },
          withCredentials: true,
        },
      );
      if (response.status === 201) {
        enqueueSnackbar('모임이 생성되었습니다.', { variant: 'success' });
        refresh();
      }
    } catch (e) {
      enqueueSnackbar('모임 생성에 실패하였습니다..', { variant: 'error' });
    }
  }

  const createTeamModal = (isPublic: boolean) => {
    openPrompt({
      isPublic,
      titleText: '모임 생성',
      buttonText: '생성',
      onSubmit: (title, content, color) => {
        if (color) createTeam(title, content, color, isPublic);
        else enqueueSnackbar('모임 생성 실패 : 모임 색상을 선택해주세요', { variant: 'error' });
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
                      <div
                        onClick={(event) => {
                          event.stopPropagation();
                          toggleFavor(privateTeamIds[index]);
                          togglePrivateFavor(index);
                        }}
                      >
                        {privateIsFavor[index] ? <StarRoundedIcon /> : <StarBorderRoundedIcon />}
                      </div>
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
                      <div
                        onClick={(event) => {
                          event.stopPropagation();
                          toggleFavor(publicTeamIds[index]);
                          togglePublicFavor(index);
                        }}
                      >
                        {publicIsFavor[index] ? <StarRoundedIcon /> : <StarBorderRoundedIcon />}
                      </div>
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
