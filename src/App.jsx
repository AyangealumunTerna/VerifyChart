import { BrowserRouter, Routes, Route } from "react-router-dom";
import Signup from "./components/SignupForm.jsx";
import Home from "./pages/Home";
import "./components/styles/breakpoints.css";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </BrowserRouter>
  );
}
