import { UseUser } from "../hooks/useUser";
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../components/ui/dropdown-menu";

const Header = () => {
  const { user, logout } = UseUser();
  const localUser = user ? JSON.parse(localStorage.getItem("user")) : null;
  const handleLogOut = () => {
    logout();
    location.reload();
  };
  const navigate = useNavigate();

  return (
    <header className="w-full bg-gray-800 text-white p-4 flex justify-between items-center">
      {/* Logo */}
      <div className="logo ">
        <h1
          className="text-xl font-bold cursor-pointer"
          onClick={() => navigate("/")}
        >
          MyApp
        </h1>
      </div>

      {/* Navigation */}
      <nav>
        <ul className="flex space-x-4 items-center">
          <li>
            <Link to="/" className="hover:underline">
              Home
            </Link>
          </li>

          {user ? (
            <>
              {/* User Dropdown */}
              <li>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <div className="flex items-center cursor-pointer">
                      <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center text-lg font-bold mr-2">
                        {localUser.username?.[0]?.toUpperCase()}
                      </div>
                      <div className="flex flex-col">
                        <span className="font-semibold">
                          {localUser.username}
                        </span>
                        <span className="text-xs text-gray-300">
                          {localUser.email}
                        </span>
                      </div>
                    </div>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuLabel>
                      <Link to="/dashboard" className="hover:underline">
                        Dashboard
                      </Link>
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator />

                    <DropdownMenuItem asChild>
                      <li onClick={handleLogOut}>Logout</li>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </li>
            </>
          ) : (
            <>
              <li>
                <Link to="/login" className="hover:underline">
                  Login
                </Link>
              </li>
              <li>
                <Link to="/register" className="hover:underline">
                  Register
                </Link>
              </li>
            </>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default Header;
