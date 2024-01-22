import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";

import React from "react";

function AcknowledgementDialogue(props) {
  const title = props.title;
  const dialogueText = props.text;
  const handleCloseWithConfirm = props.handleCloseWithConfirm;
  const open = props.open;
  return (
    <Dialog
      PaperProps={{
        sx: {
          width: "370px",
          height: "224px",
        },
      }}
      open={open}
      onClose={handleCloseWithConfirm}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title" className="pt-![10px]">
        {title}
      </DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description" className="pt-[10px]">
          {dialogueText}
        </DialogContentText>
      </DialogContent>
      <DialogActions className="mb-[20px]">
        <button
          className="jess-button mr-[20px] "
          onClick={() => handleCloseWithConfirm()}
        >
          OK
        </button>
      </DialogActions>
    </Dialog>
  );
}

export default AcknowledgementDialogue;
