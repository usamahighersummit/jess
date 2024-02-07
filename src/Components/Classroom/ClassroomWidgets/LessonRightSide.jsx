import React from "react";

function LessonRightSide({ lessonResponseData, currentIndex }) {
  return (
    <div
      style={{
        display:
          lessonResponseData[currentIndex].image_file_name === null && "none",
      }}
    >
      <div className=" w-full h-full bg-black md:h-screen">
        <div>
          <div className=" h-[100vh] flex align-center">
            <img
              style={{
                width: "100%",
                maxWidth: "100%",
              }}
              src={
                process.env.REACT_APP_CDN_URL_FOR_QUESTION_IMAGES +
                lessonResponseData[currentIndex].image_file_name
              }
            />
          </div>
          <div className="w-[100%] flex justify-center"></div>
        </div>
      </div>
    </div>
  );
}

export default LessonRightSide;
