import React from 'react'
import { Link, useNavigate } from 'react-router'
import { PlusIcon } from "lucide-react";
const Navbar = () => {
    const navigate = useNavigate();
    const logoutHandler = () => {
        localStorage.removeItem("userInfo");
        navigate("/");
    };

    return (
        <header className="bg-base-300 border-b border-base-content/10">
            <div className="mx-auto max-w-6xl px-3 sm:px-4 py-3">
                <div className="flex items-center justify-between gap-2">
                    <h1 className="text-lg sm:text-2xl font-bold text-primary font-mono tracking-tight truncate">ThinkBoard</h1>
                    <div className="flex items-center gap-2 shrink-0">
                        <Link to={"/create"} className="btn btn-primary btn-xs sm:btn-sm md:btn-md">
                            <PlusIcon className="size-4" />
                            <span className="hidden sm:inline">New Note</span>
                        </Link>
                        <button
                            onClick={logoutHandler}
                            className="btn btn-error btn-xs sm:btn-sm md:btn-md"
                        >
                            Logout
                        </button>
                    </div>
                </div>

            </div>
        </header>
    )
}

export default Navbar