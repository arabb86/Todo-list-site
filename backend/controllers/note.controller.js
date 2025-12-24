import Note from "../models/note.model.js";
export const createNote = async (req, res) => {
    try {
        const { title, content, color, tags, isPinned } = req.body;
        if (!title || !content) {
            return res.status(400).json({ message: "Title and content are required" });
        }
        const newNote = new Note({
            title,
            content,
            color: color || '#ffffff',
            tags: tags || [],
            isPinned: isPinned || false
        });
        await newNote.save();
        res.status(201).json(newNote)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

export const getNotes = async (req, res) => {
    try {
        // Only get active notes (not deleted, not archived)
        const notes = await Note.find({
            isDeleted: false,
            isArchived: false
        }).sort({ isPinned: -1, createdAt: -1 }); // Pinned notes first
        res.status(200).json(notes)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

export const updateNote = async (req, res) => {
    try {
        const { title, content, color, tags, isPinned } = req.body;
        const updateData = {};

        // Only update fields that are provided
        if (title !== undefined) updateData.title = title;
        if (content !== undefined) updateData.content = content;
        if (color !== undefined) updateData.color = color;
        if (tags !== undefined) updateData.tags = tags;
        if (isPinned !== undefined) updateData.isPinned = isPinned;

        const updatedNote = await Note.findByIdAndUpdate(
            req.params.id,
            updateData,
            { new: true }
        );
        if (!updatedNote) {
            return res.status(404).json({ message: "Note not updated" })
        }
        res.status(200).json(updatedNote)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

export const deleteNote = async (req, res) => {
    try {
        // Soft delete: mark as deleted instead of removing
        const deletedNote = await Note.findByIdAndUpdate(
            req.params.id,
            {
                isDeleted: true,
                deletedAt: new Date()
            },
            { new: true }
        );
        if (!deletedNote) {
            return res.status(404).json({ message: "Note not found" })
        }
        res.status(200).json({ message: "Note moved to trash", note: deletedNote })
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

// Get all deleted notes (trash)
export const getDeletedNotes = async (req, res) => {
    try {
        const deletedNotes = await Note.find({ isDeleted: true })
            .sort({ deletedAt: -1 });
        res.status(200).json(deletedNotes);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

// Restore note from trash
export const restoreNote = async (req, res) => {
    try {
        const restoredNote = await Note.findByIdAndUpdate(
            req.params.id,
            {
                isDeleted: false,
                deletedAt: null
            },
            { new: true }
        );
        if (!restoredNote) {
            return res.status(404).json({ message: "Note not found" });
        }
        res.status(200).json({ message: "Note restored", note: restoredNote });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

// Permanent delete (remove from database)
export const permanentDelete = async (req, res) => {
    try {
        const deletedNote = await Note.findByIdAndDelete(req.params.id);
        if (!deletedNote) {
            return res.status(404).json({ message: "Note not found" });
        }
        res.status(200).json({ message: "Note permanently deleted" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

// Get archived notes
export const getArchivedNotes = async (req, res) => {
    try {
        const archivedNotes = await Note.find({
            isArchived: true,
            isDeleted: false
        }).sort({ updatedAt: -1 });
        res.status(200).json(archivedNotes);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

// Toggle archive status
export const toggleArchive = async (req, res) => {
    try {
        const note = await Note.findById(req.params.id);
        if (!note) {
            return res.status(404).json({ message: "Note not found" });
        }
        note.isArchived = !note.isArchived;
        await note.save();
        res.status(200).json(note);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

// Toggle pin status
export const togglePin = async (req, res) => {
    try {
        const note = await Note.findById(req.params.id);
        if (!note) {
            return res.status(404).json({ message: "Note not found" });
        }
        note.isPinned = !note.isPinned;
        await note.save();
        res.status(200).json(note);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

// Search notes
export const searchNotes = async (req, res) => {
    try {
        const { q } = req.query;
        if (!q) {
            return res.status(400).json({ message: "Search query required" });
        }

        const notes = await Note.find({
            isDeleted: false,
            isArchived: false,
            $or: [
                { title: { $regex: q, $options: 'i' } },
                { content: { $regex: q, $options: 'i' } },
                { tags: { $in: [new RegExp(q, 'i')] } }
            ]
        }).sort({ isPinned: -1, createdAt: -1 });

        res.status(200).json(notes);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}