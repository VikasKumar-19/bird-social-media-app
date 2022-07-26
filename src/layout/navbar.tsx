import React, { useContext } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { AuthContext } from "../AuthWrapper";

const Navbar = () => {
  const activeClassName: string = " border-b-4 border-b-white";

  const { user, handleLogout } = useContext(AuthContext);
  const navigate = useNavigate()

  return (
    <nav className="w-64 h-screen bg-indigo-900  shadow-2xl text-lg text-white">
      <ul className="flex flex-col gap-5 px-10 py-32">
        <li className="py-2 px-2">
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive ? activeClassName : undefined
            }
          >
            Home
          </NavLink>
        </li>

        {user ? (
          <>
            <li className="py-2 px-2">
              <NavLink
                to="/dashboard"
                className={({ isActive }) =>
                  isActive ? activeClassName : undefined
                }
              >
                Dashboard
              </NavLink>
            </li>
            <li className="py-2 px-2">
              <NavLink
                to="/profile"
                className={({ isActive }) =>
                  isActive ? activeClassName : undefined
                }
              >
                Profile
              </NavLink>
            </li>
            <li className="py-2 px-2">
              <div className="cursor-pointer" onClick={()=>{handleLogout?.(); navigate("/", {replace: true})}}>
                <span>
                  Logout
                </span>
              </div>
            </li>
          </>
        ) : (
          <>
            <li className="py-2 px-2">
              <NavLink
                to="/login"
                className={({ isActive }) =>
                  isActive ? activeClassName : undefined
                }
              >
                Login
              </NavLink>
            </li>
            <li className="py-2 px-2">
              <NavLink
                to="/register"
                className={({ isActive }) =>
                  isActive ? activeClassName : undefined
                }
              >
                SignUp
              </NavLink>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
