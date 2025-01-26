const Post = ({ authUser, caption, imageUrl }) => {
  return (
    <div className="min-w-[30rem] ring-1 w-1/3 p-4 rounded-lg flex flex-col gap-2 bg-gray-200">
      <div className="avatar flex gap-2 items-center">
        <div tabIndex={0} className="size-8 rounded-full">
          <img
            src={
              authUser?.profilePic || import.meta.env.VITE_FALLBACK_IMAGE_URL
            }
            alt="profile Picture"
          />
        </div>
        <span className="truncate">{authUser.name}</span>
      </div>
      <span className="pl-2">{caption}</span>
      <img
        className="ring-2 ring-slate-400 rounded-lg"
        src={imageUrl}
        alt={caption}
      />
    </div>
  );
};

export default Post;
