import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Pagination from '@mui/material/Pagination/Pagination';
import { Box, Card, CardContent, IconButton, Typography } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

import NoticeInput from '../components/NoticeInput';
import NoticeCard from '../components/NoticeCard';
import { Layout } from '../components/Layout';

// teamId로부터 teamname 가져와야 함
// teamId -> teamname, noticeId, content, createAt, startDate, endDate, isPrior
// 새로운 API, DTO

interface NoticeAllResDTO {
  teamname: string;
  noticeId: number;
  content: string;
  createdAt: Date;
  startDate: Date;
  endDate: Date;
  isPrior: boolean;
}

export default function NoticePage() {
  const teamId = String(useParams().teamId);
  const [teamname, setTeamname] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [notices, setNotices] = useState<NoticeAllResDTO[]>([]);
  const [currentPage, setCurrentPage] = useState(1);

  const handleAddClick = () => {
    setIsOpen(() => !isOpen);
  };
  const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setCurrentPage(value);
  };

  const makePosts = (notice: NoticeAllResDTO, index: number) => (
    <NoticeCard key={notice.noticeId} {...notice} onChange={setNotices} index={index} />
  );

  const noticesPerPage = 10;
  const totalPages = Math.ceil(notices.length / noticesPerPage);

  const indexOfFirst = (currentPage - 1) * noticesPerPage;
  const indexOfLast =
    (notices.length - indexOfFirst) / noticesPerPage
      ? indexOfFirst + noticesPerPage
      : (notices.length - indexOfFirst) % noticesPerPage;

  const currentNotices = notices.slice(indexOfFirst, indexOfLast);

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(`${process.env.REACT_APP_API_URL}notice/all/${teamId}`, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      setNotices(response.data.notices.reverse());
      setTeamname(response.data.teamname);
    };
    fetchData();
  }, []);

  return (
    <Layout>
      <Typography variant="h4">Notice - {teamname}</Typography>
      <Card sx={{ minWidth: 275, height: '50px', marginBottom: 1 }}>
        <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'stretch' }}>
          <CardContent sx={{ width: '85px' }}>
            <Typography variant="body2">생성 일자</Typography>
          </CardContent>
          <CardContent sx={{ width: '85px' }}>
            <Typography variant="body2">게시 일자</Typography>
          </CardContent>
          <CardContent sx={{ flex: 1, textAlign: 'center' }}>
            <Typography variant="body2">내용</Typography>
          </CardContent>
          <CardContent sx={{ width: '85px' }}>
            <Typography variant="body2">게시 기한</Typography>
          </CardContent>
          <CardContent sx={{ justifyContent: 'flex-end', width: '50px', padding: '4px' }}>
            <IconButton onClick={handleAddClick}>
              <AddIcon />
            </IconButton>
          </CardContent>
        </Box>
      </Card>
      {isOpen ? <NoticeInput type="생성" teamId={teamId} /> : ''}
      {currentNotices.map(makePosts)}
      <Pagination
        count={totalPages}
        page={currentPage}
        onChange={handlePageChange}
        sx={{ display: 'flex', justifyContent: 'center' }}
      />
    </Layout>
  );
}
