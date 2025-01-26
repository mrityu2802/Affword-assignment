import { Camera } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useAuthStore } from "../store/useAuthStore";
import { Link } from "react-router-dom";
import Modal from "../components/Modal";
import { usePostStore } from "../store/usePostStore";
import Post from "../components/Post";
const HomePage = () => {
  const { authUser } = useAuthStore();
  const { uploadPost, isPosting, postList, getPost } = usePostStore();
  const [formData, setFormData] = useState({ caption: "", picture: "" });
  const modalRef = useRef(null);

  console.log(postList);

  useEffect(() => {
    getPost();
  }, []);

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      const base64Image = reader.result;
      setFormData({ ...formData, picture: base64Image });
    };
  };

  const handleModalClose = () => {
    setFormData({ caption: "", picture: "" });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.caption) {
      alert("Please enter a caption before posting.");
      return;
    }
    console.log("Posting:", formData);
    // Submit post logic here
    await uploadPost(formData);
    setFormData({ caption: "", picture: "" });
    modalRef.current?.close();
  };

  return (
    <main className="mt-14 mx-auto p-4 h-screen overflow-auto no-scroll">
      <div className="py-1 flex items-center justify-center">
        <div className="w-[30rem] sm:w-[35rem] rounded-lg p-2 bg-slate-300 flex items-center gap-4">
          <Link to={"/profile"}>
            <div className="avatar">
              <div tabIndex={0} className="size-8 rounded-full">
                <img
                  src={
                    authUser?.profilePic ||
                    import.meta.env.VITE_FALLBACK_IMAGE_URL
                  }
                  alt="profile Picture"
                />
              </div>
            </div>
          </Link>
          <button
            className="btn rounded-full btn-wide sm:w-[30rem]"
            onClick={() => {
              modalRef.current?.showModal();
            }}
          >
            What's on your mind?
          </button>
        </div>
        <Modal
          modalRef={modalRef}
          title={"Create post"}
          onModalclose={handleModalClose}
        >
          <form
            className="py-2 gap-2 flex flex-col items-center justify-center"
            onSubmit={handleSubmit}
          >
            <div className="form-control">
              <textarea
                className="textarea textarea-bordered min-w-[28rem] pl-2"
                placeholder={`What's on your mind, ${
                  authUser?.name.split(" ")[0]
                }?`}
                value={formData.caption}
                onChange={(e) =>
                  setFormData({ ...formData, caption: e.target.value })
                }
              />
            </div>
            {!formData.picture && (
              <div className="flex p-2 gap-2 items-center w-full">
                <span>Add photo to your post</span>
                <label
                  htmlFor="avatar-upload"
                  className="w-min form-control bg-transparent hover:scale-105 rounded-full cursor-pointer transition-all duration-200 flex items-center justify-center"
                >
                  <Camera className="w-5 h-5 text-gray-600" />
                  <input
                    type="file"
                    id="avatar-upload"
                    className="hidden"
                    accept="image/*"
                    onChange={handleImageUpload}
                  />
                </label>
              </div>
            )}
            {formData.picture && (
              <div className="relative w-full max-w-md">
                <button
                  className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
                  aria-label="Remove image"
                  onClick={(e) => {
                    e.preventDefault();
                    setFormData({ ...formData, picture: "" });
                  }}
                >
                  ✕
                </button>
                <img
                  src={formData.picture}
                  alt="Post Preview"
                  className="w-full rounded-sm object-cover border-2"
                />
              </div>
            )}
            <button
              type="submit"
              className="btn btn-primary w-full"
              disabled={isPosting || !formData.caption}
            >
              {isPosting ? "Posting..." : "Post"}
            </button>
          </form>
        </Modal>
      </div>
      <div className="py-1 flex flex-col gap-8 w-full items-center mt-4">
        {postList.map((post) => (
          <Post
            key={post._id}
            authUser={authUser}
            caption={post.caption}
            imageUrl={post.pictureUrl}
          />
        ))}
      </div>
    </main>
  );
};

export default HomePage;
