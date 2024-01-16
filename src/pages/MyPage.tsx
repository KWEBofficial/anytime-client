import { useRecoilValue } from 'recoil';

import { userState } from '../state/userState';
import { Layout } from '../components/Layout';

export default function MyPage() {
  const userId = useRecoilValue(userState);
  return (
    <Layout>
      <div>현재 유저 id: {userId}</div>MyPage
    </Layout>
  );
}
