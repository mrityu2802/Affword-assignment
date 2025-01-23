import { Navigate, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage.jsx";
import SignUp from "./pages/SignUp.jsx";
import LoginPage from "./pages/Login.jsx";
import Navbar from "./components/Navbar.jsx";
import { Toaster } from "react-hot-toast";
import { firebaseApp } from "./utils/firebaseConfig";
import { useAuthStore } from "./store/useAuthStore.js";
import { useThemeStore } from "./store/useThemeStore.js";
import { useEffect } from "react";
import { Loader } from "lucide-react";
import TaskPage from "./pages/TaskPage.jsx";

const App = () => {
  const { authUser, checkAuth, isLoading } = useAuthStore();
  const { theme } = useThemeStore();

  useEffect(() => {
    checkAuth();
    // console.log(authUser);
  }, [checkAuth]);

  if (isLoading && !authUser) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader className="size-10 animate-spin" />
      </div>
    );
  }

  return (
    <div data-theme={theme}>
      <Toaster />
      <Navbar />
      <Routes>
        <Route
          path="/"
          element={authUser ? <HomePage /> : <Navigate to={"/login"} />}
        />
        <Route
          path="/signup"
          element={!authUser ? <SignUp /> : <Navigate to={"/"} />}
        />
        <Route
          path="/login"
          element={!authUser ? <LoginPage /> : <Navigate to={"/"} />}
        />
        <Route
          path="/tasks"
          element={authUser ? <TaskPage /> : <Navigate to={"/login"} />}
        />
      </Routes>
    </div>
  );
};

export default App;
