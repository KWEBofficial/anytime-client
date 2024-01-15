import { useEffect, useState } from 'react';
import axios from 'axios';
import Pagination from '@mui/material/Pagination';
import { Box, Button, TextField, Typography } from '@mui/material';

import PublicCard from '../components/PublicCard';
import { Layout } from '../components/Layout';

// TeamListResDTO
interface PublicCardProps {
  id: number;
  teamname: string;
  color: string; // string
  explanation: string;
}

export default function SearchTeamPage() {
  const [keyword, setKeyword] = useState<string>('');
  const [teamInfoAll, setTeamInfoAll] = useState<PublicCardProps[]>([]);
  const [teamInfoFind, setTeamInfoFind] = useState<PublicCardProps[]>([]);
  const [currentPage, setCurrentPage] = useState(1);

  const InfoPerPage = 10;
  const totalPages = Math.ceil(teamInfoFind.length / InfoPerPage);

  const indexOfFirst = (currentPage - 1) * InfoPerPage;
  const indexOfLast =
    (teamInfoFind.length - indexOfFirst) / InfoPerPage
      ? indexOfFirst + InfoPerPage
      : (teamInfoFind.length - indexOfFirst) % InfoPerPage;

  const currentInfos = teamInfoFind.slice(indexOfFirst, indexOfLast);

  const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setCurrentPage(value);
  };

  const handleFindTeamClick = () => {
    const found = teamInfoAll.filter((info) => info.teamname.indexOf(keyword) >= 0);
    setTeamInfoFind(found);
  };

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(`${process.env.REACT_APP_API_URL}team/search/`, {
        params: { name: keyword },
        headers: {
          'Content-Type': 'application/json',
        },
      });
      setTeamInfoAll(response.data);
      setTeamInfoFind(response.data);
    };
    fetchData();
  }, []);
  return (
    <Layout>
      <Typography variant="h4">SearchTeamPage</Typography>

      <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
        <TextField
          size="small"
          id="keyword"
          label="팀명"
          onChange={(event) => setKeyword(event.target.value)}
          onKeyDown={(event) => {
            if (event.key === 'Enter') handleFindTeamClick();
          }}
        />
        <Button variant="contained" color="primary" onClick={handleFindTeamClick} sx={{ marginLeft: '3px' }}>
          검색
        </Button>
      </Box>
      {currentInfos.map((info) => (
        <PublicCard key={info.id} {...info} />
      ))}
      <Pagination
        count={totalPages}
        page={currentPage}
        onChange={handlePageChange}
        sx={{ display: 'flex', justifyContent: 'center' }}
      />
    </Layout>
  );
}
