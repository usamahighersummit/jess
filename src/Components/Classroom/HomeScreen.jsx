import React, { useContext, useEffect, useState } from "react";
import Sidebar from "../Sidebar/Sidebar";
import axios from "axios";
import HomeClassroomCard from "./ClassroomWidgets/HomeClassroomCard";
import AcknowledgementDialogue from "../Popups/AcknowledgementDialogue";
import appContext from "../../context/appContext";

function HomeScreen() {
  const [classroomList, setClassroomList] = useState({});
  const state = useContext(appContext);

  useEffect(() => {
    getClassroomList();
  }, []);

  const getClassroomList = () => {
    var token = "Bearer " + localStorage.getItem("access_token");
    axios.defaults.baseURL = process.env.REACT_APP_REST_API_BASE_URL;
    axios.defaults.headers.post["Content-Type"] =
      "application/json;charset=utf-8";
    axios.defaults.headers.post["Access-Control-Allow-Origin"] = "*";
    axios.defaults.headers.post["authorization"] = token;
    axios
      .post(process.env.REACT_APP_REST_API_BASE_URL + "/student_dashboard", {
        method: "POST",
      })
      .then((res) => {
        console.log("classroom list: ", res.data.classes_data);
        setClassroomList(res.data.classes_data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleClose = () => {
    state.setOpenAcknowledgement(false);
    window.location.reload();
  };

  return (
    <div>
      <AcknowledgementDialogue
        title={
          state.classCodeAcknowledgementState === 1
            ? "Incorrect Class Code"
            : state.classCodeAcknowledgementState === 2
            ? "Oops! Already in Class"
            : "Enrollment Successful"
        }
        text={
          state.classCodeAcknowledgementState === 1
            ? "Provided Class Code is Incorrect."
            : state.classCodeAcknowledgementState === 2
            ? "You are already enrolled in this class."
            : "You've Successfully Joined the Class"
        }
        handleCloseWithConfirm={handleClose}
        open={state.openAcknowledgement}
      />
      <Sidebar item_id="home" />
      <div className=" sm:ml-0 md:ml-[315px] mb-[40px] ">
        <div className="home sm:ml[25px] md:ml-[60px] ml-[25px]">
          <div className="mt-[3%]">
            <div className="flex">
              <label
                className={"dashboard-label cursor-pointer"}
                style={{
                  color: "#403151",
                  textAlign: "center",
                  fontFamily: "Roboto",
                  fontSize: "14px",
                  fontStyle: "normal",
                  fontWeight: "500",
                  lineHeight: "20px",
                  letterSpacing: "0.1px",
                }}
              >
                My Classrooms
              </label>
            </div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="100"
              height="14"
              viewBox="0 0 100 14"
              fill="none"
              style={{ paddingLeft: "1px", paddingRight: "10px" }}
            >
              <path
                d="M2.5 14C2.5 12.3431 3.84315 11 5.5 11H94.5C96.1569 11 97.5 12.3431 97.5 14V14H2.5V14Z"
                fill="#403151"
              />
            </svg>
          </div>
          <div className="my-quiz-div mt-[2%] w-[95%]">
            <HomeClassroomCard classroomData={classroomList} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomeScreen;
