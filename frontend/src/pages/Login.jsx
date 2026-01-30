import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import api from "../lib/axios";
import { Eye, EyeOff, Loader } from "lucide-react";
import { useEffect } from "react";

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const navigate = useNavigate();
    useEffect(() => {
        const user = JSON.parse(localStorage.getItem("userInfo"));
        if (user) {
            navigate("/homepage");
        }
    }, [navigate]);
    const submitHandler = async (e) => {
        e.preventDefault();
        setError("");
        setLoading(true);

        try {
            const { data } = await api.post("/users/login", {
                email,
                password,
            });

            // Save user
            localStorage.setItem("userInfo", JSON.stringify(data));

            setLoading(false);

            // Go to notes page
            navigate("/homepage");
        } catch (err) {
            setLoading(false);

            if (err.response && err.response.data) {
                setError(err.response.data);
            } else {
                setError("Login failed. Try again.");
            }
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-base-200">
            <div className="card w-full max-w-md shadow-xl bg-base-100">

                <div className="card-body">

                    {/* Title */}
                    <h2 className="text-2xl font-bold text-center">
                        Login to ThinkBoard
                    </h2>

                    {/* Error Message */}
                    {error && (
                        <div className="alert alert-error text-sm">
                            {error}
                        </div>
                    )}

                    {/* Form */}
                    <form onSubmit={submitHandler} className="space-y-4">

                        {/* Email */}
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Email</span>
                            </label>

                            <input
                                type="email"
                                placeholder="Enter your email"
                                className="input input-bordered w-full"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>

                        {/* Password */}
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Password</span>
                            </label>

                            <div className="relative" >
                                <input
                                    type={showPassword ? "text" : "password"}
                                    placeholder="Enter your password"
                                    className="input input-bordered w-full"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-3 top-1/2 -translate-y-1/2"
                                >
                                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                </button>
                            </div>
                        </div>

                        {/* Button */}
                        <div className="form-control mt-4">
                            <button
                                type="submit"
                                className={`btn btn-primary w-full`}
                                disabled={loading}
                            >
                                {loading ? <Loader className="animate-spin" /> : "Login"}
                            </button>
                        </div>

                    </form>

                    {/* Register Link */}
                    <p className="text-center mt-4 text-sm">
                        Don’t have an account?{" "}
                        <Link
                            to="/register"
                            className="link link-primary font-semibold"
                        >
                            Sign Up
                        </Link>
                    </p>

                </div>
            </div>
        </div>
    );
}

export default Login;
