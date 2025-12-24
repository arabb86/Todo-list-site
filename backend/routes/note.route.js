import express from "express"
import {
    createNote,
    deleteNote,
    getNotes,
    updateNote,
    getDeletedNotes,
    restoreNote,
    permanentDelete,
    getArchivedNotes,
    toggleArchive,
    togglePin,
    searchNotes
} from "../controllers/note.controller.js"

const router = express.Router()

// Existing routes
router.post("/create-note", createNote)
router.get("/get-notes", getNotes)
router.put("/update-note/:id", updateNote)
router.delete("/delete-note/:id", deleteNote)

// New routes
router.get("/get-deleted-notes", getDeletedNotes)
router.get("/get-archived-notes", getArchivedNotes)
router.get("/search", searchNotes)
router.put("/restore-note/:id", restoreNote)
router.put("/toggle-archive/:id", toggleArchive)
router.put("/toggle-pin/:id", togglePin)
router.delete("/permanent-delete/:id", permanentDelete)

export default router