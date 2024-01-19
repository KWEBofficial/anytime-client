import { useNavigate } from 'react-router-dom';
import * as React from 'react';
import { enqueueSnackbar } from 'notistack';
import axios from 'axios';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import { grey } from '@mui/material/colors';
import { Checkbox, Box, List, Typography } from '@mui/material';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import VisibilityIcon from '@mui/icons-material/Visibility';

import './TeamShowBox.css';

import { ResponseDataType } from '../../models/ResponseDataType';
import { AllScheSearchDTO } from '../../models/AllScheSearch';

interface Team {
  id: number;
  name: string;
  isHide: boolean;
  color: string;
}
interface TeamShowBoxProps {
  teams: Team[];
  setState: React.Dispatch<React.SetStateAction<AllScheSearchDTO>>;
}

export default function TeamShowBox({ teams, setState }: TeamShowBoxProps) {
  const navigate = useNavigate();
  const handleClick = async (id: number, index: number) => {
    try {
      const response = await axios.patch(
        `${process.env.REACT_APP_API_URL}/team/hide/${id}`,
        {},
        {
          headers: {
            'Content-Type': 'application/json',
          },
          withCredentials: true,
        },
      );
      if (response.status === 200) {
        setState((prevState) => ({
          ...prevState,
          teamSchedules: [
            ...prevState.teamSchedules.slice(0, index),
            { ...prevState.teamSchedules[index], isHide: !prevState.teamSchedules[index].isHide },
            ...prevState.teamSchedules.slice(index + 1),
          ],
        }));
      }
    } catch (e) {
      if (axios.isAxiosError<ResponseDataType>(e)) {
        if (e.response?.status === 401) {
          enqueueSnackbar(e.response?.data.message, { variant: 'error' });
          navigate('/');
        } else {
          enqueueSnackbar(e.response?.data.message, { variant: 'error' });
        }
      }
    }
  };
  const teamBox = teams.map((t, index) => {
    const k = (
      <Box
        sx={{
          display: 'flex',
          flexGrow: 1,
          flexShrink: 1,
          flexWrap: 'wrap',
          bgcolor: t.color,
          borderRadius: '5px',
          overflow: 'hidden',
          m: 1,
        }}
      >
        <FormControlLabel
          className="scroll"
          sx={{
            width: '18vw',
            minWidth: 275,
            overflow: 'auto',
          }}
          value="start"
          control={
            <Checkbox
              sx={{
                m: 1,
              }}
              icon={<VisibilityOffIcon sx={{ color: 'black' }} />}
              checkedIcon={<VisibilityIcon sx={{ color: 'black' }} />}
              checked={!t.isHide}
            />
          }
          onClick={() => handleClick(t.id, index)}
          label={t.name}
          labelPlacement="start"
        />
      </Box>
    );
    return k;
  });

  return (
    <Box
      sx={{
        backgroundColor: grey[300],
        borderRadius: '10px',
        display: 'inline-flex',
        flexGrow: 1,
        flexShrink: 0,
        flexDirection: 'column',
        flexWrap: 'wrap',
        margin: 2,

        '& > :not(style)': {
          m: 2,
          width: '20vw',
          minWidth: 300,
        },
      }}
    >
      <FormControl component="fieldset">
        <Typography sx={{ color: 'black', textAlign: 'center' }}>팀 표시/숨김</Typography>
        <FormGroup className="scroll" sx={{ maxHeight: '20vw', overflow: 'scroll' }} aria-label="position" row>
          <List> {teamBox}</List>
        </FormGroup>
      </FormControl>
    </Box>
  );
}
/*
function navigate(arg0: string) {
  throw new Error('Function not implemented.');
}
*/
