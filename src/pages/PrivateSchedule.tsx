import { useParams } from 'react-router-dom';

import Timeline from '../components/Timeline/Timeline';
import { Layout } from '../components/Layout';

export default function PrivateSchedulePage() {
  const params = useParams();
  const { teamId } = params;

  return (
    <Layout>
      <Timeline teamId={Number(teamId)} />
    </Layout>
  );
}
