import { useRecoilValue } from 'recoil';
import { useEffect, useState } from 'react';
import axios from 'axios';

import { userState } from '../state/userState';
import { AllScheSearchDTO } from '../models/AllScheSearch';
import TeamShowBox from '../components/TeamShowBox/TeamShowBox';
import { Layout } from '../components/Layout';
import Examples from '../components/Example';

// 일단 컴포넌트 대충 배열
// sche:scheType[] 만들기 useEffect로 teamInfo가 바뀌면 다시 만들도록
// teamShowBox에서 ishide 바뀌면 axios랑 teamInfo의 ishide가 바뀌게 만들어서 useEffect 할 수 있도록 하면 sche가 새롭게 업데이트 되겠지?
//
interface ScheType {
  scheId: number;
  teamId: number;
  name: string;
  startDate: Date;
  endDate: Date;
  explanation: string;
  color: string; // 개인 일정의 경우 color를 빈 문자열로 설정하시면 됩니다.
}
export default function MyPage() {
  const userId = useRecoilValue(userState);
  const [sche, setSche] = useState<ScheType[]>([]);
  const [allSche, setAllSche] = useState<AllScheSearchDTO>({
    mySchedules: [],
    teamSchedules: [],
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/schedule`, {
          headers: {
            'Content-Type': 'application/json',
          },
          withCredentials: true,
        });

        if (response.status === 200) {
          setAllSche(response.data);
        }
      } catch (e) {
        /* empty */
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    setSche(() => [
      ...allSche.mySchedules.map((mySche) => ({
        scheId: mySche.scheId,
        teamId: 0,
        name: mySche.name,
        startDate: mySche.startTime,
        endDate: mySche.endTime,
        explanation: mySche.explanation,
        color: '',
      })),
      ...allSche.teamSchedules
        .filter((teamInfo) => !teamInfo.isHide)
        .flatMap(
          (teamInfo) =>
            teamInfo.schedules?.map((Sche) => ({
              scheId: Sche.scheId,
              teamId: teamInfo.teamId,
              name: Sche.name,
              startDate: Sche.startTime,
              endDate: Sche.endTime,
              explanation: Sche.explanation,
              color: teamInfo.color,
            })) || [],
        ),
    ]);
  }, [allSche]);
  console.log(sche);
  console.log(allSche);
  return (
    <Layout>
      <div>현재 유저 id: {userId}</div>MyPage
      <TeamShowBox
        teams={allSche.teamSchedules?.map((team) => ({
          id: team.teamId,
          name: team.teamname,
          isHide: team.isHide,
          color: team.color,
        }))}
        setState={setAllSche}
      />
      <Examples></Examples>
    </Layout>
  );
}
