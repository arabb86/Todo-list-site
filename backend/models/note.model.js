import mongoose from "mongoose";

const noteSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    content: {
        type: String,
        required: true
    },
    isPinned: {
        type: Boolean,
        default: false
    },
    color: {
        type: String,
        default: '#ffffff'
    },
    tags: {
        type: [String],
        default: []
    },
    isArchived: {
        type: Boolean,
        default: false
    },
    isDeleted: {
        type: Boolean,
        default: false
    },
    deletedAt: {
        type: Date,
        default: null
    }
}, {
    timestamps: true
})

const Note = mongoose.model("Note", noteSchema)
export default Note