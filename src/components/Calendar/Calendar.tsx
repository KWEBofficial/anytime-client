import React, { useEffect, useState } from 'react';
import {
  format,
  addMonths,
  subMonths,
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  isSameMonth,
  isSameDay,
  addDays,
  parse,
} from 'date-fns';
import axios from 'axios';
import { Box, Grid } from '@mui/material';
import ArrowCircleRightSharpIcon from '@mui/icons-material/ArrowCircleRightSharp';
import ArrowCircleLeftSharpIcon from '@mui/icons-material/ArrowCircleLeftSharp';

import './style.scss';
import { useModal } from '../Modal/useModal';

interface StateTypes {
  name: string;
  startDate: Date;
  endDate: Date;
  explanation: string;
  color: string;
}

interface RenderHeaderProps {
  currentMonth: Date;
  prevMonth: () => void;
  nextMonth: () => void;
}

const RenderHeader = ({ currentMonth, prevMonth, nextMonth }: RenderHeaderProps) => {
  return (
    <Box className="header row">
      <Box className="col col-first">
        <Box component="span" className="text">
          <Box component="span" className="text month">
            {format(currentMonth, 'M')}월
          </Box>
          {format(currentMonth, 'yyyy')}
        </Box>
      </Box>
      <Box className="col col-end">
        <ArrowCircleLeftSharpIcon onClick={prevMonth} />
        <ArrowCircleRightSharpIcon onClick={nextMonth} />
      </Box>
    </Box>
  );
};

const RenderDays = () => {
  const days = [];
  const date = ['Sun', 'Mon', 'Thu', 'Wed', 'Thrs', 'Fri', 'Sat'];

  for (let i = 0; i < 7; i += 1) {
    days.push(
      <Box className="col" key={i}>
        {date[i]}
      </Box>,
    );
  }

  return <Box className="days">{days}</Box>;
};

interface RenderCellsProps {
  currentMonth: Date;
  selectedDate: Date;
  onDateClick: (date: Date) => void;
  schedule: StateTypes[];
}

const RenderCells = ({ currentMonth, selectedDate, onDateClick, schedule }: RenderCellsProps) => {
  const monthStart = startOfMonth(currentMonth);
  const monthEnd = endOfMonth(monthStart);
  const startDate = startOfWeek(monthStart);
  const endDate = endOfWeek(monthEnd);

  const rows = [];
  let days = [];
  let day = startDate;
  let formattedDate = '';

  const isValidSche = (sche: StateTypes[]) => {
    const validSche = [];
    if (!sche) return [];
    for (let i = 0; i < sche.length; i += 1) {
      const scheStart = sche[i].startDate;
      const scheEnd = sche[i].endDate;
      const scheStartDate = startOfWeek(scheStart);
      const scheEndDate = endOfWeek(scheEnd);

      if (scheStartDate >= startDate && scheEndDate <= endDate) {
        if (
          format(scheStart, 'yyyy-MM-dd') <= format(day, 'yyyy-MM-dd') &&
          format(scheEnd, 'yyyy-MM-dd') >= format(day, 'yyyy-MM-dd')
        ) {
          validSche.push(sche[i]);
        }
      }
    }
    return validSche;
  };

  while (day <= endDate) {
    for (let i = 0; i < 7; i += 1) {
      formattedDate = format(day, 'd');
      const cloneDay = format(day, 'yyyy-MM-dd');
      let cN = '';
      if (!isSameMonth(day, monthStart)) {
        cN = 'disabled';
      } else if (isSameDay(day, selectedDate)) {
        cN = 'selected';
      } else if (format(currentMonth, 'M') !== format(day, 'M')) {
        cN = 'not-valid';
      } else {
        cN = 'valid';
      }

      const schesBox = [];
      const validSche = isValidSche(schedule);

      if (validSche) {
        const length = validSche.length <= 3 ? validSche.length : 3;
        for (let j = 0; j < length; j += 1) {
          let color = '#96B1D0';
          color = validSche[j].color === '' ? color : validSche[j].color;
          color = cN === 'disabled' ? '#929292' : color;
          schesBox.push(
            <Grid container key={j} className="scheBox" onClick={() => alert(validSche[j].name)}>
              <Grid
                xs={1}
                sm={1}
                md={1}
                lg={1}
                xl={1}
                sx={{
                  backgroundColor: color,
                  borderTopLeftRadius: '5px',
                  borderBottomLeftRadius: '5px',
                }}
              ></Grid>
              <Grid
                xs={11}
                sm={11}
                md={11}
                lg={11}
                xl={11}
                display="flex"
                justifyContent="center"
                className={'schedule'}
              >
                {validSche[j].name}
              </Grid>
            </Grid>,
          );
        }
      }

      days.push(
        <Grid
          className={`col cell ${cN}`}
          key={cloneDay}
          onClick={() => onDateClick(parse(cloneDay, 'yyyy-MM-dd', new Date()))}
        >
          <Grid
            sx={{
              alignItems: 'start',
              p: 0.5,
            }}
            container
            className={format(currentMonth, 'M') !== format(day, 'M') ? 'text not-valid' : ''}
          >
            <Grid
              sx={{
                fontWeight: 'bold',
                fontSize: 20,
              }}
            >
              {formattedDate}
            </Grid>
            <Grid container>{schesBox}</Grid>
          </Grid>
        </Grid>,
      );
      day = addDays(day, 1);
    }
    rows.push(
      <Grid className="row" key={formattedDate}>
        {days}
      </Grid>,
    );
    days = [];
  }
  return (
    <Box height={'500px'} className="body">
      {rows}
    </Box>
  );
};

export const Calendar = () => {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());
  const { openAlert, openSchedulePrompt } = useModal();

  const prevMonth = () => {
    setCurrentMonth(subMonths(currentMonth, 1));
  };
  const nextMonth = () => {
    setCurrentMonth(addMonths(currentMonth, 1));
  };
  const onDateClick = (day: Date) => {
    setSelectedDate(day);
    scheduleModal();
  };

  async function createSchedule(
    scheName: string,
    explanation: string,
    startTime: Date,
    endTime: Date,
    teamId?: number,
  ) {
    try {
      const apiUrl = teamId
        ? `${process.env.REACT_APP_API_URL}/schedule/create/${teamId}`
        : `${process.env.REACT_APP_API_URL}/schedule/create`;

      const response = await axios.post(
        apiUrl,
        { name: scheName, startTime, endTime, explanation },
        {
          headers: {
            'Content-Type': 'application/json',
          },
          withCredentials: true,
        },
      );
      if (response.status === 200) {
        openAlert({ title: '일정이 성공적으로 생성되었습니다' });
      }
    } catch (e) {
      openAlert({ title: '일정 생성에 실패하였습니다..' });
    }
  }

  const scheduleModal = () => {
    openSchedulePrompt({
      isEmpty: true,
      onSubmit: (title, content, startTime, endTime) => {
        if (startTime != null && endTime != null) createSchedule(title, content, startTime.toDate(), endTime.toDate());
        else openAlert({ title: '일정 생성 실패', message: '일정의 시작과 끝을 입력해주세요' });
      },
    });
  };

  const [sches, setSches] = useState<StateTypes[]>([
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
  ]);

  useEffect(() => setSches((curr) => curr));

  /*
  async function fetchSches() {
    const url = 'http://localhost:3000/schedule';

    const { data: allSche, status } = await axios.get(url);
    if (status === 200) {
      setSches(allSche);
    }
  }
  */

  /*
  useEffect(() => {
  // fetchSches();
  setSches((curr) => [
    {
      name: '해커톤 시작',
      startDate: new Date('2024-01-08'),
      endDate: new Date('2024-01-13'),
      explanation: 'test1',
    },
    {
      name: '해커톤 시작222',
      startDate: new Date('2024-01-02'),
      endDate: new Date('2024-01-04'),
      explanation: 'test2',
    },
    ...curr,
  ]);
  }, []); // 일정 생성 / 수정 / 삭제 버튼이 눌려졌을 때만 useEffect가 실행되도록 변경 필요!!
  */

  return (
    <Box className="calendar">
      <RenderHeader currentMonth={currentMonth} prevMonth={prevMonth} nextMonth={nextMonth} />
      <RenderDays />
      <RenderCells currentMonth={currentMonth} selectedDate={selectedDate} onDateClick={onDateClick} schedule={sches} />
    </Box>
  );
};
