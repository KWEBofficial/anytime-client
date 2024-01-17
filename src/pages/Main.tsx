import { ScheType } from '../models/calendar';
import { Layout } from '../components/Layout';
import FavorTeamSche from '../components/FavorTeamSche/FavorTeamSche';
import { Calendar } from '../components/Calendar/Calendar';

export default function MainPage() {
  const onClick = (sche: ScheType) => {
    alert(sche.name);
  };
  /* 예시를 위해 메인페이지에서는 schedule을 클릭했을 때 alert를 띄우는 함수를 설정했습니다. 
  기타 페이지에서는 클릭한 스케쥴을 수정하는 모달을 띄우는 등의 함수를 설정할 수 있습니다. */
  const height = '90vh';
  const width = '88vw';
  const sches: ScheType[] = [
    {
      name: 'KWEB 해커톤 최종발표',
      startDate: new Date('2024-01-19'),
      endDate: new Date('2024-01-19'),
      explanation: '우정정보관',
      color: 'red',
    },
    {
      name: '해커톤 시작',
      startDate: new Date('2024-01-08'),
      endDate: new Date('2024-01-13'),
      explanation: 'test1',
      color: 'red',
    },
    {
      name: '해커톤 시작222',
      startDate: new Date('2024-01-02'),
      endDate: new Date('2024-01-04'),
      explanation: 'test2',
      color: 'red',
    },
    {
      name: 'testtest',
      startDate: new Date('2023-12-31'),
      endDate: new Date('2023-12-31'),
      explanation: 'test2',
      color: '',
    },
    {
      name: 'testtttt',
      startDate: new Date('2024-01-29'),
      endDate: new Date('2024-02-02'),
      explanation: 'test2',
      color: '',
    },
    {
      name: 'stacktest',
      startDate: new Date('2024-01-10'),
      endDate: new Date('2024-01-10'),
      explanation: 'test2',
      color: 'blue',
    },
    {
      name: 'Fastest Start Time',
      startDate: new Date('2024-01-10 06:00'),
      endDate: new Date('2024-01-10'),
      explanation: 'fast',
      color: '',
    },
    {
      name: 'overflow test',
      startDate: new Date('2024-01-10'),
      endDate: new Date('2024-01-10'),
      explanation: 'overflow test',
      color: '',
    },
    {
      name: 'stacktest',
      startDate: new Date('2024-01-10'),
      endDate: new Date('2024-01-10'),
      explanation: 'test2',
      color: '',
    },
    {
      name: 'stacktest',
      startDate: new Date('2024-01-10'),
      endDate: new Date('2024-01-10'),
      explanation: 'test2',
      color: '',
    },
    {
      name: 'stacktest',
      startDate: new Date('2024-01-10'),
      endDate: new Date('2024-01-10'),
      explanation: 'test2',
      color: '',
    },
    {
      name: 'December stack test',
      startDate: new Date('202-12-13'),
      endDate: new Date('2023-12-14'),
      explanation: 'December stack test',
      color: '',
    },
    {
      name: 'December stack test',
      startDate: new Date('2023-12-13'),
      endDate: new Date('2023-12-14'),
      explanation: 'December stack test',
      color: '',
    },
    {
      name: 'December stack test',
      startDate: new Date('2023-12-13'),
      endDate: new Date('2023-12-14'),
      explanation: 'December stack test',
      color: '',
    },
    {
      name: 'December stack test',
      startDate: new Date('2023-12-13'),
      endDate: new Date('2023-12-14'),
      explanation: 'December stack test',
      color: '',
    },
    {
      name: 'December stack test',
      startDate: new Date('2023-12-13'),
      endDate: new Date('2023-12-14'),
      explanation: 'December stack test',
      color: '',
    },
  ]; // 스케쥴을 받아온 뒤 ScheType[] 형식으로 변환해주세요.

  return (
    <Layout>
      <Calendar onClick={onClick} height={height} width={width} schedules={sches} />
      <FavorTeamSche />
    </Layout>
  );
}
