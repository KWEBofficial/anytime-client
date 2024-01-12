import NoticeCard from '../components/NoticeCard';
import { Layout } from '../components/Layout';
import axios from 'axios';
import { useParams } from 'react-router-dom';

// 작성자가 엔터를 많이 치면 너무 글이 길어져서 +버튼 누르면 내용이 다 나오게끔 하자
interface NoticeCardProps {
  noticeId: number;
  content: string;
  createdAt: Date;
  startDate: Date;
  endDate: Date;
  isPrior: boolean;
}

export default async function NoticePage() {
  const teamId = useParams().teamId;
  const notices: NoticeCardProps[] = (
    await axios.get(`${process.env.REACT_APP_API_URL}notice/${teamId}`, {
      headers: {
        'Content-Type': 'application/json',
      },
    })
  ).data;
  const noticelist = notices.map((notice) => <NoticeCard {...notice} />);
  return (
    <Layout>
      Notice
      {noticelist}
    </Layout>
  );
}
