import React, { useState } from "react";
import QuizIcon from "../../../../images/quiz.png";
import LessonIcon from "../../../../images/lesson-icon.png";
import CheckCircle from "../../../../images/check_circle.png";

function QuizOrLessonCard({
  data,
  type,
  itemIndex,
  handleClick,
  onMouseEnter,
  onMouseLeave,
  handleSelectedIndex,
  selectedIndex,
  hoverIndex,
}) {
  const handleHover = () => {
    if (
      (type === 1 && data.lesson_state !== 1) ||
      (type === 2 && data.quiz_state !== 1)
    ) {
      return onMouseEnter(type === 1 ? data.lesson_key : data.student_quiz_id);
    }
  };

  const handleClickButton = () => {
    if (
      (type === 1 && data.lesson_state !== 1) ||
      (type === 2 && data.quiz_state !== 1)
    ) {
      handleSelectedIndex(
        type === 1 ? data.lesson_key : data.student_quiz_id,
        data,
        type
      );
    }
  };
  return (
    <>
      <div
        onClick={() => handleClickButton()}
        onMouseEnter={() => handleHover()}
        onMouseLeave={() => onMouseLeave()}
        className="flex mt-[1%]"
        style={{
          backgroundColor:
            selectedIndex !==
              (type === 1 ? data.lesson_key : data.student_quiz_id) &&
            hoverIndex === (type === 1 ? data.lesson_key : data.student_quiz_id)
              ? "#4F355F"
              : selectedIndex ===
                  (type === 1 ? data.lesson_key : data.student_quiz_id) &&
                "#6A3C78",
        }}
      >
        <div
          className="bg-[white] w-[1%]"
          style={{
            display:
              selectedIndex ===
              (type === 1 ? data.lesson_key : data.student_quiz_id)
                ? "block"
                : "none",
          }}
        ></div>
        <button
          disabled={
            (type === 1 && data.lesson_state === 1) ||
            (type === 2 && data.quiz_state === 1)
          }
          className="flex w-[100%] pb-[8px] pt-[8px] ml-[5%]"
        >
          <div>
            <img
              src={
                type === 1 && data.lesson_state === 0
                  ? QuizIcon
                  : type === 1 && data.lesson_state === 1
                  ? CheckCircle
                  : type === 2 && data.quiz_state === 1
                  ? CheckCircle
                  : LessonIcon
              }
            />
          </div>
          <div className="ml-[4%]">
            <div className="lesson-or-quiz-text text-start">
              {type === 1 ? data.lesson_name : data.student_quiz_title}
            </div>
            <div className="lesson-or-quiz-sub-text text-start">
              {type === 1 ? "Lesson" : "Quiz"}
            </div>
          </div>
        </button>
      </div>
    </>
  );
}

export default QuizOrLessonCard;
