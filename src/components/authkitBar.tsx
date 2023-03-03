import Link from "next/link";

type AppBarProps = {
  isLoggedIn: boolean;
  onLogin: () => void;
  onLogout: () => void;
};

export const AuthkitBar = ({ isLoggedIn, onLogin, onLogout }: AppBarProps) => {
  return (
    <div className="navbar flex justify-between mt-1 py-4 px-8">
      <Link href="/" className="text-xl dark:text-slate-100">
        Logo
      </Link>
      <Link
        href="/createpost"
        className="text-xl font-bold dark:text-slate-100"
      >
        <div className="flex space-x-1 items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 7.5h1.5m-1.5 3h1.5m-7.5 3h7.5m-7.5 3h7.5m3-9h3.375c.621 0 1.125.504 1.125 1.125V18a2.25 2.25 0 01-2.25 2.25M16.5 7.5V18a2.25 2.25 0 002.25 2.25M16.5 7.5V4.875c0-.621-.504-1.125-1.125-1.125H4.125C3.504 3.75 3 4.254 3 4.875V18a2.25 2.25 0 002.25 2.25h13.5M6 7.5h3v3H6v-3z"
            />
          </svg>
          <p>Create an article</p>
        </div>
      </Link>
      <div className="flex items-center gap-4">
        {isLoggedIn ? (
          <button className="btn" onClick={onLogout}>
            Logout
          </button>
        ) : (
          <button className="btn" onClick={onLogin}>
            Login
          </button>
        )}
      </div>
    </div>
  );
};
