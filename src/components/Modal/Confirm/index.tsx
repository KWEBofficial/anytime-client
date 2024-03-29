import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';

import { IModal } from '../../../types/modal';

export interface ConfirmProps extends IModal {
  title?: string;
  message?: string;
  cancelText?: string;
  confirmText?: string;
  onCancel?: VoidFunction;
  onConfirm?: VoidFunction;
}

const style = {
  position: 'absolute' as const,
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '1px solid #000',
  boxShadow: 24,
  borderRadius: 5,
  p: 4,
};

const Confirm = ({
  visible = false,
  onClose,
  title,
  message,
  cancelText,
  onCancel,
  confirmText,
  onConfirm,
}: ConfirmProps) => {
  const handleCancel = () => {
    onCancel?.();
    onClose?.();
  };
  const handleConfirm = () => {
    onConfirm?.();
    onClose?.();
  };
  return (
    <Modal open={visible} onClose={onClose}>
      <Box sx={style}>
        {title && (
          <Typography variant="h6" component="h2">
            {title}
          </Typography>
        )}
        {message && <Typography sx={{ mt: 2 }}>{message}</Typography>}
        <Grid container justifyContent="flex-end">
          <Button onClick={handleConfirm}>{confirmText}</Button>
          <Button onClick={handleCancel}>{cancelText}</Button>
        </Grid>
      </Box>
    </Modal>
  );
};

export default Confirm;
