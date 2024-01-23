import React, { useEffect, useState } from "react";
import ClassroomHomeDrawer from "./ClassroomWidgets/ClassroomHomeDrawer";
import axios from "axios";
import { useLocation } from "react-router-dom";
import moment from "moment";

function ClassroomHome() {
  const [quizzesData, setQuizzesData] = useState([]);
  const [quizData, setQuizData] = useState();
  const [
    selectedQuizQuestionIterationIndex,
    setSelectedQuizQuestionIterationIndex,
  ] = useState(0);
  const [selectedAnswerIndex, setSelectedAnswerIndex] = useState(-1);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [quizScore, setQuizScore] = useState(0);
  const [quizTotalMarks, setQuizTotalMarks] = useState();
  const location = useLocation();
  let { class_id } = location.state !== null ? location.state : "";

  const handleQuizValue = (quiz) => {
    setQuizData(quiz);
  };

  const handleQuizTotalMarks = (quizTotalMarks) => {
    setQuizTotalMarks(quizTotalMarks);
  };

  const handleQuizMarks = (questionMarks) => {
    let score = quizScore;
    setQuizScore(score + questionMarks);
  };

  const handleSubmittedStatus = (submitState) => {
    setIsSubmitted(submitState);
  };

  const handleSelectedAnswer = (index) => {
    setSelectedAnswerIndex(index);
  };

  const handleIterationIndex = () => {
    if (selectedQuizQuestionIterationIndex < quizData.length - 1) {
      handleQuizMarks(
        quizData[selectedQuizQuestionIterationIndex].answers[
          selectedAnswerIndex
        ].quiz_options_score
      );
      let index = selectedQuizQuestionIterationIndex;
      setSelectedQuizQuestionIterationIndex(++index);
      setSelectedAnswerIndex(-1);
      setIsSubmitted(false);
    } else {
      setQuizCompleted(true);
    }
  };

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
      <ClassroomHomeDrawer
        quizzesData={quizzesData}
        handleQuizValue={handleQuizValue}
        quizData={quizData}
        selectedQuizQuestionIterationIndex={selectedQuizQuestionIterationIndex}
        handleIterationIndex={handleIterationIndex}
        selectedAnswerIndex={selectedAnswerIndex}
        handleSelectedAnswer={handleSelectedAnswer}
        isSubmitted={isSubmitted}
        handleSubmittedStatus={handleSubmittedStatus}
        quizCompleted={quizCompleted}
        quizScore={quizScore}
        handleQuizMarks={handleQuizMarks}
        quizTotalMarks={quizTotalMarks}
        handleQuizTotalMarks={handleQuizTotalMarks}
      />
    </div>
  );
}

export default ClassroomHome;
