import React, { useState } from "react";
import {
  Accordion,
  AccordionHeader,
  AccordionBody,
} from "@material-tailwind/react";
import SubtopicArrowIcon from "../../../../images/arrow_down_subtopic.png";
import SubtopicArrowUpIcon from "../../../../images/arrow_up_subtopic.png";
import QuizOrLessonCard from "./QuizOrLessonCard";

export function SidebarSubtopicAccordian({
  subtopic,
  subtopicIndex,
  handleMouseEnterTopic,
  handleLessonClick,
  handleQuizClick,
  selectedIndexQuizOrLesson,
  hoverIndexQuizOrLesson,
  onMouseEnter,
  onMouseLeave,
  handleSelectedIndex,
  openSubtopicAccordian,
  setOpenSubtopicAccordian,
}) {
  const [hoverIndex, setHoverIndex] = useState(-1);

  const handleMouseEnter = (index) => {
    setHoverIndex(index);
  };

  const handleMouseLeave = () => {
    setHoverIndex(-1);
  };

  const handleOpen = (value) => {
    if (openSubtopicAccordian === value) {
      setOpenSubtopicAccordian(null);
    } else {
      setOpenSubtopicAccordian(value);
    }
  };

  return (
    <>
      <Accordion open={openSubtopicAccordian === subtopicIndex}>
        <div className="mr-[3px] ml-[3px] ">
          <AccordionHeader
            onMouseEnter={() => handleMouseEnter(subtopicIndex)}
            onMouseLeave={() => handleMouseLeave()}
            onClick={() => handleOpen(subtopicIndex)}
            className=" p-[10px] justify-between accordian-header-text border-b-0 rounded mt-[5px] mb-[5px] pl-[20px]"
            style={{
              color: "white",
              backgroundColor:
                openSubtopicAccordian !== subtopicIndex &&
                hoverIndex === subtopicIndex &&
                "#4F355F",
            }}
          >
            <div className="flex">
              <div className="mt-[auto] mb-[auto]">
                <img
                  src={
                    openSubtopicAccordian === subtopicIndex
                      ? SubtopicArrowUpIcon
                      : SubtopicArrowIcon
                  }
                />
              </div>
              <div className="ml-[10px] text-start">
                {subtopic.sub_topic_name}
              </div>
            </div>
          </AccordionHeader>
        </div>

        <hr className="mt-0 mb-0" />
        <AccordionBody
          className="p-0 justify-between "
          style={{
            color: "white",
          }}
        >
          {subtopic.lesson_list.map((lesson, index) => (
            <QuizOrLessonCard
              data={lesson}
              type={1}
              itemIndex={index}
              selectedIndex={selectedIndexQuizOrLesson}
              hoverIndex={hoverIndexQuizOrLesson}
              handleClick={handleLessonClick}
              onMouseEnter={onMouseEnter}
              onMouseLeave={onMouseLeave}
              handleSelectedIndex={handleSelectedIndex}
            />
          ))}
          {subtopic.quizzes_list &&
            subtopic.quizzes_list.map((quiz, index) => (
              <QuizOrLessonCard
                data={quiz}
                type={2}
                itemIndex={index + subtopic.lesson_list.length}
                handleClick={handleQuizClick}
                selectedIndex={selectedIndexQuizOrLesson}
                hoverIndex={hoverIndexQuizOrLesson}
                onMouseEnter={onMouseEnter}
                onMouseLeave={onMouseLeave}
                handleSelectedIndex={handleSelectedIndex}
              />
            ))}
        </AccordionBody>
      </Accordion>
    </>
  );
}
