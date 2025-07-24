import AuthProvider from "./context/AuthContext"
import SignUp from "./SignUp"


function App() {

  return (
    <AuthProvider>
    <SignUp/>
    </AuthProvider>
  )
}

export default App
