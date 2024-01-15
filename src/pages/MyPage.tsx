// eslint-disable-next-line import/named
import TeamShowBox from '../components/TeamShowBox/TeamShowBox';
import TeamSchduleList from '../components/TeamSchduleList/TeamScheduleList';
import { Layout } from '../components/Layout';

export default function MyPage() {
  return (
    <Layout>
      MyPage
      <TeamShowBox />
      <TeamSchduleList />
    </Layout>
  );
}
