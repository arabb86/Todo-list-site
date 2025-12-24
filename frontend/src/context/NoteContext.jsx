import React, { createContext, useEffect, useState } from 'react'
import BACKEND_URL from '../api/url'

export const NoteContext = createContext()

export const NoteProvider = ({ children }) => {
    const [notes, setNotes] = useState([])
    const [deletedNotes, setDeletedNotes] = useState([])
    const [archivedNotes, setArchivedNotes] = useState([])
    const [loading, setLoading] = useState(true)
    const [searchQuery, setSearchQuery] = useState('')
    const [deletedFetched, setDeletedFetched] = useState(false)
    const [archivedFetched, setArchivedFetched] = useState(false)

    // Fetch active notes
    const fetchNotes = async () => {
        try {
            setLoading(true)
            const response = await BACKEND_URL.get("/get-notes")
            setNotes(response.data)
        } catch (error) {
            console.log("Error fetching notes", error)
        } finally {
            setLoading(false)
        }
    }

    // Fetch deleted notes (lazy - only when needed)
    const fetchDeletedNotes = async () => {
        try {
            const response = await BACKEND_URL.get("/get-deleted-notes")
            setDeletedNotes(response.data)
            setDeletedFetched(true)
        } catch (error) {
            console.log("Error fetching deleted notes", error)
        }
    }

    // Fetch archived notes (lazy - only when needed)
    const fetchArchivedNotes = async () => {
        try {
            const response = await BACKEND_URL.get("/get-archived-notes")
            setArchivedNotes(response.data)
            setArchivedFetched(true)
        } catch (error) {
            console.log("Error fetching archived notes", error)
        }
    }

    // Search notes
    const searchNotes = async (query) => {
        if (!query.trim()) {
            fetchNotes()
            return
        }
        try {
            const response = await BACKEND_URL.get(`/search?q=${encodeURIComponent(query)}`)
            setNotes(response.data)
        } catch (error) {
            console.log("Error searching notes", error)
        }
    }

    // Create note
    const createNote = async (noteData) => {
        try {
            await BACKEND_URL.post("/create-note", noteData)
            fetchNotes()
        } catch (error) {
            console.log("Error creating note", error)
        }
    }

    // Update note
    const updateNote = async (id, noteData) => {
        try {
            await BACKEND_URL.put(`/update-note/${id}`, noteData)
            fetchNotes()
            if (archivedFetched) fetchArchivedNotes()
        } catch (error) {
            console.log("Error updating note", error)
        }
    }

    // Delete note (soft delete)
    const deleteNote = async (id) => {
        try {
            await BACKEND_URL.delete(`/delete-note/${id}`)
            fetchNotes()
            if (deletedFetched) fetchDeletedNotes()
        } catch (error) {
            console.log("Error deleting note", error)
        }
    }

    // Restore note from trash
    const restoreNote = async (id) => {
        try {
            await BACKEND_URL.put(`/restore-note/${id}`)
            fetchNotes()
            if (deletedFetched) fetchDeletedNotes()
            if (archivedFetched) fetchArchivedNotes()
        } catch (error) {
            console.log("Error restoring note", error)
        }
    }

    // Permanent delete
    const permanentDelete = async (id) => {
        try {
            await BACKEND_URL.delete(`/permanent-delete/${id}`)
            if (deletedFetched) fetchDeletedNotes()
        } catch (error) {
            console.log("Error permanently deleting note", error)
        }
    }

    // Toggle pin
    const togglePin = async (id) => {
        try {
            await BACKEND_URL.put(`/toggle-pin/${id}`)
            fetchNotes()
        } catch (error) {
            console.log("Error toggling pin", error)
        }
    }

    // Toggle archive
    const toggleArchive = async (id) => {
        try {
            await BACKEND_URL.put(`/toggle-archive/${id}`)
            fetchNotes()
            if (archivedFetched) fetchArchivedNotes()
        } catch (error) {
            console.log("Error toggling archive", error)
        }
    }

    // Only fetch active notes on mount
    useEffect(() => {
        fetchNotes()
    }, [])

    return (
        <NoteContext.Provider value={{
            notes,
            deletedNotes,
            archivedNotes,
            loading,
            searchQuery,
            setSearchQuery,
            fetchNotes,
            fetchDeletedNotes,
            fetchArchivedNotes,
            searchNotes,
            createNote,
            updateNote,
            deleteNote,
            restoreNote,
            permanentDelete,
            togglePin,
            toggleArchive
        }}>
            {children}
        </NoteContext.Provider>
    )
}