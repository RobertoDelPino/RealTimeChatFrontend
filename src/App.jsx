import { BrowserRouter, Routes, Route } from "react-router-dom"
import AuthLayout from "@layouts/AuthLayout"
import Login from "@pages/Users/Login/Login"
import Register from "@pages/Users/Register/Register"
import ForgotPassword from "@pages/Users/ForgotPassword/ForgotPassword"
import NewPassword from "@pages/Users/NewPassword/NewPassword"
import ConfirmAccount from "@pages/Users/ConfirmAccount/ConfirmAccount"
import { AuthProvider } from "@context/AuthProvider"
import ProtectedRoute from "@layouts/ProtectedRoute"
import ChatPage from "@pages/Chat/ChatPage"
import { ChatProvider } from "@context/ChatProvider"
import { Toaster } from "react-hot-toast"



function App() {

  return (
    <>
      <BrowserRouter>
        <AuthProvider>
          <ChatProvider>
            <Routes>
              <Route path="/" element={<AuthLayout/>}>
                <Route index element={<Login/>}/>
                <Route path="register" element={<Register/>}/>
                <Route path="forgot-password" element={<ForgotPassword/>}/>
                <Route path="forgot-password/:token" element={<NewPassword/>}/>
                <Route path="confirm/:id" element={<ConfirmAccount/>}/>
              </Route>
            
              <Route path="/chat" element={<ProtectedRoute />}>
                <Route index element={<ChatPage />}/>
              </Route>
            </Routes>
            <Toaster />
          </ChatProvider>
        </AuthProvider>
      </BrowserRouter>
    </>
  )
}

export default App
