import { Link } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore";
import { ListTodo, LogOut, MessageSquare, User } from "lucide-react";
import ThemeSelecter from "./ThemeSelecter";

const Navbar = () => {
  const { logOut, authUser } = useAuthStore();

  return (
    <header className="bg-base-100 border-b border-base-300 fixed w-full top-0 z-40 backdrop-blur-lg bg-base-100/80">
      <div className="container mx-auto px-4 h-16">
        <div className="flex items-center justify-between h-full">
          <div className="flex items-center gap-8">
            <Link
              to={"/"}
              className="flex items-center gap-2.5 hover:opacity-80 transition-all"
            >
              <div className="size-9 rounded-lg bg-primary/10 flex items-center justify-center">
                <MessageSquare className="size-5 text-primary" />
              </div>
              <h1 className="text-lg font-bold">AFFWORLD</h1>
            </Link>
          </div>
          <div className="flex items-center gap-2">
            <ThemeSelecter />
            {authUser && (
              <>
                <Link to={"/tasks"} className={`btn btn-sm gap-2`}>
                  <ListTodo className="size-5" />
                  <span className="hidden sm:inline">Tasks</span>
                </Link>

                <div className="avatar dropdown dropdown-end">
                  <div
                    tabIndex={0}
                    role="button"
                    className="size-8 rounded-full"
                  >
                    <img
                      src={
                        authUser?.profilePic ||
                        import.meta.env.VITE_FALLBACK_IMAGE_URL
                      }
                      alt="profile Picture"
                    />
                  </div>
                  <ul
                    tabIndex={0}
                    className="dropdown-content menu bg-base-100 rounded-box z-[1] min-w-fit m-1 p-2 shadow"
                  >
                    <li>
                      <Link to={"/profile"}>
                        <User className="size-5" />
                        <span className="inline">Profile</span>
                      </Link>
                    </li>
                    <li>
                      <button
                        className="flex gap-2 items-center"
                        onClick={logOut}
                      >
                        <LogOut className="size-5" />
                        <span className="inline">Logout</span>
                      </button>
                    </li>
                  </ul>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;

