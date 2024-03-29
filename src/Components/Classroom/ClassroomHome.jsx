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
  const [sidebarData, setSidebarData] = useState();
  const [attemptedQuiz, setAttemptedQuiz] = useState([]);
  const [selectedQuiz, setSelectedQuiz] = useState({});

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
    console.log("DATA IS: ", quizData[selectedQuizQuestionIterationIndex]);
    var obj = {
      student_has_question_id:
        quizData[selectedQuizQuestionIterationIndex].student_has_question_id,
      student_selected_option:
        quizData[selectedQuizQuestionIterationIndex].answers[
          selectedAnswerIndex
        ].quiz_options_id,
      score:
        quizData[selectedQuizQuestionIterationIndex].answers[
          selectedAnswerIndex
        ].quiz_options_score,
      feedback:
        quizData[selectedQuizQuestionIterationIndex].answers[
          selectedAnswerIndex
        ].quiz_options_score === 0
          ? quizData[selectedQuizQuestionIterationIndex].quiz_incorrect_feedback
          : quizData[selectedQuizQuestionIterationIndex].quiz_correct_feedback,

      recall_status: quizData[selectedQuizQuestionIterationIndex].recall_status,
    };

    let attemptedQuizLocal = attemptedQuiz;

    attemptedQuizLocal = attemptedQuizLocal.concat(obj);

    setAttemptedQuiz(attemptedQuizLocal);

    if (selectedQuizQuestionIterationIndex <= quizData.length - 1) {
      handleQuizMarks(
        quizData[selectedQuizQuestionIterationIndex].answers[
          selectedAnswerIndex
        ].quiz_options_score
      );
    }
    if (selectedQuizQuestionIterationIndex < quizData.length - 1) {
      let index = selectedQuizQuestionIterationIndex;
      setSelectedQuizQuestionIterationIndex(++index);
      setSelectedAnswerIndex(-1);
      setIsSubmitted(false);
    } else {
      setQuizCompleted(true);
      submitQuiz();
    }
  };

  const handleNewQuizState = () => {
    setSelectedQuizQuestionIterationIndex(0);
    setSelectedAnswerIndex(-1);
    setIsSubmitted(false);
    setIsSubmitted(false);
    setQuizCompleted(false);
  };

  const submitQuiz = () => {
    console.log("QUIZ DATA IS: ", selectedQuiz);
    var token = "Bearer " + localStorage.getItem("access_token");
    axios.defaults.baseURL = process.env.REACT_APP_REST_API_BASE_URL;
    axios.defaults.headers.post["Content-Type"] =
      "application/json;charset=utf-8";
    axios.defaults.headers.post["Access-Control-Allow-Origin"] = "*";
    axios.defaults.headers.post["authorization"] = token;
    axios
      .post(process.env.REACT_APP_REST_API_BASE_URL + "/submit_quiz", {
        method: "POST",
        classroom_id: class_id,
        student_quiz_id: selectedQuiz.student_quiz_id,
        total_score: selectedQuiz.quiz_marks,
        obtained_score: quizScore,
        question_response: attemptedQuiz,

        // lesson_key: lesson.lesson_key,
      })
      .then((res) => {
        console.log("reponse: ", res.data);
        getSidebarData();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    // getClasroomQuizzes();
    getSidebarData();
  }, []);

  // const getClasroomQuizzes = () => {
  //   var token = "Bearer " + localStorage.getItem("access_token");
  //   axios.defaults.baseURL = process.env.REACT_APP_REST_API_BASE_URL;
  //   axios.defaults.headers.post["Content-Type"] =
  //     "application/json;charset=utf-8";
  //   axios.defaults.headers.post["Access-Control-Allow-Origin"] = "*";
  //   axios.defaults.headers.post["authorization"] = token;
  //   axios
  //     .post(process.env.REACT_APP_REST_API_BASE_URL + "/student_view_class", {
  //       method: "POST",
  //       class_id: class_id,
  //       today_date: moment().format("YYYY-MM-DD HH:mm:ss.SSS"),
  //     })
  //     .then((res) => {
  //       console.log("classroom list: ", res.data);
  //       setQuizzesData(res.data.complete_quizzes_list);
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //     });
  // };

  const getCurrentDate = () => {
    const date = new Date();
    const todayDate =
      date.getFullYear() +
      "-" +
      (1 + parseInt(date.getMonth())) +
      "-" +
      date.getDate() +
      " " +
      date.getHours() +
      ":" +
      date.getMinutes() +
      ":" +
      date.getSeconds() +
      "." +
      date.getMilliseconds();
    console.log("object");

    return todayDate;
  };
  const getSidebarData = () => {
    var token = "Bearer " + localStorage.getItem("access_token");
    axios.defaults.baseURL = process.env.REACT_APP_REST_API_BASE_URL;
    axios.defaults.headers.post["Content-Type"] =
      "application/json;charset=utf-8";
    axios.defaults.headers.post["Access-Control-Allow-Origin"] = "*";
    axios.defaults.headers.post["authorization"] = token;
    axios
      .post(process.env.REACT_APP_REST_API_BASE_URL + "/view_class_jess", {
        method: "POST",
        class_id: class_id,
        today_date: getCurrentDate(),
      })
      .then((res) => {
        console.log("Sidebar Data: ", res.data);
        setSidebarData(res.data);
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
        sidebarData={sidebarData}
        classId={class_id}
        attemptedQuiz={attemptedQuiz}
        selectedQuiz={selectedQuiz}
        setSelectedQuiz={setSelectedQuiz}
        submitQuiz={submitQuiz}
        handleNewQuizState={handleNewQuizState}
        getSidebarData={getSidebarData}
      />
    </div>
  );
}

export default ClassroomHome;
