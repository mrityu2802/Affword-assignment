import toast from "react-hot-toast";
import { create } from "zustand";
import { axiosInstance } from "../lib/axios.js";
import { firebaseApp } from "../utils/firebaseConfig.js";
import { generateAuthToken } from "../lib/generateToken.js";

export const useAuthStore = create((set, get) => ({
  authUser: null,
  isLoading: false,
  isUpdatingProfile: false,

  toggleLoading: (value) => {
    const { isLoading } = get();
    set({ isLoading: value !== undefined ? value : !isLoading });
  },

  checkAuth: async () => {
    set({ isLoading: true });
    try {
      const access_token = localStorage.getItem("authToken");
      if (!access_token) {
        set({ authUser: null, isLoading: false });
        return;
      }

      const res = await axiosInstance.get("/auth/check-auth", {
        headers: { access_token },
      });

      set({ authUser: res.data.user });
      toast.success("Authentication verified");
    } catch (error) {
      console.error("Error in checkAuth:", error.message);
      set({ authUser: null });
      toast.error("Failed to verify authentication");
    } finally {
      set({ isLoading: false });
    }
  },

  signUp: async (data) => {
    set({ isLoading: true });
    try {
      const res = await axiosInstance.post("/auth/signup", data);
      const access_token = await generateAuthToken(res.data.access_token);
      localStorage.setItem("authToken", access_token);

      set({ authUser: res.data.user });
      toast.success("Logged in successfully");
    } catch (error) {
      console.error("Error during login:", error.message);
      toast.error(error.response?.data?.message || "Login failed");
    } finally {
      set({ isLoading: false });
    }
  },

  login: async (data) => {
    set({ isLoading: true });
    try {
      const res = await axiosInstance.post("/auth/login", data);
      const access_token = await generateAuthToken(res.data.access_token);
      localStorage.setItem("authToken", access_token);

      set({ authUser: res.data.user });
      toast.success("Logged in successfully");
    } catch (error) {
      console.error("Error during login:", error.message);
      toast.error(error.response?.data?.message || "Login failed");
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
      console.error("Error during logout:", error.message);
      toast.error("Logout failed");
    } finally {
      set({ isLoading: false });
    }
  },

  updateProfile: async (data) => {
    set({ isUpdatingProfile: true });
    try {
      const access_token = localStorage.getItem("authToken");
      const res = await axiosInstance.put("/auth/update-profile", data, {
        headers: { access_token },
      });

      set((state) => ({ authUser: { ...state.authUser, ...res.data.user } }));
      toast.success("Profile updated successfully");
    } catch (error) {
      console.error("Error updating profile:", error.message);
      toast.error(error.response?.data?.message || "Failed to update profile");
    } finally {
      set({ isUpdatingProfile: false });
    }
  },
}));
