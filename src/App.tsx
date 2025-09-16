import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AuthCheckPage from "./pages/AuthCheckPage";
import LoginPage from "./pages/LoginPage";
import StudentsPage from "./pages/StudentsPage";
import StudentDetailPage from "./pages/StudentDetailPage";
import StudentAddPage from "./pages/StudentAddPage";
import ParentAddPage from "./pages/ParentAddPage";
import MainLayout from "./pages/MainLayout";
import ProtectedRoute from "./components/ProtectedRoute";
import ParentsPage from "./pages/ParentsPage";
import ParentDetailPage from "./pages/ParentDetailPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<AuthCheckPage />} />
        <Route path="/login" element={<LoginPage />} />

        <Route element={<ProtectedRoute />}>
          <Route element={<MainLayout />}>
            <Route path="/students" element={<StudentsPage />} />
            <Route path="/students/:id" element={<StudentDetailPage />} />
            <Route path="/parents" element={<ParentsPage />} />
            <Route path="/parents/:id" element={<ParentDetailPage />} />

            <Route element={<ProtectedRoute requiredRole="ADMIN" />}>
              <Route path="/students/add" element={<StudentAddPage />} />
              <Route path="/parents/add" element={<ParentAddPage />} />
            </Route>
          </Route>
        </Route>
      </Routes>
    </Router>
  );
}

export default App;