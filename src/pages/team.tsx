import { useParams, useNavigate } from 'react-router-dom';

import { Layout } from '../components/Layout';

export default function TeamPage() {
  const params = useParams();
  const { teamId } = params;
  const navigate = useNavigate();

  return (
    <Layout>
      Team {teamId} Detail page
      <div>
        <button onClick={() => navigate(`/team/${teamId}/schedule`)}>사적모임 일정생성</button>
        <button onClick={() => navigate(`/team/${teamId}/admin`)}>공적모임 어드민</button>
      </div>
    </Layout>
  );
}
