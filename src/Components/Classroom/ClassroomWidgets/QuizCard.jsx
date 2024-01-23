import React from "react";
import Info from "../../../images/info.png";
import Close from "../../../images/close.png";
import Tick from "../../../images/check.png";

import { Progress } from "rsuite";
import "rsuite/dist/rsuite.min.css";

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
}) {
  console.log("IS SUBMITTED IN QUIZ CARD: ", isSubmitted);
  const handleSubmit = () => {
    handleSubmittedStatus(true);
  };

  const style = {
    width: 250,
    display: "inline-block",
    marginRight: 20,
    marginLeft: 20,
    position: "relative",
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
            <div className="flex">
              <button
                style={{
                  padding: "10px",
                  border:
                    quizData[selectedQuizQuestionIterationIndex].answers[
                      selectedAnswerIndex
                    ].quiz_options_score === 0
                      ? "1.5px solid #EB6262"
                      : "1.5px solid #74DA7F",
                }}
                className="option-buttons flex"
              >
                <img
                  src={
                    quizData[selectedQuizQuestionIterationIndex].answers[
                      selectedAnswerIndex
                    ].quiz_options_score === 0
                      ? Close
                      : Tick
                  }
                  alt=""
                />
                <div className="mt-[8px]">
                  {quizData[selectedQuizQuestionIterationIndex].answers[
                    selectedAnswerIndex
                  ].quiz_options_score === 0
                    ? quizData[selectedQuizQuestionIterationIndex]
                        .quiz_incorrect_feedback
                    : quizData[selectedQuizQuestionIterationIndex]
                        .quiz_correct_feedback}
                </div>
              </button>
            </div>
          )}
        </div>
      ) : (
        quizCompleted && (
          <div className="text-center">
            <div style={style}>
              <Progress.Circle
                classPrefix="progress"
                gapDegree={60}
                strokeLinecap="butt"
                percent={(quizScore / quizTotalMarks) * 100}
                trailColor="#E1DAE3A8"
                trailWidth={5}
                strokeWidth={5}
                gapPosition="bottom"
                strokeColor="#F6CA30"
                showInfo={false}
              />
              <div className="rs-progress-circle-info" style={{ top: "45px" }}>
                <div className="score-text">{`${quizScore}/${quizTotalMarks}`}</div>
                <div className="score-sub-text mt-[8%]">Score</div>
              </div>
            </div>
            <div>
              <div className="quiz-completed-text text-center mt-[2%]">
                Quiz Completed!
              </div>
              <div className="quiz-completed-sub-text mt-[3%]">
                Every quiz takes you closer to mystery.keep going!
              </div>
              <button className="enabled-submit-button mt-[3%]">
                Continue
              </button>
            </div>
          </div>
        )
      )}
    </div>
  );
}

export default QuizCard;
