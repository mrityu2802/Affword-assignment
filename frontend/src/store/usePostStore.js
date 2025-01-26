import toast from "react-hot-toast";
import { create } from "zustand";
import { axiosInstance } from "../lib/axios";

export const usePostStore = create((set) => ({
  isPosting: false,
  postList: [],
  isFetchingPost: false,

  uploadPost: async (data) => {
    try {
      set({ isPosting: true });
      const access_token = localStorage.getItem("authToken");
      const res = await axiosInstance.post("/post", data, {
        headers: {
          access_token,
        },
      });
      //   set({ postList: res.data.post });
      toast.success(res.data.message);
    } catch (error) {
      console.error("Error while posting:", error.message);
      toast.error("Failed to create post.");
    } finally {
      set({ isPosting: false });
    }
  },
  getPost: async () => {
    try {
      set({ isFetchingPost: true });

      const access_token = localStorage.getItem("authToken");
      const res = await axiosInstance.get("/post", {
        headers: {
          access_token,
        },
      });
      set({ postList: res.data.posts });
      toast.success(res.data.message);
    } catch (error) {
      console.error("Error fetching posts:", error.message);
      toast.error("Failed to fetch posts.");
    } finally {
      set({ isFetchingPost: false });
    }
  },
}));
