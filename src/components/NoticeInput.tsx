import { useState } from 'react';
import axios from 'axios';
import { Box, Button, Checkbox, FormControlLabel, Paper, Stack } from '@mui/material';

import { CustomTextfield } from './CustomTextfield';

const makeTimeInput = (date: Date) => {
  return new Date(date.getTime() + 9 * 60 * 60 * 1000).toISOString().slice(0, 16);
};
interface Prop {
  noticeId?: string;
  type: string;
  teamId: string;
  content?: string;
  startDate?: Date;
  endDate?: Date;
  isPrior?: boolean;
}

export default function NoticeInput({ noticeId, type, teamId, content, startDate, endDate, isPrior }: Prop) {
  const [input, setInput] = useState({
    startDate,
    endDate,
    content,
    isPrior,
  });
  function inputChange(event: React.ChangeEvent<HTMLInputElement>) {
    setInput({
      ...input,
      [event.target.id]: event.target.value,
    });
  }
  function checkChange(event: React.ChangeEvent<HTMLInputElement>) {
    setInput({
      ...input,
      [event.target.id]: event.target.checked,
    });
  }
  async function clickCreate() {
    try {
      if (!input.startDate || !input.endDate || !input.content) window.alert('내용을 입력하시기 바랍니다.');
      else if (input.startDate > input.endDate) window.alert('게시일자가 게시기한보다 늦을 수 없습니다.');
      else {
        const response = await axios.post(
          `${process.env.REACT_APP_API_URL}/notice/create/${teamId}`,
          {
            startDate: input.startDate,
            endDate: input.endDate,
            content: input.content,
            isPrior: input.isPrior,
          },
          {
            headers: {
              'Content-Type': 'application/json',
            },
          },
        );
        if (response.status === 200) {
          window.alert('공지사항이 생성되었습니다.');
          window.location.reload();
        }
      }
    } catch (e) {
      window.alert('공지사항 생성에 실패했습니다.');
    }
  }
  async function clickUpdate() {
    try {
      if (!input.startDate || !input.endDate || !input.content) window.alert('내용을 입력하시기 바랍니다.');
      else if (input.startDate > input.endDate) window.alert('게시일자가 게시기한보다 늦을 수 없습니다.');
      else {
        const response = await axios.patch(
          `${process.env.REACT_APP_API_URL}notice/${noticeId}`,
          {
            startDate: input.startDate,
            endDate: input.endDate,
            content: input.content,
            isPrior: input.isPrior,
          },
          {
            headers: {
              'Content-Type': 'application/json',
            },
          },
        );
        if (response.status === 200) {
          window.alert('공지사항이 수정되었습니다.');
          window.location.reload();
        }
      }
    } catch (e) {
      window.alert('공지사항 수정에 실패했습니다.');
    }
  }

  return (
    <Paper
      elevation={type === '수정' ? 0 : 3}
      sx={type === '수정' ? { flexGrow: 1, marginX: '0' } : { maxWidth: '900px', marginX: 'auto' }}
    >
      <Box padding={2} margin={5} marginX="auto">
        <Stack spacing={3}>
          <Box sx={{ display: 'flex', flexDirection: 'row' }}>
            <CustomTextfield
              id="startDate"
              label="게시 일자"
              InputLabelProps={{ shrink: true }}
              type="datetime-local"
              onChange={inputChange}
              defaultValue={startDate ? makeTimeInput(new Date(startDate)) : ''}
              sx={{ flex: 3 }}
            ></CustomTextfield>
            <CustomTextfield
              id="endDate"
              label="게시 기한"
              InputLabelProps={{ shrink: true }}
              type="datetime-local"
              onChange={inputChange}
              defaultValue={endDate ? makeTimeInput(new Date(endDate)) : ''}
              sx={{ flex: 3 }}
            ></CustomTextfield>
            <FormControlLabel
              control={<Checkbox id="isPrior" onChange={checkChange} defaultChecked={Boolean(isPrior)} />}
              label="중요"
              sx={{ flex: 1, marginLeft: '5px' }}
            />
            <Box sx={{ flex: 1.5 }}></Box>
            <Button variant="text" id="isPrior" onClick={type === '수정' ? clickUpdate : clickCreate}>
              {type}
            </Button>
          </Box>
          <CustomTextfield
            multiline
            minRows={3}
            id="content"
            label="내용 (최대 256자)"
            inputProps={{ maxLength: 256 }}
            onChange={inputChange}
            defaultValue={content}
          ></CustomTextfield>
        </Stack>
      </Box>
    </Paper>
  );
}
