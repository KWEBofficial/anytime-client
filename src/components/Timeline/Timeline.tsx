import React, { useEffect, useState } from 'react';
// import axios from 'axios';
import { addDays, endOfDay, format, startOfDay } from 'date-fns';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers/';
import { Grid, Stack, List } from '@mui/material';

interface ScheDTO {
  startDate: Date;
  endDate: Date;
}

interface TeamMemScheDTO {
  memberId: number;
  schedules: ScheDTO[];
}

interface RenderCellsProps {
  start: Date | null;
  end: Date | null;
  memSches: TeamMemScheDTO[];
}

const RenderCells = ({ start, end, memSches }: RenderCellsProps) => {
  const validSche: ScheDTO[] | undefined = [];
  const timeline = [];

  if (start === null || end === null) return null;

  memSches.forEach((mem) => {
    mem.schedules.forEach((sche) => {
      if (
        format(sche.startDate, 'yyyy-MM-dd') >= format(start, 'yyyy-MM-dd') &&
        format(sche.endDate, 'yyyy-MM-dd') <= format(end, 'yyyy-MM-dd')
      ) {
        validSche.push(sche);
      }
    });
  });
  console.log(validSche);

  let day = start;
  console.log(`day: ${day}}`);
  console.log(`end: ${end}}`);
  console.log(day <= end);
  while (day <= end) {
    const today = day;
    const daily = [];
    let first: Date = startOfDay(today);
    let last: Date = startOfDay(today);

    validSche.forEach((sche) => {
      const startDate = format(sche.startDate, 'yyyy-MM-dd');
      const endDate = format(sche.endDate, 'yyyy-MM-dd');
      // const startTime = format(sche.startDate, 'hh:mm');
      // const endTime = format(sche.endDate, 'hh-mm');
      const date = format(today, 'yyyy-MM-dd');
      const isValid = startDate <= date && endDate >= date;

      if (isValid) {
        if (startDate < date && endDate === date) {
          first = startOfDay(today);
          last = sche.endDate > last ? sche.endDate : last;
        } else if (startDate === date && endDate > date) {
          last = endOfDay(today);
          first = sche.startDate < first ? sche.startDate : first;
        } else if (startDate < date && endDate > date) {
          first = startOfDay(today);
          last = endOfDay(today);
        }
      }
    });
    day = addDays(day, 1);

    for (let i = 0; i < 24; i += 1) {
      const startTime = format(first, 'hh:mm');
      const endTime = format(last, 'hh:mm');
      console.log(`startTime: ${startTime}, endTime: ${endTime}`);
      daily.push(
        <Grid
          sx={{
            backgroundColor: 'blue',
          }}
        >
          {'Empty'}
        </Grid>,
      );
    }

    timeline.push(<Stack key={`${day}`}>{daily}</Stack>);
  }

  return <List>{timeline}</List>;
};

export default function Timeline() {
  const [start, setStart] = useState<Date | null>(new Date());
  const [end, setEnd] = useState<Date | null>(new Date());
  const [total, setTotal] = useState<TeamMemScheDTO[]>([
    {
      memberId: 1,
      schedules: [
        {
          startDate: new Date('2024-01-20 12:00:00'),
          endDate: new Date('2024-01-20 18:00:00'),
        },
      ],
    },
    {
      memberId: 41,
      schedules: [
        {
          startDate: new Date('2024-01-17 14:00'),
          endDate: new Date('2024-01-19 18:30'),
        },
        {
          startDate: new Date('2024-01-15 11:30'),
          endDate: new Date('2024-01-16 00:00'),
        },
      ],
    },
  ]); // 전체 인원 schedule
  // const [finalSche, setFianlSche] = useState(); 모임 일정 생성

  useEffect(() => {
    setTotal((curr) => curr);
  }, []);

  console.log(total);

  return (
    <Grid container display={'flex'} justifyContent={'center'} width={'88vw'}>
      <Grid display={'flex'} justifyContent={'center'}>
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <DemoContainer components={['DatePicker', 'DatePicker']}>
            <DatePicker
              label="시작"
              disablePast
              value={start}
              onChange={(newValue) => {
                setStart(newValue);
              }}
            />
            <DatePicker label="끝" minDate={start} value={end} onChange={(newValue) => setEnd(newValue)} />
          </DemoContainer>
        </LocalizationProvider>
      </Grid>
      <RenderCells start={start} end={end} memSches={total} />
    </Grid>
  );
}
