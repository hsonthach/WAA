import { ChangeEvent, FormEvent, useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { AppDispatch } from "../state/store";
import { loginSuccess } from "../state/reducer/authSlice";
import Button from "../components/Button";
import { login } from "../service/user.service";
import { toast } from "react-toastify";

function LoginPage() {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const response = await login(formData);

      const token = response?.data?.token || "";
      const email = response?.data?.email || "";
      if (token) {
        // Save the token to Redux
        dispatch(loginSuccess({ token, email }));

        // Optionally save to localStorage or sessionStorage for persistence
        localStorage.setItem("jwtToken", token);
        localStorage.setItem("todoAppEmail", email);

        // Add token to Axios common headers for future requests
        axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

        // Redirect to the main page
        navigate("/todos");
      }
    } catch (err: any) {
      console.log(err.message);
      toast.error("Login failed. Please check your input!");
    }
  };

  return (
    <div className="h-full flex flex-col justify-center items-center">
      <div
        className="absolute bg w-full h-full z-0"
        style={{ backgroundImage: 'url("bg.jpg")' }}
      ></div>
      <div className="bg-white shadow-lg p-6 rounded-md w-[360px] z-10">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <img
            className="mx-auto h-[3.5em] w-auto"
            src="mark.svg"
            alt="Group 2"
          />
          <h2 className="mt-2 text-center text-2xl font-bold leading-9 tracking-tight select-none">
            Sign in to your account
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form
            className="flex flex-col gap-8"
            action="#"
            method="POST"
            onSubmit={handleSubmit}
          >
            <div className="flex flex-col gap-1">
              <label
                htmlFor="email"
                className="block text-sm font-medium leading-6 text-gray-900 select-none"
              >
                Email address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                value={formData.email}
                onChange={handleChange}
                className="transition-all	duration-150 block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-yellow-600 focus:outline-none sm:text-sm sm:leading-6"
              />
              <label
                htmlFor="password"
                className="block text-sm font-medium leading-6 text-gray-900 select-none"
              >
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                value={formData.password}
                onChange={handleChange}
                className="transition-all	duration-150 block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-yellow-600 focus:outline-none sm:text-sm sm:leading-6"
              />
            </div>

            <Button type="submit" text="Sign in" />
          </form>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
