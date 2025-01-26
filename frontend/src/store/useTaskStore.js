import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";

export const useTaskstore = create((set) => ({
  taskList: [],
  isFetchingTask: false,
  isCreatingTask: false,

  getTask: async () => {
    try {
      set({ isFetchingTask: true });

      const access_token = localStorage.getItem("authToken");
      const res = await axiosInstance.get("/task", {
        headers: {
          access_token,
        },
      });
      set({ taskList: res.data.tasks });
      toast.success(res.data.message);
    } catch (error) {
      console.error("Error fetching tasks:", error.message);
      toast.error("Failed to fetch tasks.");
    } finally {
      set({ isFetchingTask: false });
    }
  },
  createTask: async (data) => {
    try {
      set({ isCreatingTask: true });
      const access_token = localStorage.getItem("authToken");
      const res = await axiosInstance.post("/task/create", data, {
        headers: {
          access_token,
        },
      });
      set({ taskList: res.data.tasks });
      toast.success(res.data.message);
    } catch (error) {
      console.error("Error creating tasks:", error.message);
      toast.error("Failed to create tasks.");
    } finally {
      set({ isCreatingTask: false });
    }
  },
  deleteTask: async (id) => {
    try {
      set({ isCreatingTask: true });
      const access_token = localStorage.getItem("authToken");
      const res = await axiosInstance.delete(`/task/${id}`, {
        headers: {
          access_token,
        },
      });
      set({ taskList: res.data.tasks });
      toast.success(res.data.message);
    } catch (error) {
      console.error("Error deleting tasks:", error.message);
      toast.error("Failed to delete tasks.");
    } finally {
      set({ isCreatingTask: false });
    }
  },
  updateTask: async (id, data) => {
    try {
      set({ isCreatingTask: true });
      const access_token = localStorage.getItem("authToken");
      const res = await axiosInstance.put(`/task/update/${id}`, data, {
        headers: {
          access_token,
        },
      });
      set({ taskList: res.data.tasks });
      toast.success(res.data.message);
    } catch (error) {
      console.error("Error creating tasks:", error.message);
      toast.error("Failed to create tasks.");
    } finally {
      set({ isCreatingTask: false });
    }
  },
}));
