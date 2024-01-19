import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { enqueueSnackbar } from 'notistack';
import axios from 'axios';
import Pagination from '@mui/material/Pagination/Pagination';
import { Box, Grid, Card, CardContent, IconButton, Typography } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

import NoticeInput from '../components/NoticeInput';
import NoticeCard from '../components/NoticeCard';
import { Layout } from '../components/Layout';

interface ResponseDataType {
  message: string;
  code: number;
}
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
  const [isOpen, setIsOpen] = useState(false);
  const [notices, setNotices] = useState<NoticeAllResDTO[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const navigate = useNavigate();

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
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/notice/all/${teamId}`, {
          headers: {
            'Content-Type': 'application/json',
          },
          withCredentials: true,
        });
        setNotices(response.data.notices.reverse());
      } catch (e) {
        if (axios.isAxiosError<ResponseDataType>(e)) {
          navigate(-1);
          enqueueSnackbar(e.response?.data.message, { variant: 'error' });
        }
      }
    };
    fetchData();
  }, []);

  return (
    <Layout>
      <Typography sx={{ marginTop: 5, marginLeft: 10 }} variant="h4">
        공지사항
      </Typography>

      <Grid container sx={{ minWidth: 850, marginTop: 5 }}>
        <Grid xs={0} lg={0.5}></Grid>
        <Grid xs={10.5}>
          <Card sx={{ height: '50px', marginBottom: 1 }}>
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
        </Grid>
        <Grid xs={1}></Grid>
      </Grid>
    </Layout>
  );
}
