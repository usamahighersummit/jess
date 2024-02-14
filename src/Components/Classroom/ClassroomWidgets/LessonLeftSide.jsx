import React from "react";
import PlayButton from "../../../images/play.png";
import Downward from "../../../images/down-arrow.png.png";
import Forward from "../../../images/right-arrow.png";
import Loading from "../../../images/Dot Loader.gif";
import Tick from "../../../images/tick.png";
import PauseButton from "../../../images/pause-button.png";
import ResumeButton from "../../../images/play-button.png";
import HomeButton from "../../../images/home-button.png";
import BouncingDotsLoader from "./BouncingDotsLoader";
import { useNavigate } from "react-router-dom";

function LessonLeftSide({
  lessonResponseData,
  selectedResponseButtons,
  selectedAnswerIndex,
  handleSelectedAnswerIndex,
  currentIndex,
  previousObject,
  nextObject,
  speaking,
  speakText,
  isLoading,
  pauseSpeech,
  resumeSpeech,
  isSpinning,
  handleRepeat,
  pauseResumeStatus,
  renderTextWithHighlighting,
  handleNavigateToHome,
}) {
  const navigate = useNavigate();

  return (
    <div className="relative">
      <div className="bg-[#403151] absolute top-[2%] right-[3%]">
        <button onClick={pauseResumeStatus ? pauseSpeech : resumeSpeech}>
          <img src={pauseResumeStatus ? PauseButton : ResumeButton} />
        </button>
      </div>
      <div className="bg-[#403151] absolute top-[2%] left-[3%]">
        <button onClick={handleNavigateToHome}>
          <img src={HomeButton} />
        </button>
      </div>
      <div
        className="flex centered w-full h-full md:h-screen md:p-10 sm:p-8 md:text-left items-center "
        // style={{ backgroundImage: `url(${Background})` }}
        style={{ backgroundColor: "#403151" }}
      >
        <div
          style={{
            width: isLoading && "100%",
            marginTop:
              isLoading &&
              lessonResponseData[currentIndex].image_file_name !== null
                ? "40%"
                : isLoading &&
                  lessonResponseData[currentIndex].image_file_name === null &&
                  "30%",
          }}
          className={`main-content-div w-[80vh] h-[80%] ${
            lessonResponseData[currentIndex].image_file_name === null
              ? "pt-[5%]"
              : "pt-[20%]"
          } pb-[20%] overflow-auto ${
            lessonResponseData[currentIndex].image_file_name === null
              ? "flex justify-center !w-[50%]"
              : ""
          }`}
        >
          <div
            className={`teepee-sub-heading ${
              lessonResponseData &&
              lessonResponseData.length > currentIndex &&
              lessonResponseData[currentIndex] &&
              lessonResponseData[currentIndex].media === "" &&
              "w-[40%]"
            }`}
          >
            <div>
              <button
                style={{ display: isLoading && "none" }}
                onClick={() =>
                  handleRepeat(lessonResponseData[currentIndex].page_question)
                }
              >
                <img
                  style={{
                    background: "",
                    borderRadius: "10px",
                    animation: isSpinning ? "spin 2s linear" : "none",
                  }}
                  src={PlayButton}
                  alt=""
                />
              </button>
              {isLoading ? (
                <center>
                  <BouncingDotsLoader />
                </center>
              ) : (
                // <img
                //   style={{ marginLeft: "auto", marginRight: "auto" }}
                //   src={Loading}
                // /> // Loading indicator
                <div>
                  <p
                    // dangerouslySetInnerHTML={{
                    //   __html: lessonResponseData[currentIndex].text,
                    // }}
                    className="animation "
                    style={{
                      color: "rgba(255, 255, 255, 0.84)",
                      fontFamily: "Roboto",
                      fontSize: "22px",
                      fontStyle: "normal",
                      fontWeight: 400,
                      lineHeight: "28px" /* 127.273% */,
                      letterSpacing: "0.022px",
                    }}
                  >
                    {renderTextWithHighlighting()}
                  </p>
                </div>
              )}
              {/* <h2>{lessonData[currentIndex].title}</h2> */}
              {/* <p style={{ fontSize: "17px", fontFamily: "roboto" }}>
              {lessonData[currentIndex].text}
            </p> */}
              {/* Buttons to navigate */}
              {/* <button
              onClick={previousObject}
              disabled={currentIndex === 0}
              style={{ marginRight: "10px", display: speaking && "none" }}
            >
              <img style={{background:"yellow"}} src={Forward} />
            </button> */}
              {lessonResponseData[currentIndex].has_button && !isLoading ? (
                <>
                  <div className="flex">
                    <div
                      style={{
                        visibility: speaking ? "hidden" : "visible",
                        marginTop: "5%",
                        display: "flex",
                        width: "100%",
                      }}
                    >
                      <div>
                        {selectedResponseButtons.map((button, index) => (
                          <div>
                            <button
                              className="flex lesson-buttons mb-[5%] mt-[2%] rounded"
                              onClick={() => handleSelectedAnswerIndex(index)}
                              style={{
                                background:
                                  selectedAnswerIndex !== -1 &&
                                  selectedAnswerIndex === index &&
                                  "#7E418B",
                              }}
                            >
                              {button.option_content}
                              {selectedAnswerIndex === index && (
                                <div className="ml-[8px]">
                                  <img src={Tick} />
                                </div>
                              )}
                            </button>
                          </div>
                        ))}
                      </div>

                      <div className="ml-[auto]">
                        {
                          <button
                            onClick={nextObject}
                            style={{
                              visibility:
                                selectedAnswerIndex !== -1
                                  ? "visible"
                                  : "hidden",
                              float: "right",
                              marginTop: "10%",
                            }}
                          >
                            <img
                              style={{
                                borderRadius: "5px",
                              }}
                              src={Forward}
                            />
                          </button>
                        }
                      </div>
                    </div>
                  </div>
                </>
              ) : (
                <button
                  onClick={nextObject}
                  disabled={currentIndex === lessonResponseData.length - 1}
                  style={{
                    //Have to uncheck this
                    visibility:
                      speaking ||
                      isLoading ||
                      (!lessonResponseData[currentIndex].has_button &&
                        !lessonResponseData[currentIndex].has_next_page)
                        ? "hidden"
                        : "visible",
                    float: "right",
                    marginTop: "5%",
                  }}
                >
                  <img
                    style={{
                      borderRadius: "5px",
                    }}
                    src={Downward}
                  />
                </button>
              )}

              {/* <button className="absolute top-0" onClick={pauseSpeech}>
              Pause Speech
            </button> */}
              {/* <button
              className="absolute top-0 left-[250px]"
              onClick={resumeSpeech}
            >
              Resume Speech
            </button> */}
              {/* Indicate if speaking */}
              {/* {speaking && <p>Speaking...</p>} */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LessonLeftSide;
