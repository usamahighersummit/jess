import React from "react";
import Info from "../../../images/info.png";
import Close from "../../../images/close.png";
import Tick from "../../../images/check.png";

import QuizResult from "./QuizResult";

function QuizCard({
  quizData,
  selectedQuizQuestionIterationIndex,
  handleIterationIndex,
  selectedAnswerIndex,
  handleSelectedAnswer,
  isSubmitted,
  handleSubmittedStatus,
  quizCompleted,
  quizScore,
  quizTotalMarks,
  submitQuiz,
}) {
  const handleSubmit = () => {
    handleSubmittedStatus(true);
  };

  return (
    <div className="w-[45%]">
      {quizData !== undefined && !quizCompleted ? (
        <div>
          <div id="questionIteration" className="question-iteration">
            {`Question ${selectedQuizQuestionIterationIndex + 1} of ${
              quizData.length
            }`}
          </div>
          <div
            id="questionText"
            className="question-text"
            dangerouslySetInnerHTML={{
              __html:
                quizData[selectedQuizQuestionIterationIndex].quiz_question,
            }}
          ></div>
          <div id="optionButtons" className="mt-[1%]">
            {quizData[selectedQuizQuestionIterationIndex].answers.map(
              (answer, index) => (
                <button
                  disabled={isSubmitted}
                  style={{
                    border:
                      selectedAnswerIndex !== -1 &&
                      index === selectedAnswerIndex &&
                      "1.5px solid #7E418B",
                  }}
                  className="option-buttons"
                  onClick={() => handleSelectedAnswer(index)}
                >
                  {answer.quiz_option_text}
                </button>
              )
            )}
          </div>
          <div id="submit" className="mt-[6%]">
            <button
              onClick={() =>
                isSubmitted ? handleIterationIndex() : handleSubmit()
              }
              className={
                selectedAnswerIndex === -1
                  ? "disabled-submit-button"
                  : "enabled-submit-button"
              }
            >
              {isSubmitted ? "Continue" : "Submit"}
            </button>
          </div>
          <div id="instructions" className="flex mt-[3%]">
            <img src={Info} alt="" />
            <div className="ml-[1%] instruction-text">
              Tap the correct answer
            </div>
          </div>

          {isSubmitted && (
            <div className="flex ">
              <div
                style={{
                  padding: "10px",
                  border:
                    quizData[selectedQuizQuestionIterationIndex].answers[
                      selectedAnswerIndex
                    ].quiz_options_score === 0
                      ? "1.5px solid #EB6262"
                      : "1.5px solid #74DA7F",
                }}
                className="option-buttons flex space-x-2"
              >
                <img
                  style={{ objectFit: "contain" }}
                  src={
                    quizData[selectedQuizQuestionIterationIndex].answers[
                      selectedAnswerIndex
                    ].quiz_options_score === 0
                      ? Close
                      : Tick
                  }
                  alt=""
                />
                <div className="feedback-text" style={{ lineHeight: "20px" }}>
                  {quizData[selectedQuizQuestionIterationIndex].answers[
                    selectedAnswerIndex
                  ].quiz_options_score === 0
                    ? quizData[selectedQuizQuestionIterationIndex]
                        .quiz_incorrect_feedback
                    : quizData[selectedQuizQuestionIterationIndex]
                        .quiz_correct_feedback}
                </div>
              </div>
            </div>
          )}
        </div>
      ) : (
        quizCompleted && (
          <QuizResult
            quizScore={quizScore}
            quizTotalMarks={quizTotalMarks}
            submitQuiz={submitQuiz}
          />
        )
      )}
    </div>
  );
}

export default QuizCard;
