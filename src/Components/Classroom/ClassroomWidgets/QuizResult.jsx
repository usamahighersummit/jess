import React from "react";
import { Progress } from "rsuite";
import "rsuite/dist/rsuite.min.css";
function QuizResult({ quizScore, quizTotalMarks }) {
  const handleStrokeColor = () => {
    let percentage = (quizScore / quizTotalMarks) * 100;
    if (percentage < 50) {
      return "red";
    } else if (percentage >= 50 && percentage <= 70) {
      return "#F6CA30";
    } else if (percentage > 70) {
      return "green";
    }
  };
  const style = {
    width: 250,
    display: "inline-block",
    marginRight: 20,
    marginLeft: 20,
    position: "relative",
  };
  return (
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
          strokeColor={handleStrokeColor()}
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
        <button className="enabled-submit-button mt-[3%]">Continue</button>
      </div>
    </div>
  );
}

export default QuizResult;
