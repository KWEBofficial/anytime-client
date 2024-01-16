import { useParams, useNavigate } from 'react-router-dom';

import TeamTitle from '../components/TeamTitle';
import TeamExp from '../components/TeamExp';
import NoticeBox from '../components/NoticeBox';
import { Layout } from '../components/Layout';
// import CustomBox from '../components/CustomBox';

export default function TeamPage() {
  const params = useParams();
  const { teamId } = params;
  const navigate = useNavigate();

  return (
    <Layout>
      Team {teamId} Detail page
      <TeamTitle title="KWEB" />
      <TeamExp explanation="정보대학 웹 개발 동아리" />
      <NoticeBox
        notices={[
          '1월 12일 금요일 오후 7시 30분 중간 발표 준비해주세요. 사용중인 노션 페이지랑, 와이어프레임, 다이어그램 설계 한 거 보여주고, 백엔드/프론트엔드 진행상황 설명하면 될 것 같습니다 !',
          '1월 19일 최종발표 예정',
        ]}
      />
      {/*      <CustomBox title="관리자" items={['관리자1', '관리자2']} />
      <CustomBox title="인원명단" items={['도유진', '신정윤', '윤현지', '이원준', '탁민재']} /> */}
      <div>
        <button onClick={() => navigate(`/team/${teamId}/schedule`)}>사적모임 일정생성</button>
        <button onClick={() => navigate(`/team/${teamId}/admin`)}>공적모임 어드민</button>
      </div>
    </Layout>
  );
}
