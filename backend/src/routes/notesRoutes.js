import express from "express";
import Note from "../models/Note.js";
import { deleteNote, getNoteById, updateNote } from "../controllers/notesControllers.js";
import { protect } from "../middleware/authMiddleware.js";
const router = express.Router();

router.get("/note/:id", protect, getNoteById);
router.get("/", protect, async (req, res) => {
    const notes = await Note.find({
        userId: req.user._id
    });

    res.json(notes);
});

router.post("/", protect, async (req, res) => {
    const { title, content } = req.body;

    const note = await Note.create({
        userId: req.user._id,
        title,
        content
    });

    res.json(note);
});
router.delete("/:id", protect, deleteNote);
router.put("/:id", protect, updateNote);
export default router;