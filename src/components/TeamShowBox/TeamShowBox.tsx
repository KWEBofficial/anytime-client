import * as React from 'react';
import FormLabel from '@mui/material/FormLabel';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import { blue, green, grey, red } from '@mui/material/colors';
import { Checkbox, Box, List } from '@mui/material';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import VisibilityIcon from '@mui/icons-material/Visibility';
import './TeamShowBox.css';
import { useState, useEffect } from 'react';

interface Team {
  name: string;
  color: string;
}

export default function TeamShowBox() {
  const teams: Team[] = [
    {
      name: 'teamasdfasdfasfsfSDFsfdasdfka;fjahsjdfklafsadhsdfhdhdhsadjfasdlfasdlfjasdlfasfasdfha;skvmzx.wAHDIJKDKDKDKDKASJXKZ.Z.CKEKOCKMFIFKMCMEKOFOETLLYPVKFMFKVMFMKMDKLSJDVKLZFJLASKDJF;AEKSDJF;KASJDF;ASDJF;AJSDFJA',
      color: red[400],
    },
    {
      name: 'team2',
      color: blue[300],
    },
    {
      name: 'team3',
      color: green[400],
    },
    {
      name: 'team3',
      color: green[400],
    },
    {
      name: 'team3',
      color: green[400],
    },
    {
      name: 'team3',
      color: green[400],
    },
  ];

  const teamBox = teams.map((t) => {
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
              defaultChecked
            />
          }
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
        flexShrink: 1,
        flexDirection: 'column',
        flexWrap: 'wrap',
        margin: 2,

        '& > :not(style)': {
          m: 2,
          width: '20vw',
        },
      }}
    >
      <FormControl component="fieldset">
        <FormLabel sx={{ color: 'black' }}>팀 표시/숨김</FormLabel>
        <FormGroup className="scroll" sx={{ maxHeight: '20vw', overflow: 'scroll' }} aria-label="position" row>
          <List> {teamBox}</List>
        </FormGroup>
      </FormControl>
    </Box>
  );
}
