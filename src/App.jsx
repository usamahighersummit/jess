import "./App.css";
import HomeScreen from "./Components/Classroom/HomeScreen";
import Login from "./Components/Login/Login";
import { Route, Routes } from "react-router-dom";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/join-class" element={<Login />} />
      <Route path="/home-screen" element={<HomeScreen />} />
    </Routes>
  );
}

export default App;
