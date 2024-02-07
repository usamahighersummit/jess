import React, { useState } from "react";
import QuizIcon from "../../../../images/quiz.png";
import LessonIcon from "../../../../images/lesson-icon.png";

function QuizOrLessonCard({ data, type, itemIndex, handleClick }) {
  const handleOnClick = (data) => {
    handleClick(data);
  };
  return (
    <button
      className="flex ml-[5%] mt-[1%] w-[100%]"
      onClick={() => handleOnClick(data)}
    >
      <div>
        <img src={type === 1 ? QuizIcon : LessonIcon} />
      </div>
      <div className="ml-[4%]">
        <div className="lesson-or-quiz-text">{data.lesson_name}</div>
        <div className="lesson-or-quiz-sub-text text-start">
          {type === 1 ? "Lesson" : "Quiz"}
        </div>
      </div>
    </button>
  );
}

export default QuizOrLessonCard;
