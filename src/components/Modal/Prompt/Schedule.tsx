import { useForm } from 'react-hook-form';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import { Stack, Typography } from '@mui/material';

import { IModal } from '../../../types/modal';

import dayjs, { Dayjs } from 'dayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import React from 'react';
import TextField from '@mui/material/TextField';
import Modal from '@mui/material/Modal';

export interface SchedulePromptProps extends IModal {
  isEmpty: boolean; // 일정 생성 or 일정 확인 및 수정
  scheduleId?: number;
  onSubmit?: (title: string, content: string, start: Dayjs | null, end: Dayjs | null) => void;
}

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '1px solid #000',
  boxShadow: 24,
  p: 4,
};

const SchedulePrompt = ({ visible = false, onClose, isEmpty, onSubmit }: SchedulePromptProps) => {
  const {
    register,
    setValue,
    handleSubmit: handleFormSubmit,
  } = useForm<{
    title: string;
    content: string;
    start: Dayjs | null;
    end: Dayjs | null;
  }>();

  const handleSubmit: Parameters<typeof handleFormSubmit>[0] = (values) => {
    onSubmit?.(values.title, values.content, start, end);
    onClose?.();
  };

  const handleCancel = () => {
    onClose?.();
  };

  const content = {
    scheduleName: '해커톤 회의',
    startTime: dayjs('2024-01-17T15:30'),
    endTime: dayjs('2024-01-17T18:30'),
    explanation: '최종 발표 전 마지막 회의',
  };

  const [start, setStart] = React.useState<Dayjs | null>(dayjs(content.startTime ? dayjs(content.startTime) : dayjs()));
  const [end, setEnd] = React.useState<Dayjs | null>(dayjs(content.endTime ? dayjs(content.endTime) : dayjs()));

  const handleStartChange = (value: Dayjs | null) => {
    setStart(value);
  };

  const handleEndChange = (value: Dayjs | null) => {
    setEnd(value);
  };

  return (
    <Modal open={visible} onClose={onClose}>
      <Box sx={style}>
        {isEmpty ? (
          <Stack direction="column" justifyContent="center" alignItems="center" spacing={2}>
            <Typography variant="h6" component="h2">
              일정 추가
            </Typography>

            <TextField
              {...register('title', { required: true })}
              sx={{ width: '100%', marginBottom: 2 }}
              label="제목"
              placeholder="어떤 일정이 있나요?"
              //variant="standard"
            />
            <TextField
              {...register('content', { required: false })}
              sx={{ width: '100%', marginBottom: 2 }}
              label="메모"
              multiline
              rows={4}
              placeholder="간단 메모"
              //variant="standard"
            />

            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DateTimePicker
                sx={{ width: '100%' }}
                label="시작 날짜/시간"
                value={start}
                onChange={handleStartChange}
              />
              <DateTimePicker sx={{ width: '100%' }} label="종료 날짜/시간" value={end} onChange={handleEndChange} />
            </LocalizationProvider>

            <Stack direction="row" justifyContent="flex-end" alignItems="flex-end" spacing={2}>
              <Button variant="outlined" onClick={handleFormSubmit(handleSubmit)}>
                저장
              </Button>
              <Button variant="outlined" onClick={handleCancel}>
                취소
              </Button>
            </Stack>
          </Stack>
        ) : (
          <Stack direction="column" justifyContent="center" alignItems="center" spacing={2}>
            <Typography variant="h6" component="h2">
              일정 확인
            </Typography>

            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DateTimePicker
                sx={{ width: '100%' }}
                label="시작"
                value={start}
                onChange={handleStartChange}
                defaultValue={content.startTime}
              />
              <DateTimePicker
                sx={{ width: '100%' }}
                label="종료"
                value={end}
                onChange={handleEndChange}
                defaultValue={content.endTime}
              />
            </LocalizationProvider>

            <TextField
              {...register('title', { required: true })}
              sx={{ width: '100%', marginBottom: 2 }}
              label="제목"
              variant="filled"
              defaultValue={content.scheduleName}
            />
            <TextField
              {...register('content', { required: false })}
              sx={{ width: '100%', marginBottom: 2 }}
              label="메모"
              variant="filled"
              multiline
              rows={4}
              defaultValue={content.explanation}
            />

            <Stack direction="row" justifyContent="flex-end" alignItems="flex-end" spacing={2}>
              <Button variant="outlined" onClick={handleFormSubmit(handleSubmit)}>
                수정
              </Button>
              <Button variant="outlined" onClick={handleCancel}>
                삭제
              </Button>
              <Button variant="outlined" onClick={handleCancel}>
                취소
              </Button>
            </Stack>
          </Stack>
        )}
      </Box>
    </Modal>
  );
};

export default SchedulePrompt;
