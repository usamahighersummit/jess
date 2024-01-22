import axios from "axios";
import React, { useRef, useState } from "react";
import AcknowledgementDialogue from "../../Popups/AcknowledgementDialogue";
import { useNavigate } from "react-router-dom";

function JoinClassroom() {
  const [code, setCode] = useState(["", "", "", "", "", "", "", ""]);
  const inputRefs = [];
  let classCode = useRef();
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = (index, event) => {
    const input = event.target.value;
    if (input.length <= 1) {
      const newCode = [...code];
      newCode[index] = input;
      setCode(newCode);
      if (index < inputRefs.length - 1 && input.length === 1) {
        inputRefs[index + 1].focus();
      }
    }
  };

  const handleKeyDown = (index, event) => {
    if (event.key === "Backspace" && code[index] === "" && index > 0) {
      const newCode = [...code];
      newCode[index - 1] = "";
      setCode(newCode);
      inputRefs[index - 1].focus();
    }
  };
  const handlePaste = (index, event) => {
    event.preventDefault();
    const pastedText = event.clipboardData.getData("text").trim();

    if (pastedText.length <= 8 - index) {
      const newCode = [...code];
      for (let i = 0; i < pastedText.length; i++) {
        newCode[index + i] = pastedText[i];
      }
      setCode(newCode);

      // Move focus to the next empty input field
      for (let i = index + pastedText.length; i < inputRefs.length; i++) {
        if (newCode[i] === "") {
          inputRefs[i].focus();
          break;
        }
      }
    }
  };

  classCode.current = code.join("");

  const handleClickContinue = () => {
    if (classCode.current.length <= 0) {
      alert("Enter the class code");
      return;
    }
    var token = "Bearer " + localStorage.getItem("access_token");
    axios.defaults.baseURL = process.env.REACT_APP_REST_API_BASE_URL;
    axios.defaults.headers.post["Content-Type"] =
      "application/json;charset=utf-8";
    axios.defaults.headers.post["authorization"] = token;
    axios.defaults.headers.post["Access-Control-Allow-Origin"] = "*";
    axios
      .post(process.env.REACT_APP_REST_API_BASE_URL + "/join_class", {
        method: "POST",
        class_code: classCode.current,
      })
      .then((res) => {
        console.log("classroom : ", res.data);
        if (res.data.class_id !== 0) {
          navigate("/home-screen");
        } else {
          setOpen(true);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <div>
      <AcknowledgementDialogue
        title="Incorrect code"
        text="Please enter the correct class code"
        handleCloseWithConfirm={handleClose}
        open={open}
      />
      <div className="enter_classcode">Enter your class code</div>
      <div>
        {" "}
        <div className=" mt-[24px]">
          <center>
            <div className="code_div pt-[10px] pl-[2px] w-[66%]">
              {code.map((digit, index) => (
                <input
                  key={index}
                  ref={(ref) => (inputRefs[index] = ref)}
                  type="text"
                  maxLength="1"
                  value={digit}
                  onChange={(event) => handleChange(index, event)}
                  onKeyDown={(event) => handleKeyDown(index, event)}
                  onPaste={(event) => handlePaste(index, event)}
                  style={{
                    outline: "none",
                    width: "10%",
                    marginRight: "5px",
                    textAlign: "center",
                    borderBottom: "1px solid black",
                  }}
                />
              ))}
            </div>
          </center>
        </div>
        <div>
          <div className="flex justify-center mt-[24px]">
            <button
              className="jess-button float-none w-[66%] h-[20%]"
              onClick={handleClickContinue}
            >
              Continue
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default JoinClassroom;
