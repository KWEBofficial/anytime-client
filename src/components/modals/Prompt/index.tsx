import { useForm } from 'react-hook-form';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';

import { IModal } from '../../../types/modal';
import ColorPick from '../../colorPick';

export interface PromptProps extends IModal {
  onSubmit?: (title: string, content: string) => void;
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

const PromptModal = ({ visible = false, onClose, onSubmit }: PromptProps) => {
  const { register, handleSubmit: handleFormSubmit } = useForm<{
    title: string;
    content: string;
  }>();

  const handleSubmit: Parameters<typeof handleFormSubmit>[0] = (values) => {
    onSubmit?.(values.title, values.content);
    onClose?.();
  };

  //const handleClose

  return (
    <Modal open={visible} onClose={onClose}>
      <Box sx={style}>
        <TextField
          {...register('title', { required: true })}
          sx={{ width: '100%', marginBottom: 2 }}
          label="모임 이름"
          placeholder="모임의 이름을 입력해주세요"
          variant="standard"
        />
        <TextField
          {...register('content', { required: true })}
          sx={{ width: '100%', marginBottom: 2 }}
          label="모임 설명"
          multiline
          maxRows={4}
          placeholder="모임에 대한 설명을 간단히 적어주세요"
          variant="standard"
        />
        <ColorPick />
        <Grid container justifyContent="flex-end">
          <Button variant="contained" color="success" onClick={handleFormSubmit(handleSubmit)}>
            Submit
          </Button>
        </Grid>
      </Box>
    </Modal>
  );
};

export default PromptModal;
