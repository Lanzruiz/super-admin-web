import { Container, Fade, Modal } from '@mui/material';

export default function ModalWrapper({
  open,
  onClose,
  containerSize,
  children,
  ...restProps
}) {
  return (
    <Modal
      open={open}
      onClose={onClose}
      closeAfterTransition
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
      {...restProps}
    >
      <Fade in={open}>
        <Container
          maxWidth={containerSize}
          style={{
            padding: 0,
            maxHeight: '90vh',
            overflowY: 'auto',
          }}
        >
          {children}
        </Container>
      </Fade>
    </Modal>
  );
}
