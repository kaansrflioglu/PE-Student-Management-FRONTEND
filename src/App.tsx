import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import LoginPage from "./pages/LoginPage";
import StudentsPage from "./pages/StudentsPage";

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/students" element={<StudentsPage />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;