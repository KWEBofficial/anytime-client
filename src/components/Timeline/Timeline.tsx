import { useNavigate } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import { enqueueSnackbar } from 'notistack';
import { addDays, addHours, addMinutes, format, startOfDay } from 'date-fns';
import axios from 'axios';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers/';
import { Grid, Stack, List, Box, Divider, Button } from '@mui/material';
import './style.scss';

import { useModal } from '../Modal/useModal';
import { ResponseDataType } from '../../models/ResponseDataType';

interface Sche {
  startTime: Date;
  endTime: Date;
}

interface TeamMemSche {
  memberId: number | null;
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
      const startTime = format(new Date(sche.startTime), 'yyyy-MM-dd');
      const endTime = format(new Date(sche.endTime), 'yyyy-MM-dd');
      const date = format(today, 'yyyy-MM-dd');
      const isValid = startTime <= date && endTime >= date;
      let time = today;

      if (isValid) {
        const sT = format(new Date(sche.startTime), 'yyyy-MM-dd HH:mm');
        const eT = format(new Date(sche.endTime), 'yyyy-MM-dd HH:mm');
        for (let i = 0; i < 48; i += 1) {
          if (sT <= format(time, 'yyyy-MM-dd HH:mm') && eT > format(time, 'yyyy-MM-dd HH:mm')) {
            daily[2 * i] = (
              <Grid
                sx={{
                  backgroundColor: '#d3e9f6',
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
        <Box sx={{ border: '2px solid #696969' }}>{daily}</Box>
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
          border: '0.1px solid #696969',
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

interface TimelineProps {
  teamId: number;
}

export default function Timeline({ teamId }: TimelineProps) {
  const { openAlert, openSchedulePrompt } = useModal();
  const [start, setStart] = useState<Date | null>(null);
  const [end, setEnd] = useState<Date | null>(null);
  const [total, setTotal] = useState<TeamMemSche[]>([]); // 전체 인원 schedule
  const [validSche, setValidSche] = useState<Sche[]>([]); // 유효한 일정 filter
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/schedule/team/${teamId}`, {
          headers: {
            'Content-Type': 'application/json',
          },
          withCredentials: true,
        });

        if (response.status === 200) {
          setTotal(response.data);
        }
      } catch (e) {
        if (axios.isAxiosError<ResponseDataType>(e)) {
          if (e.response?.status === 401) {
            enqueueSnackbar(e.response?.data.message, { variant: 'error' });
            navigate('/');
          } else {
            enqueueSnackbar(e.response?.data.message, { variant: 'error' });
            navigate(-1);
          }
        }
      }
    };
    fetchData();
  }, [teamId]);

  const valid = () => {
    if (start !== null && end !== null && start <= end) {
      const s = format(start, 'yyyy-MM-dd');
      const e = format(end, 'yyyy-MM-dd');
      const valids: Sche[] = total.flatMap((mem: TeamMemSche) => {
        return mem.schedules.filter((sche: Sche) => {
          const sD = format(new Date(sche.startTime), 'yyyy-MM-dd');
          const eD = format(new Date(sche.endTime), 'yyyy-MM-dd');
          if ((sD >= s && eD <= e) || (sD <= s && eD >= e) || (sD <= s && eD <= e) || (sD >= s && eD >= e)) return true;
          return false;
        });
      });

      setValidSche(valids);
    } else setValidSche([]); // start, end가 null이면 validSche 초기화
  };

  useEffect(() => {
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

  async function createSchedule(scheName: string, explanation: string, startTime: Date, endTime: Date) {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/schedule/create/${teamId}`,
        { name: scheName, startTime, endTime, explanation },
        {
          headers: {
            'Content-Type': 'application/json',
          },
          withCredentials: true,
        },
      );
      if (response.status === 200) {
        await openAlert({ title: '일정이 성공적으로 생성되었습니다' });
        setTotal((curr) => [...curr, { memberId: null, schedules: [{ startTime, endTime }] }]);
        setStart(startTime);
        setEnd(endTime);
      }
    } catch (e) {
      openAlert({ title: '일정 생성에 실패하였습니다..' });
    }
  }

  const scheduleModal = () => {
    openSchedulePrompt({
      isEmpty: true,
      startDate: start as Date,
      endDate: start as Date,
      onSubmit: (title, content, startTime, endTime) => {
        if (startTime != null && endTime != null) createSchedule(title, content, startTime.toDate(), endTime.toDate());
        else openAlert({ title: '일정 생성 실패', message: '일정의 시작과 끝을 입력해주세요' });
      },
    });
  };

  const onClick = () => {
    scheduleModal();
    // 모달 실행하여 새로운 일정을 추가할 경우 setTeamSche 실행 후 기간 초기화 => 사적모임 메인페이지로 이동?
    // setTeamSche((curr) => curr); // 새로운 팀 일정 추가
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
              <Button
                color="secondary"
                variant={'outlined'}
                onClick={onClick}
                sx={{ color: '#696969', borderColor: '#696969' }}
              >
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
