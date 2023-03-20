import { Alert, AlertTitle, Collapse, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

const CustomAlert = ({
  open,
  title,
  onClose,
  onTransitionEnd = null,
  message = '',
  severity = 'info',
  withCloseButton = false,
  withCollapse = false,
}) => {
  return !withCollapse ? (
    <Collapse
      in={open}
      sx={{ border: '1px solid black', borderRadius: '5px' }}
      onTransitionEnd={() => onTransitionEnd && onTransitionEnd()}
    >
      <Alert
        action={
          withCloseButton &&
          onClose && (
            <IconButton color="inherit" size="small" onClick={onClose}>
              <CloseIcon fontSize="inherit" />
            </IconButton>
          )
        }
      >
        {title && <AlertTitle>{title}</AlertTitle>}
        {message}
      </Alert>
    </Collapse>
  ) : (
    open && (
      <Alert
        severity={severity}
        action={
          withCloseButton &&
          onClose && (
            <IconButton color="inherit" size="small" onClick={onClose}>
              <CloseIcon fontSize="inherit" />
            </IconButton>
          )
        }
      >
        {title && <AlertTitle>{title}</AlertTitle>}
        {message}
      </Alert>
    )
  );
};
export default CustomAlert;
