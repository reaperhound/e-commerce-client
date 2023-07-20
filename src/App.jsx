import { useState } from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SignUp from "./pages/Auth/SignUp/SignUp";
import Login from "./pages/Auth/Login/Login";
import Home from "./pages/Home/Home";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} >
          </Route>
          <Route path='auth' element="">
            <Route path={"login"} element={<Login />} />
            <Route path="signup"  element={<SignUp />} />
          </Route>
        </Routes>
      </Router>
      {/* <SignUp />
      <Login /> */}
    </>
  );
}

export default App;
