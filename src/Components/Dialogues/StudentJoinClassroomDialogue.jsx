import React, { useContext } from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Cross from "../../images/cross.png";
import appContext from "../../context/appContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function StudentJoinClassroomDialogue(props) {
  const state = useContext(appContext);

  const handleClickBack = () => {
    props.handleClickCloseJoinClassroomDialogue();
  };

  const handleViewClass = (class_id) => {
    state.handleClickOpenShareClassCodeDialogue();
  };

  const handleClickContinue = () => {
    var classCodeInput = document.getElementById("class_code");
    if (classCodeInput.value.length <= 0) {
      alert("Please enter class code");
      return;
    }
    var token = "Bearer " + localStorage.getItem("access_token");
    axios.defaults.baseURL = process.env.REACT_APP_REST_API_BASE_URL;
    axios.defaults.headers.post["Content-Type"] =
      "application/json;charset=utf-8";
    axios.defaults.headers.post["authorization"] = token;
    axios.defaults.headers.post["Access-Control-Allow-Origin"] = "*";
    axios
      .post(process.env.REACT_APP_REST_API_BASE_URL + "/join_class", {
        method: "POST",
        class_code: classCodeInput.value,
      })
      .then((response) => {
        console.log("Required RESPONSE IS: ", response.data.data);
        state.setOpenAcknowledgement(true);
        if (response.data.data === "INCORRECT CLASS CODE") {
          state.setClassCodeAcknowledgementState(1);
        } else if (response.data.data === "Classroom Already joined") {
          state.setClassCodeAcknowledgementState(2);
        } else if (
          response.data.data === "You have been enrolled into the class"
        ) {
          state.setClassCodeAcknowledgementState(3);
        }
        if (typeof response.data.data === "string") {
          props.handleClickCloseJoinClassroomDialogue();
          return;
        }
        props.handleClickCloseJoinClassroomDialogue();
        window.location.reload();
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <div>
      <Dialog
        PaperProps={{
          sx: {
            // maxHeight: "562px", // Set height to "auto" for responsiveness
            width: "768px", // Use maxWidth "full" to fill parent container
            height: "60vh", // Use maxHeight "full" to fill parent container
          },
        }}
        open={props.openJoinClassroomDialogue}
        onClose={props.handleClickCloseJoinClassroomDialogue}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle className="flex">
          <button onClick={() => props.handleClickCloseJoinClassroomDialogue()}>
            <img src={Cross}></img>
          </button>
          <div className="text-center w-[100%] create_new_classroom_dialogue_title">
            Join Class
          </div>
        </DialogTitle>
        <hr className="mt-0 "></hr>

        <div>
          <DialogContent style={{ marginLeft: "30px", marginRight: "50px" }}>
            <DialogContentText id="new-classroom-dialog-description">
              <div>
                <label className="create_your_class_label">
                  Enter your class code
                </label>
              </div>

              <div>
                <label className="class_name_hint_label">
                  Please enter the code provided by the teacher
                </label>
              </div>
            </DialogContentText>
            <div className="flex">
              <input
                style={{ marginRight: "20px" }}
                type="text"
                name="class_code"
                id="class_code"
                className="class_name_input pl-[23px]  sm:!w-[100%] xs:!w-[100%]"
                required
              />
            </div>
          </DialogContent>
        </div>
        <hr
          style={{ marginTop: "auto", width: "100%", marginBottom: "0px" }}
        ></hr>

        <DialogActions
          style={{
            marginRight: "15px",
            justifyContent: "space-between",
          }}
        >
          <button
            style={{ width: "60px" }}
            className=" sm:w-[44%] md:w-[46%]"
            onClick={() => handleClickBack()}
          >
            <div style={{ display: "flex", justifyContent: "center" }}>
              <div className="text-[#6750A4]">Back</div>
            </div>
          </button>
          <button
            style={{ width: "110px", background: "#7E418B" }}
            id="button"
            onClick={handleClickContinue}
            className="jess-button md:ml-12 hover:bg-black sm:w-[50%] md:w-[46%]"
          >
            Continue
          </button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default StudentJoinClassroomDialogue;
