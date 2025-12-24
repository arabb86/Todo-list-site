import React, { useContext, useState } from 'react'
import { NoteContext } from '../context/NoteContext'
import { Star, Archive, Trash2, Edit2, Check, X, Tag } from 'lucide-react'
import NoteModal from './NoteModal'

function Notecard({ note }) {
  const { deleteNote, updateNote, togglePin, toggleArchive } = useContext(NoteContext)
  const [isOpen, setIsOpen] = useState(false)
  const [isEditing, setIsEditing] = useState(false)
  const [editData, setEditData] = useState({
    title: note.title,
    content: note.content,
    color: note.color || '#ffffff',
    tags: note.tags || []
  })
  const [tagInput, setTagInput] = useState('')

  const handleUpdate = () => {
    updateNote(note._id, editData)
    setIsEditing(false)
    setIsOpen(false)
  }

  const handleAddTag = (e) => {
    e.preventDefault()
    if (tagInput.trim() && !editData.tags.includes(tagInput.trim())) {
      setEditData({
        ...editData,
        tags: [...editData.tags, tagInput.trim()]
      })
      setTagInput('')
    }
  }

  const handleRemoveTag = (tagToRemove) => {
    setEditData({
      ...editData,
      tags: editData.tags.filter(tag => tag !== tagToRemove)
    })
  }

  const colors = [
    { name: 'White', value: '#ffffff' },
    { name: 'Yellow', value: '#fef3c7' },
    { name: 'Blue', value: '#dbeafe' },
    { name: 'Green', value: '#d1fae5' },
    { name: 'Pink', value: '#fce7f3' },
    { name: 'Purple', value: '#ede9fe' },
    { name: 'Red', value: '#fee2e2' },
    { name: 'Teal', value: '#ccfbf1' }
  ]

  return (
    <>
      {/* Card Preview - Clickable */}
      <div
        onClick={() => setIsOpen(true)}
        className="relative rounded-xl shadow-md transition-all duration-300 p-5 flex flex-col group border border-slate-200 cursor-pointer hover:shadow-xl hover:-translate-y-1"
        style={{ backgroundColor: note.color || '#ffffff' }}
      >
        {/* Pin indicator */}
        {note.isPinned && (
          <div className="absolute -top-2 -right-2 bg-amber-500 text-white rounded-full p-1.5 shadow-lg">
            <Star className="w-4 h-4 fill-current" />
          </div>
        )}

        {/* Preview Content */}
        <h2 className="text-xl font-semibold text-slate-900 mb-2 line-clamp-2">
          {note.title}
        </h2>
        <p className="text-slate-700 flex-1 mb-3 line-clamp-4 text-sm leading-relaxed">
          {note.content}
        </p>

        {/* Tags Display */}
        {note.tags && note.tags.length > 0 && (
          <div className="flex flex-wrap gap-1 mb-3">
            {note.tags.slice(0, 3).map((tag, index) => (
              <span
                key={index}
                className="inline-flex items-center gap-1 bg-primary-100 text-primary-700 px-2 py-1 rounded-full text-xs font-medium"
              >
                <Tag className="w-3 h-3" />
                {tag}
              </span>
            ))}
            {note.tags.length > 3 && (
              <span className="text-xs text-slate-500">+{note.tags.length - 3}</span>
            )}
          </div>
        )}

        {/* Date */}
        <div className="text-xs text-slate-500 mt-auto">
          {new Date(note.createdAt).toLocaleDateString("en-GB", {
            day: "numeric",
            month: "short",
            year: "numeric"
          })}
        </div>
      </div>

      {/* Expanded Modal */}
      <NoteModal isOpen={isOpen} onClose={() => { setIsOpen(false); setIsEditing(false); }}>
        <div
          className="p-8 rounded-2xl"
          style={{ backgroundColor: note.color || '#ffffff' }}
        >
          {isEditing ? (
            <div className="space-y-4">
              {/* Edit Mode */}
              <h3 className="text-2xl font-bold text-slate-800 mb-4">Edit Note</h3>

              <input
                type="text"
                className="border border-slate-300 rounded-lg p-3 w-full focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none bg-white/80 backdrop-blur-sm text-lg font-semibold"
                value={editData.title}
                onChange={(e) => setEditData({ ...editData, title: e.target.value })}
                placeholder="Title"
              />
              <textarea
                className="border border-slate-300 rounded-lg p-3 w-full focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none resize-none bg-white/80 backdrop-blur-sm min-h-[200px]"
                value={editData.content}
                onChange={(e) => setEditData({ ...editData, content: e.target.value })}
                placeholder="Content"
              />

              {/* Color Picker */}
              <div>
                <label className="text-sm font-medium text-slate-700 mb-2 block">Color</label>
                <div className="flex gap-3 flex-wrap">
                  {colors.map(color => (
                    <button
                      key={color.value}
                      type="button"
                      onClick={() => setEditData({ ...editData, color: color.value })}
                      className={`w-10 h-10 rounded-full border-2 transition-transform hover:scale-110 ${editData.color === color.value ? 'border-primary-600 scale-110' : 'border-slate-300'
                        }`}
                      style={{ backgroundColor: color.value }}
                      title={color.name}
                    />
                  ))}
                </div>
              </div>

              {/* Tags Input */}
              <div>
                <label className="text-sm font-medium text-slate-700 mb-2 block">Tags</label>
                <form onSubmit={handleAddTag} className="flex gap-2 mb-2">
                  <input
                    type="text"
                    value={tagInput}
                    onChange={(e) => setTagInput(e.target.value)}
                    placeholder="Add tag..."
                    className="flex-1 border border-slate-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none bg-white/80"
                  />
                  <button
                    type="submit"
                    className="bg-primary-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-primary-700 transition"
                  >
                    Add
                  </button>
                </form>
                <div className="flex flex-wrap gap-2">
                  {editData.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="inline-flex items-center gap-1 bg-primary-100 text-primary-700 px-3 py-1.5 rounded-full text-sm"
                    >
                      {tag}
                      <button
                        type="button"
                        onClick={() => handleRemoveTag(tag)}
                        className="hover:text-primary-900"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </span>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3 pt-4">
                <button
                  onClick={handleUpdate}
                  className="flex-1 flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg transition font-medium"
                >
                  <Check className="w-5 h-5" />
                  Save Changes
                </button>
                <button
                  onClick={() => setIsEditing(false)}
                  className="flex-1 flex items-center justify-center gap-2 bg-slate-400 hover:bg-slate-500 text-white px-6 py-3 rounded-lg transition font-medium"
                >
                  <X className="w-5 h-5" />
                  Cancel
                </button>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              {/* View Mode - Full Detail */}
              {note.isPinned && (
                <div className="flex items-center gap-2 text-amber-600 mb-2">
                  <Star className="w-5 h-5 fill-current" />
                  <span className="text-sm font-medium">Pinned</span>
                </div>
              )}

              <h2 className="text-3xl font-bold text-slate-900 mb-4">
                {note.title}
              </h2>

              <p className="text-slate-700 text-base leading-relaxed whitespace-pre-wrap">
                {note.content}
              </p>

              {/* Tags */}
              {note.tags && note.tags.length > 0 && (
                <div className="flex flex-wrap gap-2 pt-4">
                  {note.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="inline-flex items-center gap-1 bg-primary-100 text-primary-700 px-3 py-1.5 rounded-full text-sm font-medium"
                    >
                      <Tag className="w-4 h-4" />
                      {tag}
                    </span>
                  ))}
                </div>
              )}

              {/* Meta Info */}
              <div className="flex items-center justify-between pt-6 border-t border-slate-200">
                <span className="text-sm text-slate-500">
                  Created: {new Date(note.createdAt).toLocaleDateString("en-GB", {
                    day: "numeric",
                    month: "long",
                    year: "numeric"
                  })}
                </span>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-2 pt-4">
                <button
                  onClick={(e) => { e.stopPropagation(); togglePin(note._id); }}
                  className={`flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium transition ${note.isPinned
                      ? 'bg-amber-100 text-amber-700 hover:bg-amber-200'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                    }`}
                >
                  <Star className={`w-4 h-4 ${note.isPinned ? 'fill-current' : ''}`} />
                  {note.isPinned ? 'Unpin' : 'Pin'}
                </button>
                <button
                  onClick={() => setIsEditing(true)}
                  className="flex-1 flex items-center justify-center gap-2 bg-blue-100 text-blue-700 hover:bg-blue-200 px-4 py-2.5 rounded-lg text-sm font-medium transition"
                >
                  <Edit2 className="w-4 h-4" />
                  Edit
                </button>
                <button
                  onClick={(e) => { e.stopPropagation(); toggleArchive(note._id); setIsOpen(false); }}
                  className="flex-1 flex items-center justify-center gap-2 bg-slate-100 text-slate-600 hover:bg-slate-200 px-4 py-2.5 rounded-lg text-sm font-medium transition"
                >
                  <Archive className="w-4 h-4" />
                  Archive
                </button>
                <button
                  onClick={(e) => { e.stopPropagation(); deleteNote(note._id); setIsOpen(false); }}
                  className="flex-1 flex items-center justify-center gap-2 bg-red-100 text-red-700 hover:bg-red-200 px-4 py-2.5 rounded-lg text-sm font-medium transition"
                >
                  <Trash2 className="w-4 h-4" />
                  Delete
                </button>
              </div>
            </div>
          )}
        </div>
      </NoteModal>
    </>
  )
}

export default Notecard