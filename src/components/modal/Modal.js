import { Backdrop, Box, Divider, Fade, Modal, Typography } from "@mui/material";

import CloseIcon from "@mui/icons-material/Close";

const modalpop = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  bgcolor: "background.paper",
  maxWidth: 600,
  minWidth: 312,
  border: "1px solid #000",
  boxShadow: 24,
  borderRadius: "6px",
  p: 2,
};

const ModalPopUp = (props) => {
  return (
    <>
      <Modal
        open={props.switch}
        onClose={props.handle}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={props.switch}>
          <Box
            sx={
              props.width
                ? Object.assign({}, modalpop, { width: props.width })
                : modalpop
            }
          >
            <Box
              sx={{
                pb: 2,
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <Typography variant="h6" sx={{ mr: 1 }}>
                {props.title}
              </Typography>
              <CloseIcon onClick={props.handle} cursor="pointer" />
            </Box>
            <Divider />
            {props.children}
          </Box>
        </Fade>
      </Modal>
    </>
  );
};

export default ModalPopUp;
