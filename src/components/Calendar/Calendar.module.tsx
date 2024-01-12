import React, { useState, useEffect } from 'react';
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
// import axios from 'axios';
import { Box, Grid } from '@mui/material';
import { Icon } from '@iconify/react';
import './style.scss';

interface StateTypes {
  name: string;
  startDate: Date;
  endDate: Date;
  explanation: string;
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
        <Icon icon="bi:arrow-left-circle-fill" width="500" height="500" onClick={prevMonth} />
        <Icon icon="bi:arrow-right-circle-fill" width="100" height="100" onClick={nextMonth} />
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
  schedule: StateTypes | undefined;
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

  const isValidSche = (sche: StateTypes | undefined) => {
    if (!sche) return false;
    const scheStart = sche.startDate;
    const scheEnd = sche.endDate;
    const scheStartDate = startOfWeek(scheStart);
    const scheEndDate = endOfWeek(scheEnd);

    if (scheStartDate >= monthStart && scheEndDate <= monthEnd) {
      if (
        format(scheStart, 'yyyy-MM-dd') <= format(day, 'yyyy-MM-dd') &&
        format(scheEnd, 'yyyy-MM-dd') >= format(day, 'yyyy-MM-dd')
      ) {
        return true;
      }
      return false;
    }
    return false;
  };

  while (day <= endDate) {
    for (let i = 0; i < 7; i += 1) {
      formattedDate = format(day, 'd');
      const cloneDay = format(day, 'yyyy-MM-dd');
      let cN = '';
      let color = 'red';
      if (!isSameMonth(day, monthStart)) {
        cN = 'disabled';
        color = 'blue';
      } else if (isSameDay(day, selectedDate)) {
        cN = 'selected';
      } else if (format(currentMonth, 'M') !== format(day, 'M')) {
        cN = 'not-valid';
      } else {
        cN = 'valid';
      }
      const isvalidsche = isValidSche(schedule);
      if (isvalidsche) {
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
              <Grid container>
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
                />
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
                  {schedule?.name}
                </Grid>
              </Grid>
            </Grid>
          </Grid>,
        );
      } else if (!isvalidsche) {
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
              <Grid container>
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
                />
                <Grid
                  xs={11}
                  sm={11}
                  md={11}
                  lg={11}
                  xl={11}
                  display="flex"
                  justifyContent="start"
                  className={'schedule'}
                >
                  Not Well Formed
                </Grid>
              </Grid>
            </Grid>
          </Grid>,
        ); // 나중에 sx 태그로 배경색 바꾸기 가능
      }
      day = addDays(day, 1);
    }
    rows.push(
      <Grid container display="flex" justifyContent="center" className="row" key={formattedDate}>
        {days}
      </Grid>,
    );
    days = [];
  }
  return <Box className="body">{rows}</Box>;
};

export const Calendar = () => {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());

  const prevMonth = () => {
    setCurrentMonth(subMonths(currentMonth, 1));
  };
  const nextMonth = () => {
    setCurrentMonth(addMonths(currentMonth, 1));
  };
  const onDateClick = (day: Date) => {
    setSelectedDate(day);
  };

  const [sches, setSches] = useState<StateTypes>();
  /*
  async function fetchSches() {
    const url = 'http://localhost:3000/schedule';

    const { data: allSche, status } = await axios.get(url);
    if (status === 200) {
      setSches(allSche);
    }
  }
  */

  useEffect(() => {
    // fetchSches();
    setSches({
      name: 'test1',
      startDate: new Date('2024-01-11'),
      endDate: new Date('2024-01-13'),
      explanation: 'test1',
    });
  }, []); // 일정 생성 / 수정 / 삭제 버튼이 눌려졌을 때만 useEffect가 실행되도록 변경 필요!!

  return (
    <Box className="calendar">
      <RenderHeader currentMonth={currentMonth} prevMonth={prevMonth} nextMonth={nextMonth} />
      <RenderDays />
      <RenderCells currentMonth={currentMonth} selectedDate={selectedDate} onDateClick={onDateClick} schedule={sches} />
    </Box>
  );
};
