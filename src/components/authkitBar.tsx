type AppBarProps = {
  isLoggedIn: boolean;
  onLogin: () => void;
  onLogout: () => void;
};

export const AuthkitBar = ({ isLoggedIn, onLogin, onLogout }: AppBarProps) => {
  return (
    <div className="navbar flex justify-between mt-1 py-4 px-8">
      <h1 className="text-xl dark:text-slate-100">Logo</h1>
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
