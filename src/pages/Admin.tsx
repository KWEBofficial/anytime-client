import { useNavigate, useParams } from 'react-router-dom';

import { Layout } from '../components/Layout';

export default function AdminPage() {
  const params = useParams();
  const { teamId } = params;
  const navigate = useNavigate();
  return (
    <Layout>
      AdminPage
      <div>
        <button onClick={() => navigate(`/notice/${teamId}`)}>공지사항 페이지</button>
      </div>
    </Layout>
  );
}
