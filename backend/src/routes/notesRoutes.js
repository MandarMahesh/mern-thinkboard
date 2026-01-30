import express from "express";
import Note from "../models/Note.js";
import { deleteNote, getNoteById, updateNote } from "../controllers/notesControllers.js";
const router = express.Router();

/* Get notes of user */
router.get("/:userId", async (req, res) => {
    const notes = await Note.find({
        userId: req.params.userId
    });

    res.json(notes);
});

/* Create note */
router.post("/", async (req, res) => {
    const { userId, title, content } = req.body;

    const note = await Note.create({
        userId,
        title,
        content
    });

    res.json(note);
});
router.get("/note/:id", getNoteById);
router.delete("/:id", deleteNote);
router.put("/:id", updateNote);
export default router;