import { Box } from '@mui/material';

const style = {
  py: 1,
  width: 800,
  borderRadius: 2,
  border: '2px solid',
  borderColor: 'divider',
  backgroundColor: 'background.paper',
  marginBottom: 2,
  color: '#696969',
  paddingLeft: 1,
  paddingRight: 1,
  marginTop: 2,
};

interface TeamExpProps {
  explanation: string;
}

const TeamExp = ({ explanation }: TeamExpProps) => {
  return <Box sx={style}>{explanation}</Box>;
};

export default TeamExp;
