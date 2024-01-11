import * as React from 'react';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Modal from '@mui/material/Modal';

import Button from '@mui/material/Button';
import Box from '@mui/material/Box';

type ModalProps = {
  isOpen: boolean;
  closeModal(): void;
  children: React.ReactNode;
};

function CustomModal({ isOpen, closeModal, children }: ModalProps) {
  return (
    <div>
      <Modal open={isOpen} onClose={closeModal}>
        <Paper
          elevation={2}
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 800,
            maxWidth: '100%',
            maxHeight: '90%',
            overflowY: 'auto',
          }}
        >
          {children}
        </Paper>
      </Modal>
    </div>
  );
}

export default CustomModal;
