import { ScheType } from '../models/calendar';
import { Layout } from '../components/Layout';
import FavorTeamSche from '../components/FavorTeamSche/FavorTeamSche';
import { Calendar } from '../components/Calendar/Calendar';

export default function MainPage() {
  const isEditable = false;
  /* 예시를 위해 메인페이지에서는 schedule을 클릭했을 때 alert를 띄우는 함수를 설정했습니다. 
  기타 페이지에서는 클릭한 스케쥴을 수정하는 모달을 띄우는 등의 함수를 설정할 수 있습니다. */
  const height = '90vh';
  const width = '88vw';
  const sches: ScheType[] = [
    {
      scheId: 1,
      teamId: 2,
      name: 'KWEB 해커톤 최종발표',
      startDate: new Date('2024-01-19'),
      endDate: new Date('2024-01-19'),
      explanation: '우정정보관',
      color: 'red',
    },
  ]; // 스케쥴을 받아온 뒤 ScheType[] 형식으로 변환해주세요.

  return (
    <Layout>
      <Calendar isEditable={isEditable} height={height} width={width} schedules={sches} />
      <FavorTeamSche />
    </Layout>
  );
}
