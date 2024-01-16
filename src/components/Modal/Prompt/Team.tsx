import { useForm } from 'react-hook-form';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';

import { IModal } from '../../../types/modal';
import ColorPick from '../../ColorPick';
import { Stack, Typography } from '@mui/material';

export interface PromptProps extends IModal {
  isPublic: boolean;
  titleText?: string;
  buttonText?: string;
  onSubmit?: (title: string, content: string, color: string) => void;
}

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  //border: '1px solid #000',
  boxShadow: 24,
  borderRadius: 5,
  p: 4,
};

const PromptModal = ({ visible = false, onClose, isPublic, titleText, buttonText, onSubmit }: PromptProps) => {
  const {
    register,
    setValue,
    handleSubmit: handleFormSubmit,
  } = useForm<{
    title: string;
    content: string;
    color: string;
  }>();

  const handleSubmit: Parameters<typeof handleFormSubmit>[0] = (values) => {
    onSubmit?.(values.title, values.content, values.color);
    onClose?.();
  };

  const handleCancel = () => {
    onClose?.();
  };

  const handleColorChange = (colorEvent: { target: { value: string } }) => {
    const selectedColor = colorEvent.target.value;
    setValue('color', selectedColor);
  };

  return (
    <Modal open={visible} onClose={onClose}>
      <Box sx={style}>
        <Stack direction="column" justifyContent="center" alignItems="center" spacing={2}>
          <Typography variant="h6" component="h2" sx={{ fontWeight: '500', letterSpacing: 0 }}>
            {titleText}
          </Typography>
          <TextField
            {...register('title', { required: true })}
            sx={{ width: '100%' }}
            label="모임 이름"
            placeholder="모임의 이름을 입력해주세요"
            variant="standard"
          />
          <TextField
            {...register('content', { required: true })}
            sx={{ width: '100%' }}
            label="모임 설명"
            multiline
            maxRows={4}
            placeholder="모임에 대한 설명을 간단히 적어주세요"
            variant="standard"
          />

          <ColorPick isPublic={isPublic} onColorChange={handleColorChange} />

          <Stack direction="row" justifyContent="flex-end" alignItems="flex-end" spacing={2}>
            <Button variant="outlined" onClick={handleFormSubmit(handleSubmit)}>
              {buttonText}
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

export default PromptModal;
