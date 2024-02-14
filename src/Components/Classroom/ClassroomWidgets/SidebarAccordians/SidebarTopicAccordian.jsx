import React, { useState } from "react";
import {
  Accordion,
  AccordionHeader,
  AccordionBody,
} from "@material-tailwind/react";
import { SidebarSubtopicAccordian } from "./SidebarSubtopicAccordian";
import TopicIcon from "../../../../images/topic.png";
import TopicIconWhite from "../../../../images/topic-white.png";

function Icon({ id, open }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={2}
      stroke="currentColor"
      className={`${
        id === open ? "rotate-180" : ""
      } h-5 w-5 transition-transform`}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M19.5 8.25l-7.5 7.5-7.5-7.5"
      />
    </svg>
  );
}

export function SidebarTopicAccordian({
  topic,
  topicIndex,
  handleLessonClick,
  handleQuizClick,
  selectedIndexQuizOrLesson,
  hoverIndexQuizOrLesson,
  onMouseEnter,
  onMouseLeave,
  handleSelectedIndex,
  open,
  setOpen,
  openSubtopicAccordian,
  setOpenSubtopicAccordian,
}) {
  const [hoverIndex, setHoverIndex] = useState(-1);

  const handleOpen = (value) => {
    if (open === value) {
      setOpen(null);
    } else {
      setOpen(value);
    }
  };

  const handleMouseEnter = (index) => {
    setHoverIndex(index);
  };

  const handleMouseLeave = () => {
    setHoverIndex(-1);
  };

  return (
    <>
      <Accordion open={open === topicIndex}>
        <div className="mr-[3px] ml-[3px] ">
          <AccordionHeader
            key={topicIndex}
            onMouseEnter={() => handleMouseEnter(topicIndex)}
            onMouseLeave={() => handleMouseLeave()}
            onClick={() => handleOpen(topicIndex)}
            className="p-[10px] justify-between accordian-header-text border-b-0 rounded mt-[5px] mb-[5px]"
            style={{
              color: "white",
              backgroundColor:
                open !== topicIndex && hoverIndex === topicIndex
                  ? "#4F355F"
                  : open === topicIndex && "#7E418B",
            }}
          >
            <div className="flex">
              <div className="ml-[10px]  text-start">
                {topicIndex + 1 + ". " + topic.topic_name}
              </div>
            </div>
          </AccordionHeader>
        </div>

        <AccordionBody
          className="p-0 justify-between"
          style={{
            color: "white",
          }}
        >
          {topic.sub_topic_list.map((subtopic, index) => (
            <>
              <div>
                <SidebarSubtopicAccordian
                  subtopic={subtopic}
                  subtopicIndex={index}
                  handleLessonClick={handleLessonClick}
                  handleQuizClick={handleQuizClick}
                  selectedIndexQuizOrLesson={selectedIndexQuizOrLesson}
                  hoverIndexQuizOrLesson={hoverIndexQuizOrLesson}
                  onMouseEnter={onMouseEnter}
                  onMouseLeave={onMouseLeave}
                  handleSelectedIndex={handleSelectedIndex}
                  openSubtopicAccordian={openSubtopicAccordian}
                  setOpenSubtopicAccordian={setOpenSubtopicAccordian}
                />
              </div>
            </>
          ))}
        </AccordionBody>
      </Accordion>
    </>
  );
}
