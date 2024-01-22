import Icon from "../../images/Jess.png";
import LeftIcon from "../../images/Left-side-logo.png";
// import Background from "../images/Rectangle.png";
//
function LoginPageLeftSide(props) {
  return (
    <div className="centered w-full h-full bg-[#050038] md:h-screen p-10 md:p-56 sm:p-5 md:text-left items-center mt-0 ">
      <div className="jess_icon left-[35px] md:left-[35px] sm:left-[30px]">
        <img src={Icon} alt="" />
      </div>

      <div className="main-content-div w-[500px] sm:w-[360px] md:w-[520px] text-center">
        <div className="flex justify-center">
          <img src={LeftIcon} alt="" />
        </div>
        <div className="jess-heading mt-[24px]">
          <p>Hello, I'm Jess</p>
        </div>
        <div className="jess-sub-heading mt-[34px]">
          <p>
            Jess is a FREE web and app-based virtual teacher that leverages
            cognitive psychology, subject expertise & some humour to ensure deep
            and lasting learning!
          </p>
        </div>
        <div className="mt-[24px] ">
          <button className="learn-more-button"> Learn more</button>
        </div>
        {/* <div className="teepee-disclaimer" style={{ fontSize: "14px" }}>
          <p>
            ⚠️ Please note: Teepee.ai is in early Beta. We're refining our AI's
            quiz generation and marking, and occasional inaccuracies may occur.
          </p>
        </div> */}
      </div>
    </div>
  );
}

export default LoginPageLeftSide;
