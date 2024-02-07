import { useEffect } from "react";
import "./App.css";
import ClassroomHome from "./Components/Classroom/ClassroomHome";
import HomeScreen from "./Components/Classroom/HomeScreen";
import Login from "./Components/Login/Login";
import { Route, Routes } from "react-router-dom";
import axios from "axios";

function App() {
  var token = localStorage.getItem("access_token");

  useEffect(() => {
    if (token === null) {
      if (window.location.pathname !== "/") window.location.replace("/login");
    } else {
      getUserJwtSession();
    }
  }, []);

  const getUserJwtSession = () => {
    token = "Bearer " + localStorage.getItem("access_token");
    axios
      .request({
        method: "GET",
        url:
          process.env.REACT_APP_REST_API_BASE_URL + "/check_user_jwt_session",

        headers: {
          "Content-Type": "application/json; charset=utf-8",
          authorization: token,
        },
      })
      .then((res) => {
        console.log(res.data);
        console.log(window.location.pathname);
        if (window.location.pathname === "/") {
          window.location.replace("/home");
        }
      })
      .catch((error) => {
        console.log(error);
        localStorage.removeItem("access_token");
        localStorage.removeItem("email_address");
      });
  };

  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/join-class" element={<Login />} />
      <Route path="/home" element={<HomeScreen />} />
      <Route path="/classroom-home" element={<ClassroomHome />} />
    </Routes>
  );
}

export default App;
