import {ChangeEvent, FormEvent, useState} from "react";
import axios from "axios";
import {useDispatch} from "react-redux";
import {useNavigate} from 'react-router-dom';
import {AppDispatch} from "../../app/store";
import {loginSuccess} from "./authSlice";

function LoginView() {

    const [formData, setFormData] = useState({email: '', password: ''});
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target;
        setFormData(prevState => ({...prevState, [name]: value}));
    }

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        console.log(formData);
        try {
            var response = await axios('http://localhost:8080/auth/login', {
                method: 'POST',
                data: formData
            });
            console.log(response);
            const token = response?.data?.token || '';
            if (token) {
                // Save the token to Redux
                dispatch(loginSuccess(token));

                // Optionally save to localStorage or sessionStorage for persistence
                localStorage.setItem('jwtToken', token);

                // Add token to Axios common headers for future requests
                axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

                // Redirect to the main page
                navigate('/');
            }
        } catch (err: any) {
            console.log(err.message);
        }
    }

    return (
        <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                <img className="mx-auto h-10 w-auto"
                     src="https://tailwindui.com/plus/img/logos/mark.svg?color=blue&shade=600" alt="Group 2"/>
                <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">Sign in to
                    your account</h2>
            </div>

            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                <form className="space-y-6" action="#" method="POST" onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">Email
                            address</label>
                        <div className="mt-2">
                            <input id="email" name="email" type="email" autoComplete="email" required
                                   value={formData.email} onChange={handleChange}
                                   className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"/>
                        </div>
                    </div>

                    <div>
                        <div className="flex items-center justify-between">
                            <label htmlFor="password"
                                   className="block text-sm font-medium leading-6 text-gray-900">Password</label>
                            {/*<div className="text-sm">*/}
                            {/*    <a href="#" className="font-semibold text-indigo-600 hover:text-indigo-500">Forgot*/}
                            {/*        password?</a>*/}
                            {/*</div>*/}
                        </div>
                        <div className="mt-2">
                            <input id="password" name="password" type="password" autoComplete="current-password"
                                   required value={formData.password} onChange={handleChange}
                                   className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"/>
                        </div>
                    </div>

                    <div>
                        <button type="submit"
                                className="flex w-full justify-center rounded-md bg-blue-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600">Sign
                            in
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default LoginView;