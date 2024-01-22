import axios from "axios";
import React, { useContext, useState } from "react";
import appContext from "../../../context/appContext";
import { useNavigate } from "react-router-dom";
import Person from "../../../images/person.png";

function HomeClassroomCard(props) {
  const [selectedFolder, setSelectedFolder] = useState(null);
  var classroomData = props.classroomData;
  console.log("classrooms: ", classroomData);
  const state = useContext(appContext);
  const navigate = useNavigate();

  const handleViewClass = (classroom) => {
    // localStorage.setItem("teacher_table_state", 1);
    // navigate("/teacher-classroom-home?id=" + classroom.classroom_id);
  };
  const handleClick = () => {
    // navigate("/create-classroom", {
    //   state: {
    //     folder_id: selectedFolder !== null ? selectedFolder.folder_id : null,
    //   },
    // });
  };
  return (
    <div>
      {classroomData?.length === 0 ||
        (typeof classroomData === "string" && (
          <div>
            <div className="no-quiz-label ">
              You haven't joined any classrooms yet.
            </div>
          </div>
        ))}
      <div className="flex flex-col items-center">
        <div className="grid xlg:grid-cols-3 lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-2 mt-0  w-full">
          {classroomData?.length > 0 && typeof classroomData !== "string" && (
            <>
              {classroomData?.map((item) => (
                <div className="quiz-div  " style={{ height: "auto" }}>
                  <div
                    className="inner-my-quizzes"
                    style={{ backgroundColor: "#E1DAE3" }}
                  >
                    <div
                      className="dashboard-my-quizzes-name text-with-dots text-[#403151]"
                      style={{ color: "#403151" }}
                    >
                      {item.classroom_name}
                    </div>
                    <div
                      className="dashboard-my-quizzes-date"
                      style={{ color: "#403151" }}
                    >
                      {item.creation_date}
                    </div>
                  </div>
                  <div className="dashboard-my-quizzes-info ">
                    <div
                      className="dashboard-my-quizzes-subject text-with-dots pt-[10px]"
                      style={{ color: "#403151" }}
                    >
                      {item.subject_name}
                    </div>
                    <div
                      className="dashboard-my-quizzes-topic text-with-dots mb-[40px]"
                      style={{ color: "#635766" }}
                    >
                      <div className="width-full">
                        Class Code: {item.class_code}
                        {/* {item.quiz_type === 2 ? "Mini-mock exam" : item.topic_name} */}
                      </div>
                      {/* <Checkbox onChange={(e)=>{onQuizSelected(e, item)}} className=" float-right" /> */}
                    </div>
                  </div>
                  <div className="my-quizzes-card_button pt-0  pl-[25px !important]">
                    <button
                      id="button"
                      onClick={() => handleViewClass(item)}
                      className="my-quizzes-card-buttons my-quizzes-card-view-result-button "
                      style={{ backgroundColor: "#7E418B" }}
                    >
                      Start Learning
                    </button>
                  </div>
                </div>
              ))}
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default HomeClassroomCard;
