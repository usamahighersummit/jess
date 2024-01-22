import "./App.css";
import ClassroomHome from "./Components/Classroom/ClassroomHome";
import HomeScreen from "./Components/Classroom/HomeScreen";
import Login from "./Components/Login/Login";
import { Route, Routes } from "react-router-dom";

function App() {
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
