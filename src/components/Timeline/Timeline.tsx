import React, { useEffect, useState } from 'react';
// import axios from 'axios';
import { addDays, addHours, addMinutes, format, startOfDay } from 'date-fns';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers/';
import { Grid, Stack, List, Box, Divider, Button } from '@mui/material';
import './style.scss';

interface Sche {
  startDate: Date;
  endDate: Date;
}

interface TeamMemSche {
  memberId: number | null;
  schedules: Sche[];
}

interface TeamSchedule {
  teamId: number;
  teamname: string;
  schedules: Sche[];
}

interface RenderCellsProps {
  start: Date | null;
  end: Date | null;
  validSche: Sche[];
}

const RenderCells = ({ start, end, validSche }: RenderCellsProps) => {
  const timeline = [];

  if (start === null || end === null) return null;

  let day = startOfDay(start);
  while (format(day, 'yyyy-MM-dd') <= format(end, 'yyyy-MM-dd')) {
    const today = day;
    const daily = [];
    for (let i = 0; i < 48; i += 1) {
      daily.push(
        <Grid
          sx={{
            paddingTop: '7px',
            paddingBottom: '6px',
            paddingLeft: '115px',
            paddingRight: '115px',
          }}
        ></Grid>,
      );
      daily.push(<Divider></Divider>);
    }

    validSche.forEach((sche) => {
      const startDate = format(sche.startDate, 'yyyy-MM-dd');
      const endDate = format(sche.endDate, 'yyyy-MM-dd');
      const date = format(today, 'yyyy-MM-dd');
      const isValid = startDate <= date && endDate >= date;
      let time = today;

      if (isValid) {
        for (let i = 0; i < 48; i += 1) {
          if (sche.startDate <= time && sche.endDate > time) {
            daily[2 * i] = (
              <Grid
                sx={{
                  backgroundColor: '#f3c5b6',
                  paddingTop: '7px',
                  paddingBottom: '6px',
                  paddingLeft: '115px',
                  paddingRight: '115px',
                }}
              ></Grid>
            );
          }
          time = addMinutes(time, 30);
        }
      }
    });

    timeline.push(
      <List key={`${day}`}>
        <Box
          textAlign={'center'}
          sx={{
            fontSize: '20px',
            fontWeight: 'bold',
          }}
        >
          {format(day, 'yyyy-MM-dd')}
        </Box>
        <Box sx={{ border: '2px solid gray' }}>{daily}</Box>
      </List>,
    );
    day = addDays(day, 1);
  }

  return <Stack direction={'row'}>{timeline}</Stack>;
};

interface RenderTimeProps {
  isVisible: boolean;
}

const RenderTime = ({ isVisible }: RenderTimeProps) => {
  if (!isVisible) return <Box></Box>;
  const time = [];
  let start = startOfDay(new Date());
  for (let i = 0; i < 24; i += 1) {
    time.push(
      <Box
        sx={{
          fontSize: '17.44px',
          fontWeight: 'bold',
          border: '0.1px solid gray',
          display: 'flex',
          justifyContent: 'center',
        }}
      >
        {format(start, 'HH')}
      </Box>,
    );
    start = addHours(start, 1);
  }
  return <Stack sx={{ display: 'flex', justifyContent: 'center', paddingTop: '13px' }}>{time}</Stack>;
};

export default function Timeline() {
  const [start, setStart] = useState<Date | null>(null);
  const [end, setEnd] = useState<Date | null>(null);
  const [total, setTotal] = useState<TeamMemSche[]>([
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
          endDate: new Date('2024-01-16 03:00'),
        },
        {
          startDate: new Date('2024-01-20 19:00:00'),
          endDate: new Date('2024-01-21 03:00'),
        },
      ],
    },
  ]); // 전체 인원 schedule
  const [teamSche, setTeamSche] = useState<TeamSchedule>({
    teamId: 1,
    teamname: 'test',
    schedules: [
      {
        startDate: new Date('2024-01-22 12:00:00'),
        endDate: new Date('2024-01-22 19:00:00'),
      },
    ],
  }); // 모임 일정
  const [validSche, setValidSche] = useState<Sche[]>([]); // 유효한 일정 filter

  const valid = () => {
    if (start !== null && end !== null && start <= end) {
      const valids: Sche[] = total.flatMap((mem: TeamMemSche) => {
        return mem.schedules.filter((sche: Sche) => {
          if (sche.startDate >= start || sche.endDate <= end) return true;
          return false;
        });
      });
      teamSche?.schedules.forEach((sche: Sche) => {
        if (sche.startDate >= start || sche.endDate <= end) valids.push(sche);
      });
      setValidSche(valids);
    } else setValidSche([]); // start, end가 null이면 validSche 초기화
  };

  useEffect(() => {
    setTotal((curr) => curr);
    valid();
  }, [start, end]); // start, end 바뀔 때마다 개인 일정 불러 온 후, valid() 실행

  /*
  const [isMouseDown, setIsMouseDown] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    setIsMouseDown(true);
    setStartX(e.pageX - e.currentTarget.offsetLeft);
    setScrollLeft(e.currentTarget.scrollLeft);
  };

  const handleMouseLeave = () => {
    setIsMouseDown(false);
  };

  const handleMouseUp = () => {
    setIsMouseDown(false);
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isMouseDown) return;
    e.preventDefault();
    const x = e.pageX - e.currentTarget.offsetLeft;
    const walk = (x - startX) * 2;
    e.currentTarget.scrollLeft = scrollLeft - walk;
  };

  .scroll-container 에 추가
    onMouseDown={handleMouseDown}
    onMouseLeave={handleMouseLeave}
    onMouseUp={handleMouseUp}
    onMouseMove={handleMouseMove}
  */

  const onClick = () => {
    // 모달 실행하여 새로운 일정을 추가할 경우 setTeamSche 실행 후 기간 초기화 => 사적모임 메인페이지로 이동?
    setTeamSche((curr) => curr); // 새로운 팀 일정 추가
    setStart(null);
    setEnd(null);
  };

  const isVisible = () => {
    if (start === null || end === null || start > end) return false;
    return true;
  };

  return (
    <Box className={'timeline'}>
      <Grid container>
        <Grid display={'flex'} justifyContent={'center'} xs={12}>
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
              <DatePicker
                label="끝"
                disablePast
                minDate={start}
                value={end}
                onChange={(newValue) => setEnd(newValue)}
              />
              <Button color="secondary" variant={'outlined'} onClick={onClick}>
                모임 일정 추가
              </Button>
            </DemoContainer>
          </LocalizationProvider>
        </Grid>
        <Stack direction={'row'} overflow={'hidden'} display={'flex'} justifyContent={'center'}>
          <RenderTime isVisible={isVisible()} />
          <Grid className={'scroll-container'}>
            <RenderCells start={start} end={end} validSche={validSche} />
          </Grid>
          <RenderTime isVisible={isVisible()} />
        </Stack>
      </Grid>
    </Box>
  );
}