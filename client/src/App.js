import Main from "./Student/index";
import { Routes, Route } from "react-router-dom";
import Peer from "./Student/components/Peer";
import Self from "./Student/components/Self";
import Calender from "./Student/components/Calender";
import TeacherMain from "./Teacher/teacherMain";
import TeacherQuizes from "./Teacher/components/TeacherQuizes";
import Classwork from "./Student/components/Classwork";
import Quizzes from "./Student/components/Quizzes";
import Login from "./components/auth/login";
import Logout from "./components/auth/logout";
import StudentRecord from "./Teacher/components/StudentRecord";
import TeacherQuiz from "./Teacher/components/TeacherQuiz";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/Student" element={<Main />} />
        <Route path="/classwork" element={<Classwork />} />
        <Route path="/calender" element={<Calender />} />
        <Route path="/teacher" element={<TeacherMain />} />
        <Route path="/quizzes" element={<TeacherQuizes />} />
        <Route path="/studentrecord" element={<StudentRecord />} />
        <Route path="/teacherquiz" element={<TeacherQuiz />} />
        <Route path="/quiz" element={<Quizzes />} />
        <Route path="/self" element={<Self />} />
        <Route path="/peer" element={<Peer />} />
        <Route path="/login" element={<Login />} />
        <Route path="/logout" element={<Logout />} />
      </Routes>
    </div>
  );
}

export default App;
