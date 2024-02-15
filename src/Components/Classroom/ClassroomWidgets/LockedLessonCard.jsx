import React from "react";
import Lock from "../../../images/lock-lesson.png";

function LockedLessonCard({ lockedLessonData }) {
  console.log("LOCKED LESSON DATA: ", lockedLessonData);
  return (
    <div className="text-center">
      <div className="coming-soon-text">Coming Soon</div>
      <div className="flex justify-center">
        <img src={Lock} />
      </div>
      <div className="unlock-lesson-text">
        🔓 Unlocks on {lockedLessonData.learn_date}
      </div>
      <div className="lock-lesson-instruction-text">
        This lesson will be available soon. We're excited for you to dive in!
      </div>
    </div>
  );
}

export default LockedLessonCard;
