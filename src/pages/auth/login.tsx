import { loginUrl } from "@/helpers/api/urls";
import axios from "axios";
import { AxiosError } from "axios";
import { useState, ChangeEvent, FormEvent } from "react";
import { useMutation } from "react-query";
import { useNavigate } from "react-router-dom";

function Login() {
    const [phone, setPhone] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [showPassword, setShowPassword] = useState<boolean>(false);
    const [error, setError] = useState<string>("");
    const navigate = useNavigate();

    const mutation = useMutation({
        mutationFn: async (): Promise<void> => {
            const credentials = { phone, password };
            try {
                const response = await axios.post<{ data: { token: string; role: string } }>(loginUrl, credentials);
                if (response.data?.data?.token) {
                    localStorage.setItem('token', response.data.data.token);
                    if (response.data.data.role === "ROLE_SUPER_ADMIN") {
                        navigate('/admin/dashboard');
                    }
                }
            } catch (err: AxiosError) {
                setError(err.response?.data?.message || "Something went wrong");
            }
        },
        onError: () => {
            setError("Login failed. Please check your credentials.");
        }
    });

    const handleSubmit = (e: FormEvent<HTMLFormElement>): void => {
        e.preventDefault();
        setError("");
        mutation.mutate();
    };

    const togglePasswordVisibility = (): void => {
        setShowPassword((prev) => !prev);
    };

    return (
        <section className="bg-gray-50 dark:bg-gray-900">
            <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
                <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                    <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                        <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                            Sign in to your account
                        </h1>
                        {error && <div className="text-red-500">{error}</div>}
                        <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
                            <div>
                                <label htmlFor="phone" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your phone</label>
                                <input
                                    type="text"
                                    value={phone}
                                    onChange={(e: ChangeEvent<HTMLInputElement>) => setPhone(e.target.value)}
                                    name="phone"
                                    id="phone"
                                    className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    placeholder="Phone number"
                                    required
                                />
                            </div>
                            <div>
                                <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                                <div className="relative">
                                    <input
                                        type={showPassword ? "text" : "password"}
                                        value={password}
                                        onChange={(e: ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
                                        name="password"
                                        id="password"
                                        placeholder="••••••••"
                                        className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                        required
                                    />
                                    <button
                                        type="button"
                                        onClick={togglePasswordVisibility}
                                        className="absolute inset-y-0 right-0 flex items-center pr-3"
                                    >
                                        {showPassword ? (
                                            <svg className="w-5 h-5 text-gray-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825a6.375 6.375 0 01-3.75-3.075m-1.575-1.575A6.375 6.375 0 014.5 12c0-1.425.45-2.775 1.225-3.875m8.925 8.925A6.375 6.375 0 0012 19.5c1.425 0 2.775-.45 3.875-1.225M12 4.5c-1.425 0-2.775.45-3.875 1.225M15.75 7.875A6.375 6.375 0 0119.5 12c0 1.425-.45 2.775-1.225 3.875M12 4.5c1.425 0 2.775.45 3.875 1.225m-8.925 8.925C6.225 16.275 4.5 14.925 4.5 12c0-1.425.45-2.775 1.225-3.875" />
                                            </svg>
                                        ) : (
                                            <svg className="w-5 h-5 text-gray-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A6.375 6.375 0 0112 19.5c-1.425 0-2.775-.45-3.875-1.225m1.575-1.575A6.375 6.375 0 004.5 12c0-1.425.45-2.775 1.225-3.875m8.925 8.925A6.375 6.375 0 0012 4.5c1.425 0 2.775.45 3.875 1.225M12 4.5c-1.425 0-2.775.45-3.875 1.225m8.925 8.925C17.775 16.275 19.5 14.925 19.5 12c0-1.425-.45-2.775-1.225-3.875" />
                                            </svg>
                                        )}
                                    </button>
                                </div>
                            </div>
                            <div className="flex items-center justify-between">
                                <div className="flex items-start">
                                    <div className="flex items-center h-5">
                                        <input id="remember" aria-describedby="remember" type="checkbox" className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800" />
                                    </div>
                                    <div className="ml-3 text-sm">
                                        <label htmlFor="remember" className="text-gray-500 dark:text-gray-300">Remember me</label>
                                    </div>
                                </div>
                                <a href="#" className="text-sm font-medium text-primary-600 hover:underline dark:text-primary-500">Forgot password?</a>
                            </div>
                            <button type="submit" className="w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-dark-700 dark:focus:ring-dark-800">Sign in</button>
                            <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                                Don’t have an account yet? <a href="#" className="font-medium text-primary-600 hover:underline dark:text-primary-500">Sign up</a>
                            </p>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Login;
