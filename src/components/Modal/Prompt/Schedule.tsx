import { useForm } from 'react-hook-form';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';

import { IModal } from '../../../types/modal';
import { Stack, Typography } from '@mui/material';

import dayjs, { Dayjs } from 'dayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import React from 'react';

export interface SchedulePromptProps extends IModal {
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

const SchedulePrompt = ({ visible = false, onClose, onSubmit }: SchedulePromptProps) => {
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
    onSubmit?.(values.title, values.content, values.start, values.end);
    onClose?.();
  };

  const handleCancel = () => {
    onClose?.();
  };

  const [start, setStart] = React.useState<Dayjs | null>(dayjs('2022-04-17T15:30'));
  const [end, setEnd] = React.useState<Dayjs | null>(dayjs('2022-04-17T15:30'));

  const handleStartChange = (value: Dayjs | null) => {
    const selectedStart = value;
    setStart(selectedStart);
    setValue('start', selectedStart);
  };

  const handleEndChange = (value: Dayjs | null) => {
    const selectedEnd = value;
    setEnd(selectedEnd);
    setValue('end', selectedEnd);
  };

  return (
    <Modal open={visible} onClose={onClose}>
      <Box sx={style}>
        <Stack direction="column" justifyContent="center" alignItems="center" spacing={2}>
          <Typography variant="h6" component="h2">
            일정 생성
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
            <DateTimePicker sx={{ width: '100%' }} label="시작 날짜/시간" value={start} onChange={handleStartChange} />
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
      </Box>
    </Modal>
  );
};

export default SchedulePrompt;
