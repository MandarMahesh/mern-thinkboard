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
            <div className="mx-auto max-w-6xl p-4">
                <div className="flex items-center justify-between">
                    <h1 className="text-3xl font-bold text-primary font-mono tracking-tight">ThinkBoard</h1>
                    <div className="flex items-center gap-4">
                        <Link to={"/create"} className="btn btn-primary">
                            <PlusIcon className="size-5" />
                            <span>New Note</span>
                        </Link>
                        <button
                            onClick={logoutHandler}
                            className="btn btn-error"
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