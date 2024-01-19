import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { enqueueSnackbar } from 'notistack';
import axios from 'axios';
import Pagination from '@mui/material/Pagination';
import { Box, Button, TextField, Typography } from '@mui/material';

import { ResponseDataType } from '../models/ResponseDataType';
import PublicCard from '../components/PublicCard';
import { Layout } from '../components/Layout';

interface PublicCardProps {
  id: number;
  teamname: string;
  color: string;
  explanation: string;
}

export default function SearchTeamPage() {
  const [keyword, setKeyword] = useState<string>('');
  const [teamInfoAll, setTeamInfoAll] = useState<PublicCardProps[]>([]);
  const [teamInfoFind, setTeamInfoFind] = useState<PublicCardProps[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const navigate = useNavigate();

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
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/team/search/`, {
          params: { name: keyword },
          headers: {
            'Content-Type': 'application/json',
          },
          withCredentials: true,
        });
        setTeamInfoAll(response.data);
        setTeamInfoFind(response.data);
      } catch (e) {
        if (axios.isAxiosError<ResponseDataType>(e)) {
          if (e.response?.status === 401) {
            enqueueSnackbar(e.response?.data.message, { variant: 'error' });
            navigate('/');
          } else {
            enqueueSnackbar(e.response?.data.message, { variant: 'error' });
            navigate(-1);
          }
        }
      }
    };
    fetchData();
  }, []);
  return (
    <Layout>
      <Box sx={{ minWidth: 750, justifyContent: 'center' }}>
        <Box sx={{ margin: 5, display: 'flex', justifyContent: 'center' }}>
          <Typography variant="h3" sx={{ color: '#696969' }}>
            <strong>언제든지 팀 찾기</strong>
          </Typography>
        </Box>
        <Box sx={{ m: 2, display: 'flex', justifyContent: 'center' }}>
          <TextField
            sx={{
              width: '30vw',
            }}
            size="small"
            id="keyword"
            label="검색할 모임의 이름을 입력해주세요"
            onChange={(event) => setKeyword(event.target.value)}
            onKeyDown={(event) => {
              if (event.key === 'Enter') handleFindTeamClick();
            }}
          />
          <Button
            variant="contained"
            color="primary"
            onClick={handleFindTeamClick}
            sx={{ marginLeft: '5px', backgroundColor: '#d3e9f6', color: '#696969', boxShadow: 'none' }}
          >
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
      </Box>
    </Layout>
  );
}
