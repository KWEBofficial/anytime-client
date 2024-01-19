import { TextField, TextFieldProps } from '@mui/material';

export function CustomTextfield(prop: TextFieldProps) {
  return <TextField size="small" InputProps={{ style: { backgroundColor: 'white', borderRadius: 10 } }} {...prop} />;
}
