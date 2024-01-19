import { useParams, useNavigate } from 'react-router-dom';
import React, { useState } from 'react';
import { enqueueSnackbar } from 'notistack';
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
  addWeeks,
  parse,
  isToday,
} from 'date-fns';
import axios from 'axios';
import { Box, Grid, Stack } from '@mui/material';
import ArrowCircleRightSharpIcon from '@mui/icons-material/ArrowCircleRightSharp';
import ArrowCircleLeftSharpIcon from '@mui/icons-material/ArrowCircleLeftSharp';

import './style.scss';
import { useModal } from '../Modal/useModal';
import { ResponseDataType } from '../../models/ResponseDataType';
import { ScheType, CalendarProps } from '../../models/calendar';
import { useCalender } from '../../contexts/calenderContext';

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
  schedule: ScheType[];
  onDateClick: (date: Date) => void;
  onScheClick: (sche: ScheType) => void;
}
const navigate = useNavigate();

const RenderCells = ({ currentMonth, selectedDate, schedule, onDateClick, onScheClick }: RenderCellsProps) => {
  const monthStart = startOfMonth(currentMonth);
  const monthEnd = endOfMonth(monthStart);
  const startDate = startOfWeek(monthStart);
  const endDate = endOfWeek(monthEnd);

  const rows = [];
  let days = [];
  let day = startDate;
  let formattedDate = '';

  const isValidSche = (sche: ScheType[]) => {
    const validSche: ScheType[] = [];
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

  const rowHeight = isSameMonth(monthStart, addWeeks(startDate, 5)) ? '16.6%' : '20%';

  while (day <= endDate) {
    for (let i = 0; i < 7; i += 1) {
      formattedDate = format(day, 'd');
      const cloneDay = format(day, 'yyyy-MM-dd');
      let cN = '';
      if (!isSameMonth(day, monthStart)) {
        cN = 'disabled';
      } else if (isSameDay(day, selectedDate)) {
        cN = 'selected';
      } else if (isToday(day)) {
        cN = 'today';
      } else if (format(currentMonth, 'M') !== format(day, 'M')) {
        cN = 'not-valid';
      } else {
        cN = 'valid';
      }

      const schesBox = [];
      const validSche = isValidSche(schedule);

      if (validSche) {
        for (let j = 0; j < validSche.length; j += 1) {
          let color = '#96B1D0';
          color = validSche[j].color === '' ? color : validSche[j].color;
          color = cN === 'disabled' ? '#929292' : color;
          schesBox.push(
            <Grid
              container
              key={j}
              className="scheBox"
              onClick={(e) => {
                onScheClick(validSche[j]);
                e.stopPropagation();
              }}
              xs={12}
            >
              <Grid
                xs={1}
                sm={1}
                md={1}
                lg={1}
                xl={1}
                sx={{
                  backgroundColor: color,
                  border: 'border: 0.5px solid #9da7d4',
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
                whiteSpace={'nowrap'}
                overflow={'hidden'}
              >
                {validSche[j].name}
              </Grid>
            </Grid>,
          );
        }
      }

      const dateOnClick = cN === 'disabled' ? () => {} : () => onDateClick(parse(cloneDay, 'yyyy-MM-dd', new Date()));
      // 해당 월에 포함되지 않는 일자 cell을 클릭할 경우 아무런 변화가 없도록 처리.
      days.push(
        <Grid className={`col cell ${cN}`} key={cloneDay} onClick={dateOnClick} overflow={'scroll'}>
          <Stack
            sx={{
              alignItems: 'start',
              p: 0.5,
              width: '100%',
            }}
            className={format(currentMonth, 'M') !== format(day, 'M') ? 'text not-valid' : ''}
          >
            <Box
              sx={{
                fontWeight: 'bold',
                fontSize: 20,
              }}
            >
              {formattedDate}
            </Box>
            <Grid container>{schesBox}</Grid>
          </Stack>
        </Grid>,
      );
      day = addDays(day, 1);
    }
    rows.push(
      <Grid className="row" key={format(day, 'yyyy-MM-dd')} maxHeight={rowHeight}>
        {days}
      </Grid>,
    );
    days = [];
  }
  return (
    <Box height={'100%'} className="body">
      {rows}
    </Box>
  );
};

export const Calendar = ({ isEditable, height, width, schedules, isMyPage }: CalendarProps) => {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());
  const { openAlert, openSchedulePrompt } = useModal();
  const params = useParams();
  const { teamId } = params;
  const { refreshCalender } = useCalender();

  const prevMonth = () => {
    setCurrentMonth(subMonths(currentMonth, 1));
  };
  const nextMonth = () => {
    setCurrentMonth(addMonths(currentMonth, 1));
  };
  const onDateClick = (day: Date) => {
    setSelectedDate(day);
    if (isEditable) createScheduleModal(day);
  };

  async function createSchedule(scheName: string, explanation: string, startTime: Date, endTime: Date) {
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
        enqueueSnackbar('일정이 추가되었습니다.', { variant: 'success' });
        refreshCalender();
      }
    } catch (e) {
      if (axios.isAxiosError<ResponseDataType>(e)) {
        if (e.response?.status === 401) {
          enqueueSnackbar(e.response?.data.message, { variant: 'error' });
          navigate('/');
        } else {
          enqueueSnackbar(e.response?.data.message, { variant: 'error' });
        }
      }
    }
  }

  async function editSchedule(
    scheName: string,
    explanation: string,
    startTime: Date,
    endTime: Date,
    scheduleId: number,
  ) {
    try {
      const response = await axios.patch(
        `${process.env.REACT_APP_API_URL}/schedule/${scheduleId}`,
        { name: scheName, startTime, endTime, explanation },
        {
          headers: {
            'Content-Type': 'application/json',
          },
          withCredentials: true,
        },
      );
      if (response.status === 200) {
        enqueueSnackbar('일정이 수정되었습니다.', { variant: 'success' });
        refreshCalender();
      }
    } catch (e) {
      enqueueSnackbar('일정 수정에 실패하였습니다.', { variant: 'error' });
    }
  }

  async function deleteSchedule(scheduleId: number) {
    try {
      const response = await axios.delete(`${process.env.REACT_APP_API_URL}/schedule/${scheduleId}`, {
        headers: {
          'Content-Type': 'application/json',
        },
        withCredentials: true,
      });
      if (response.status === 200) {
        enqueueSnackbar('일정이 삭제되었습니다.', { variant: 'success' });
        refreshCalender();
      }
    } catch (e) {
      enqueueSnackbar('일정 삭제에 실패하였습니다..', { variant: 'error' });
    }
  }

  const createScheduleModal = (clickDay: Date) => {
    openSchedulePrompt({
      isEmpty: true,
      isEditable,
      startDate: clickDay,
      endDate: clickDay,
      onSubmit: (title, content, startTime, endTime) => {
        if (startTime != null && endTime != null) createSchedule(title, content, startTime.toDate(), endTime.toDate());
        else openAlert({ title: '일정 생성 실패', message: '일정의 시작과 끝을 입력해주세요' });
      },
    });
  };

  const editScheduleModal = (sche: ScheType) => {
    openSchedulePrompt({
      isEmpty: false,
      isEditable: isMyPage && sche.teamId !== 0 ? false : isEditable,
      name: sche.name,
      startDate: sche.startDate,
      endDate: sche.endDate,
      explanation: sche.explanation,
      onSubmit: (title, content, startTime, endTime) => {
        if (startTime != null && endTime != null)
          editSchedule(title, content, startTime.toDate(), endTime.toDate(), sche.scheId);
        else openAlert({ title: '일정 수정 실패', message: '일정의 시작과 끝을 입력해주세요' });
      },
      onDelete: (ondelete) => {
        if (ondelete) deleteSchedule(sche.scheId);
      },
    });
  };

  const sches = schedules
    .filter((sche) => {
      if (
        sche.startDate >= startOfWeek(startOfMonth(currentMonth)) ||
        sche.endDate <= endOfWeek(endOfMonth(currentMonth))
      )
        return true;
      return false;
    })
    .sort((a, b) => {
      if (a.startDate < b.startDate) return -1;
      return 1;
    });
  // 불러온 일정들 중 해당 월에 포함되는 일정들 필터링 후, 시작일 기준으로 정렬

  return (
    <Box
      className="calendar"
      sx={{
        height: { height },
        width: { width },
      }}
    >
      <RenderHeader currentMonth={currentMonth} prevMonth={prevMonth} nextMonth={nextMonth} />
      <RenderDays />
      <RenderCells
        currentMonth={currentMonth}
        selectedDate={selectedDate}
        schedule={sches}
        onDateClick={onDateClick}
        onScheClick={editScheduleModal}
      />
    </Box>
  );
};
