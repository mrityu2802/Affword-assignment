import toast from "react-hot-toast";
import { create } from "zustand";
import { axiosInstance } from "../lib/axios.js";
import { getAuth, signInWithCustomToken } from "firebase/auth";
import { firebaseApp } from "../utils/firebaseConfig.js";

export const useAuthStore = create((set) => ({
  authUser: null,
  isLoading: false,

  checkAuth: async () => {
    set({ isLoading: true });
    try {
      const auth = getAuth();
      const authToken = localStorage.getItem("authToken");
      if (!authToken) {
        set({ isLoading: false });
        set({ authUser: null });
        return;
      }
      const userCredential = await signInWithCustomToken(auth, authToken);
      const idToken = await userCredential.user.getIdToken();
      console.log(idToken);

      const res = await axiosInstance.get("/auth/check-auth", {
        headers: { access_token: idToken },
      });
      console.log(res.data);
      set({ authUser: res.data.user });
    } catch (error) {
      console.log("Error in checkAuth", error);
      set({ authUser: null });
    } finally {
      set({ isLoading: false });
    }
  },

  login: async (data) => {
    set({ isLoading: true });
    try {
      const res = await axiosInstance.post("/auth/login", data);
      set({ authUser: res.data.user });
      localStorage.setItem("authToken", res.data.access_token);
      toast.success("Logged in successfully");
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      set({ isLoading: false });
    }
  },
  logOut: async () => {
    set({ isLoading: true });
    try {
      localStorage.removeItem("authToken");
      set({ authUser: null });
      toast.success("Logged out successfully");
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      set({ isLoading: false });
    }
  },
}));
