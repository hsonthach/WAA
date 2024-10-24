import { NavLink, Outlet } from "react-router-dom";

export default function TodoPage() {
  return (
    <>
      <div className="menu flex items-center justify-center gap-3">
        <NavLink
          className={({ isActive }) =>
            `menu-item text-center text-lg w-[80px] py-2 rounded bg-gray-50 ${
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
            `menu-item text-center text-lg w-[80px] py-2 rounded bg-gray-50 ${
              isActive && "menu-active"
            }`
          }
          to={"/todos/create"}
        >
          Create
        </NavLink>
      </div>
      <div
        className="h-full bg flex flex-col justify-center items-center gap-5"
        style={{ backgroundImage: 'url("/main-bg.jpeg")' }}
      >
        <Outlet />
      </div>
    </>
  );
}
