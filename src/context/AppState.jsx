import AppContext from "./appContext";
import React, { useState } from "react";
const AppState = (props) => {
  const [openJoinClassroomDialogue, setOpenJoinClassroomDialogue] =
    useState(false);
  const [openAcknowledgement, setOpenAcknowledgement] = useState(false);
  const [classCodeAcknowledgementState, setClassCodeAcknowledgementState] =
    useState("");

  const handleClickOpenJoinClassroomDialogue = () => {
    setOpenJoinClassroomDialogue(true);
  };
  const handleClickCloseJoinClassroomDialogue = () => {
    setOpenJoinClassroomDialogue(false);
  };
  const handleClickOpenAcknowledgement = () => {
    setOpenAcknowledgement(true);
  };

  const handleClickCloseAcknowledgement = () => {
    setOpenAcknowledgement(false);
  };

  return (
    <AppContext.Provider
      value={{
        openJoinClassroomDialogue,
        setOpenJoinClassroomDialogue,
        handleClickOpenJoinClassroomDialogue,
        handleClickCloseJoinClassroomDialogue,

        openAcknowledgement,
        setOpenAcknowledgement,
        handleClickOpenAcknowledgement,
        handleClickCloseAcknowledgement,

        classCodeAcknowledgementState,
        setClassCodeAcknowledgementState,
      }}
    >
      {props.children}
    </AppContext.Provider>
  );
};

export default AppState;
