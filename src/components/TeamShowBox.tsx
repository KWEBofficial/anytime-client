import * as React from 'react';
import FormLabel from '@mui/material/FormLabel';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import { grey } from '@mui/material/colors';
import Checkbox from '@mui/material/Checkbox';
import Box from '@mui/material/Box';

export default function TeamShowBox() {
  return (
    <Box>
      <Box
        sx={{
          backgroundColor: grey[300],
          display: 'inline-flex',
          flexDirection: 'column',
          flexWrap: 'wrap',
          '& > :not(style)': {
            m: 2,
            width: 180,
            height: 200,
          },
        }}
      >
        <FormControl component="fieldset">
          <FormLabel component="legend">팀 표시/숨김</FormLabel>
          <FormGroup aria-label="position" row>
            <FormControlLabel value="start" control={<Checkbox />} label="team1" labelPlacement="start" />
            <FormControlLabel value="start" control={<Checkbox />} label="team2" labelPlacement="start" />
            <FormControlLabel value="start" control={<Checkbox />} label="team3" labelPlacement="start" />
            <FormControlLabel value="start" control={<Checkbox />} label="team4" labelPlacement="start" />
          </FormGroup>
        </FormControl>
      </Box>
    </Box>
  );
}
