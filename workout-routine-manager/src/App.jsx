import AuthProvider from "./context/AuthContext"
import SignUp from "./SignUp"
import SignIn from "./SignIn"
import Home from "./Home"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";


function App() {

  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route path="/signUp" element={<SignUp />} />
          <Route path="/signIn" element={<SignIn />} />
          <Route path="/" element={<Home />} />

        </Routes>

      </AuthProvider>
    </Router>
  )
}

export default App
