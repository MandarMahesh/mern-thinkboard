import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: String,
    email: { type: String, unique: true },
    password: String // plain text (for learning only)
});

const User = mongoose.model("User", userSchema);
export default User;
