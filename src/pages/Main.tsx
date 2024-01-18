import { useEffect, useState } from 'react';
import axios from 'axios';

import { AllScheSearchDTO } from '../models/AllScheSearch';
import { Layout } from '../components/Layout';
import FavorTeamSche from '../components/FavorTeamSche/FavorTeamSche';
import { Calendar } from '../components/Calendar/Calendar';

interface ScheType {
  scheId: number;
  teamId: number;
  name: string;
  startDate: Date;
  endDate: Date;
  explanation: string;
  color: string;
}

export default function MainPage() {
  const [sche, setSche] = useState<ScheType[]>([]);
  const [allSche, setAllSche] = useState<AllScheSearchDTO>({
    mySchedules: [],
    teamSchedules: [],
  });

  const isEditable = false;

  const height = '90vh';
  const width = '80vw';

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
        startDate: new Date(mySche.startTime),
        endDate: new Date(mySche.endTime),
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
              startDate: new Date(Sche.startTime),
              endDate: new Date(Sche.endTime),
              explanation: Sche.explanation,
              color: teamInfo.color,
            })) || [],
        ),
    ]);
  }, [allSche]);

  return (
    <Layout>
      <Calendar isEditable={isEditable} height={height} width={width} schedules={sches} />
      <FavorTeamSche />
    </Layout>
  );
}
