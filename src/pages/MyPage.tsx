import { Layout } from '../components/Layout';
import FavorTeamSche from '../components/FavorTeamSche/FavorTeamSche';
import { Calendar } from '../components/Calendar/Calendar';

export default function MyPage() {
  return (
    <Layout>
      <Calendar />
      <FavorTeamSche />
    </Layout>
  );
}
