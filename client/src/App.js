import { Route, Routes, Navigate } from "react-router-dom"
import Main from "./pages/Main"
import Signup from "./pages/Signup"
import Login from "./pages/Login"
import Options from "./pages/Options"
import { Suspense } from "react"
import { useTranslation } from "react-i18next"

function App() {
  const { t, i18n } = useTranslation;
  const user = localStorage.getItem("token")
  return (
    <Routes>
      {!user && <Route path="/login" element={<Login />} />}
      <Route path="/login" element={<Navigate replace to={user ? "/" : "/login"} />} />
      {user && <Route path="/" element={<Main />} />}
      <Route path="/" element={<Navigate replace to={!user ? "/login" : "/"} />} />
      <Route path="/signup" element={<Signup />} />
      {user && <Route path="/options" element={<Options />} />}
      <Route path="/options" element={<Navigate replace to={user ? "/options" : "/login"} />} />
    </Routes>
  );
}

export default function WrappedApp() {
  return (
    <Suspense fallback="Loading...">
      <App />
    </Suspense>
  )
}