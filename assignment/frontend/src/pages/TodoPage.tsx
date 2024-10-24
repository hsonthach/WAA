import { MouseEvent, useEffect, useState } from "react";

import axios from "axios";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { logout } from "../state/reducer/authSlice";
import { RootState, useAppDispatch } from "../state/store";
import { useSelector } from "react-redux";

export default function TodoPage() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { email: currentUser } = useSelector((state: RootState) => state.auth);

  const [toogleMenu, setToggleMenu] = useState<boolean>(false);

  const onSignOut = (e: MouseEvent<HTMLButtonElement>) => {
    dispatch(logout());
    // Optionally save to localStorage or sessionStorage for persistence
    localStorage.removeItem("jwtToken");
    localStorage.removeItem("todoAppEmail");

    // Add token to Axios common headers for future requests
    delete axios.defaults.headers.common["Authorization"];

    // Redirect to the main page
    navigate("/");
  };

  return (
    <>
      <div
        className="fixed h-full w-full bg z-0"
        style={{ backgroundImage: 'url("/main-bg.jpeg")' }}
      ></div>
      <nav className="fixed w-screen bg-gray-800">
        <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
          <div className="relative flex h-16 items-center justify-between">
            <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
              <div className="flex flex-shrink-0 items-center">
                <img
                  className="h-8 w-auto"
                  src="/mark.svg"
                  alt="Your Company"
                />
              </div>
              <div className="hidden sm:ml-6 sm:block">
                <div className="flex space-x-4">
                  <NavLink
                    className={({ isActive }) =>
                      `rounded-md px-3 py-2 text-sm font-medium text-white ${
                        isActive && "menu-active"
                      }`
                    }
                    to={"/todos"}
                    end
                  >
                    List
                  </NavLink>
                  <NavLink
                    className={({ isActive }) =>
                      `rounded-md px-3 py-2 text-sm font-medium text-white ${
                        isActive && "menu-active"
                      }`
                    }
                    to={"/todos/create"}
                  >
                    Create
                  </NavLink>
                </div>
              </div>
            </div>
            <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
              <div className="relative ml-3">
                <button
                  type="button"
                  className="relative flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                  onClick={() => setToggleMenu((prev) => !prev)}
                >
                  <img
                    className="h-8 w-8 rounded-full"
                    src="/user.avif"
                    alt=""
                  />
                </button>
                {toogleMenu && (
                  <div
                    className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
                    role="menu"
                    aria-orientation="vertical"
                    aria-labelledby="user-menu-button"
                  >
                    <div className="block px-4 py-2 text-sm text-gray-700">
                      {currentUser}
                    </div>
                    <button
                      onClick={onSignOut}
                      className="block px-4 py-2 text-sm text-gray-700"
                    >
                      Sign out
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </nav>
      <div className="h-full flex flex-col justify-center items-center gap-5">
        <div className="z-10">
          <Outlet />
        </div>
      </div>
    </>
  );
}
