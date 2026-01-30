import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import Navbar from "../components/Navbar";
import RateLimitedUI from "../components/RateLimitedUI";
import toast from "react-hot-toast";
import NoteCard from "../components/NoteCard";
import api from "../lib/axios";
import NotesNotFound from "../components/NotesNotFound";
import { Loader } from "lucide-react";

const HomePage = () => {

    const navigate = useNavigate();

    const user = JSON.parse(localStorage.getItem("userInfo"));

    const [isRateLimited, setIsRateLimited] = useState(false);
    const [notes, setNotes] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!user) {
            navigate("/");
        }
    }, [user, navigate]);

    useEffect(() => {
        if (!user?._id) return;

        const fetchNotes = async () => {
            try {
                const res = await api.get(`/notes/${user._id}`);

                setNotes(res.data);
                setIsRateLimited(false);

            } catch (error) {
                console.log(error);

                if (error.response?.status === 429) {
                    setIsRateLimited(true);
                } else {
                    toast.error("Failed To Load Notes");
                }

            } finally {
                setLoading(false);
            }
        };

        fetchNotes();

    }, [user]);

    const logoutHandler = () => {
        localStorage.removeItem("userInfo");
        navigate("/");
    };

    return (
        <div className="min-h-screen">

            <Navbar />
            {user && (
                <div className="max-w-7xl mx-auto px-4 mt-6">

                    <div className="flex my-12 flex-col sm:flex-row items-center sm:justify-between gap-3 relative">

                        <h2 className="text-lg sm:text-xl font-semibold text-base-content text-center sm:absolute sm:left-1/2 sm:transform sm:-translate-x-1/2">
                            Welcome,{" "}
                            <span className="text-primary">
                                {user.name}
                            </span>{" "}
                            👋
                        </h2>

                        <div className="hidden sm:block w-24"></div>


                    </div>

                </div>
            )}

            {isRateLimited && <RateLimitedUI />}

            <div className="max-w-7xl mx-auto p-4 mt-4">

                {loading && (
                    <div className="flex items-center justify-center py-10">
                        <Loader className="animate-spin size-10 text-primary" />
                    </div>
                )}

                {notes.length === 0 && !isRateLimited && !loading && (
                    <NotesNotFound />
                )}
                {notes.length > 0 && !isRateLimited && !loading && (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

                        {notes.map((note) => (
                            <NoteCard
                                key={note._id}
                                note={note}
                                setNotes={setNotes}
                            />
                        ))}

                    </div>
                )}

            </div>
        </div>
    );
};

export default HomePage;
