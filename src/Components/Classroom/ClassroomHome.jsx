import React, { useEffect, useState } from "react";
import ClassroomHomeDrawer from "./ClassroomWidgets/ClassroomHomeDrawer";
import axios from "axios";
import { useLocation } from "react-router-dom";
import moment from "moment";

function ClassroomHome() {
  const [quizzesData, setQuizzesData] = useState([]);
  const location = useLocation();
  let { class_id } = location.state !== null ? location.state : "";

  useEffect(() => {
    getClasroomQuizzes();
  }, []);

  const getClasroomQuizzes = () => {
    var token = "Bearer " + localStorage.getItem("access_token");
    axios.defaults.baseURL = process.env.REACT_APP_REST_API_BASE_URL;
    axios.defaults.headers.post["Content-Type"] =
      "application/json;charset=utf-8";
    axios.defaults.headers.post["Access-Control-Allow-Origin"] = "*";
    axios.defaults.headers.post["authorization"] = token;
    axios
      .post(process.env.REACT_APP_REST_API_BASE_URL + "/student_view_class", {
        method: "POST",
        class_id: class_id,
        today_date: moment().format("YYYY-MM-DD HH:mm:ss.SSS"),
      })
      .then((res) => {
        console.log("classroom list: ", res.data);
        setQuizzesData(res.data.complete_quizzes_list);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <div>
      <ClassroomHomeDrawer quizzesData={quizzesData} />
    </div>
  );
}

export default ClassroomHome;
