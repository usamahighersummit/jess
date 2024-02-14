import React, { useEffect, useRef, useState } from "react";
import Question1 from "../../../images/1.gif";
import Question2 from "../../../images/2.jpg";
import Question3 from "../../../images/3.gif";
import Question4 from "../../../images/4.gif";
import parse, { domToReact } from "html-react-parser";
import LessonLeftSide from "./LessonLeftSide";
import LessonRightSide from "./LessonRightSide";
import moment from "moment";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function LessonCard({
  lessonResponseData,
  selectedResponseButtons,
  setSelectedResponseButtons,
  classId,
  lessondata,
  getSidebarData,
}) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [speaking, setSpeaking] = useState(false);
  const isFirstRender = useRef(true);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedAnswerIndex, setSelectedAnswerIndex] = useState(-1);
  const [isSpinning, setIsSpinning] = useState(false);
  const [pauseResumeStatus, setPauseResumeStatus] = useState(true);
  const [currentWordIndex, setCurrentWordIndex] = useState(-7.5);
  const [currentChunkIndex, setCurrentChunkIndex] = useState(0);
  const [chunkSize, setChunkSize] = useState(7.5);
  //This is the part which is working fine with highlighter but
  const speechUtteranceRef = useRef(null);
  const navigate = useNavigate();

  const getTextChunks = (text, chunkSize = 3) => {
    const words = text.replace(/(<([^>]+)>)/gi, "").split(/\s+/);
    const chunks = [];

    for (let i = 0; i < words.length; i += chunkSize) {
      chunks.push(words.slice(i, i + chunkSize).join(" "));
    }

    return chunks;
  };

  const handleRepeat = (text) => {
    window.speechSynthesis.cancel();
    setPauseResumeStatus(true);
    setIsSpinning(true);
    speakText(text); // Your existing function call
    setTimeout(() => {
      setIsSpinning(false);
    }, 2000);
  };
  const stripHtmlTags = (text) => {
    return text.replace(
      /(<([^>]+)>)|([\u{1F600}-\u{1F64F}\u{1F300}-\u{1F5FF}\u{1F680}-\u{1F6FF}\u{1F700}-\u{1F77F}\u{1F780}-\u{1F7FF}\u{1F800}-\u{1F8FF}\u{1F900}-\u{1F9FF}\u{1FA00}-\u{1FA6F}\u{1FA70}-\u{1FAFF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}\u{1F1E0}-\u{1F1FF}\.])/gu,
      ""
    );
  };
  const speakText = (htmlText) => {
    const plainText = stripHtmlTags(htmlText);
    // Clean the text
    if ("speechSynthesis" in window) {
      const utterance = new SpeechSynthesisUtterance(plainText);
      // Configure the utterance (onstart, onboundary, onend, etc.)

      const voices = window.speechSynthesis.getVoices();
      const selectedVoice = voices.find(
        (voice) => voice.name === "Microsoft George - English (United Kingdom)"
      );
      console.log("VOICES ARE: ", voices);
      console.log("SELECTED VOICE: ", selectedVoice);
      utterance.voice = selectedVoice;
      window.speechSynthesis.speak(utterance);
      utterance.onstart = () => {
        setSpeaking(true); // Indicate that speech synthesis has started
        setCurrentWordIndex(0); // Start highlighting from the first word
      };
      utterance.onend = () => {
        setSpeaking(false); // Indicate that speech synthesis has ended
        setCurrentWordIndex(null); // Set to null or another value that indicates no highlighting
        scrollToBottom();
      };
      utterance.onboundary = (event) => {
        const textUpToBoundary = stripHtmlTags(
          lessonResponseData[currentIndex].page_question
        )
          .slice(0, event.charIndex)
          .trim();
        const wordCountUpToBoundary = textUpToBoundary.split(" ").length;
        setCurrentWordIndex(wordCountUpToBoundary - 1);
      };
    }
  };

  function scrollToBottom() {
    var contentDiv = document.querySelector(".main-content-div"); // Adjust the selector as needed
    contentDiv.scrollTop = contentDiv.scrollHeight;
  }

  const renderTextWithHighlighting = () => {
    // Ensure that the current lesson response data is defined
    if (lessonResponseData === undefined) {
      // Return null, an empty string, or some placeholder content when data is not ready
      return "null"; // or "<p>Loading...</p>" or similar
    }

    let wordCount = 0; // Counter for words to identify the current reading position

    const options = {
      replace: ({ type, data }) => {
        if (type === "text") {
          const words = data.split(" ").map((word, index) => {
            const isFirstWord = index === 0;
            const isHighlighted =
              currentWordIndex !== null &&
              wordCount >= currentWordIndex &&
              wordCount < currentWordIndex + chunkSize;
            wordCount++; // Increment wordCount for each word

            return (
              <span
                key={index}
                style={{
                  backgroundColor: isHighlighted ? "#7E418B" : "transparent",
                }}
              >
                {isFirstWord ? "" : " "}
                {word}
              </span>
            );
          });

          return <>{words}</>;
        }
      },
    };

    // Now safe to access .text property as we've ensured lessonResponseData[currentIndex] is defined
    return parse(
      String(lessonResponseData[currentIndex].page_question),
      options
    );
  };

  const pauseSpeech = () => {
    if (window.speechSynthesis.speaking) {
      setPauseResumeStatus(false);
      window.speechSynthesis.pause();
    }
  };

  const resumeSpeech = () => {
    if (window.speechSynthesis.paused) {
      setPauseResumeStatus(true);
      window.speechSynthesis.resume();
    }
  };

  // Effect for initial speech synthesis
  useEffect(() => {
    window.speechSynthesis.cancel();
    const timer = setTimeout(() => {
      speakText(lessonResponseData[currentIndex].page_question);
      isFirstRender.current = false;
    }, 500); // Delay of 500ms

    return () => clearTimeout(timer);
  }, [lessonResponseData]);

  const updateLessonStatus = () => {
    console.log("LESSON IN THE UPDATE: ", lessondata[0].lesson_id);
    var token = "Bearer " + localStorage.getItem("access_token");
    axios.defaults.baseURL = process.env.REACT_APP_REST_API_BASE_URL;
    axios.defaults.headers.post["Content-Type"] =
      "application/json;charset=utf-8";
    axios.defaults.headers.post["Access-Control-Allow-Origin"] = "*";
    axios.defaults.headers.post["authorization"] = token;
    axios
      .post(
        process.env.REACT_APP_REST_API_BASE_URL + "/create_lesson_progress",
        {
          method: "POST",
          lesson_id: lessondata[0].lesson_id,
          class_id: classId,
          area_id: lessondata[0].area_id,
          today_date: moment().format("YYYY-MM-DD HH:mm:ss.SSS"),
        }
      )
      .then((res) => {
        console.log("Quiz: ", res.data);
        // getSidebarData();
        // setQuizOrLesson(0);
        // handleQuizValue(res.data.quiz_question_list);
        // handleQuizTotalMarks(quiz.quiz_marks);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // Effect for handling changes in currentIndex
  useEffect(() => {
    window.speechSynthesis.cancel();
    if (!isFirstRender.current) {
      speakText(lessonResponseData[currentIndex].page_question);
    }
  }, [currentIndex]);

  const nextObject = () => {
    window.speechSynthesis.cancel();

    // Reset highlighter state
    setCurrentWordIndex(0);
    // Check if we're not at the end of the array
    // Show loading indicator
    setIsLoading(true);

    // Wait for 2 seconds before updating the currentIndex
    setTimeout(() => {
      // Update the currentIndex
      let selectedLesson;
      var index;
      if (
        !lessonResponseData[currentIndex].has_next_page &&
        lessonResponseData[currentIndex].has_button
      ) {
        let selectedoption = selectedResponseButtons[selectedAnswerIndex];
        if (selectedoption.target_page_id === null) {
          setIsLoading(false);
          setCurrentWordIndex(-5);
          updateLessonStatus();
          return;
        }
      }
      if (
        lessonResponseData[currentIndex].has_next_page &&
        !lessonResponseData[currentIndex].has_button
      ) {
        index = lessonResponseData.findIndex(
          (lesson) =>
            lesson.page_id === lessonResponseData[currentIndex].next_page_id
        );
      } else {
        let selectedoption = selectedResponseButtons[selectedAnswerIndex];
        if (selectedoption.target_page_id !== null) {
          index = lessonResponseData.findIndex(
            (lesson) => selectedoption.target_page_id === lesson.page_id
          );
        }
      }
      if (index !== undefined) {
        selectedLesson = lessonResponseData[index];
        setSelectedAnswerIndex(-1);
        if (selectedLesson.next_page_id === null) {
          updateLessonStatus();
        }
      }
      if (selectedLesson.has_button) {
        setSelectedResponseButtons(selectedLesson.options_list);
      } else {
        setSelectedResponseButtons([]);
      }
      setCurrentIndex(index);
      // Hide loading indicator
      setIsLoading(false);
    }, 2000); // 2000 milliseconds = 2 seconds
  };

  const previousObject = () => {
    // Check if we're not at the start of the array
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const handleSelectedAnswerIndex = (index) => {
    setSelectedAnswerIndex(index);
  };

  const handleNavigateToHome = () => {
    window.speechSynthesis.cancel();
    navigate("/home");
  };
  return (
    <React.Fragment>
      <section>
        {lessonResponseData !== undefined && (
          <div
            className={`w-auto h-auto grid text-white text-4xl ${
              lessonResponseData[currentIndex].image_file_name === null
                ? "md:grid-cols-1"
                : "grid-cols-2"
            } overflow-hidden`}
          >
            <LessonLeftSide
              lessonResponseData={lessonResponseData}
              selectedResponseButtons={selectedResponseButtons}
              currentIndex={currentIndex}
              previousObject={previousObject}
              nextObject={nextObject}
              speaking={speaking}
              speakText={speakText}
              isLoading={isLoading}
              pauseSpeech={pauseSpeech}
              resumeSpeech={resumeSpeech}
              selectedAnswerIndex={selectedAnswerIndex}
              handleSelectedAnswerIndex={handleSelectedAnswerIndex}
              isSpinning={isSpinning}
              handleRepeat={handleRepeat}
              pauseResumeStatus={pauseResumeStatus}
              renderTextWithHighlighting={renderTextWithHighlighting}
              handleNavigateToHome={handleNavigateToHome}
            />
            <LessonRightSide
              lessonResponseData={lessonResponseData}
              currentIndex={currentIndex}
            />
          </div>
        )}
      </section>
    </React.Fragment>
    // <div className="app-container">

    //   {/* <QuestionDisplay question={question.text} onSpeak={speakQuestion} />
    //   <MediaDisplay media={question.media} type={question.mediaType} /> */}
    // </div>
  );
}

export default LessonCard;
