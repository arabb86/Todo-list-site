import React, { useContext, useState } from 'react';
import { NoteContext } from '../context/NoteContext';
import { useNavigate } from 'react-router-dom';
import { Plus, X, Tag, Sparkles, Lightbulb } from 'lucide-react';

function Noteform() {
  const { createNote } = useContext(NoteContext);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: '',
    content: '',
    color: '#ffffff',
    tags: [],
    isPinned: false
  });
  const [tagInput, setTagInput] = useState('');

  const colors = [
    { name: 'White', value: '#ffffff' },
    { name: 'Yellow', value: '#fef3c7' },
    { name: 'Blue', value: '#dbeafe' },
    { name: 'Green', value: '#d1fae5' },
    { name: 'Pink', value: '#fce7f3' },
    { name: 'Purple', value: '#ede9fe' },
    { name: 'Red', value: '#fee2e2' },
    { name: 'Teal', value: '#ccfbf1' }
  ];

  const handleAddTag = (e) => {
    e.preventDefault();
    if (tagInput.trim() && !formData.tags.includes(tagInput.trim())) {
      setFormData({
        ...formData,
        tags: [...formData.tags, tagInput.trim()]
      });
      setTagInput('');
    }
  };

  const handleRemoveTag = (tagToRemove) => {
    setFormData({
      ...formData,
      tags: formData.tags.filter(tag => tag !== tagToRemove)
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.title.trim() && formData.content.trim()) {
      await createNote(formData);
      navigate('/');
    }
  };

  return (
    <div className="h-[calc(100vh-80px)] overflow-hidden pt-4">
      <div className="max-w-6xl mx-auto h-full flex flex-col">

        {/* Form Container - Fits remaining space */}
        <div className="grid md:grid-cols-5 gap-4 flex-1 min-h-0">
          {/* Left Side - Form (3 columns) */}
          <div
            className="md:col-span-3 rounded-xl shadow-xl p-5 border-2 border-slate-200 overflow-y-auto"
            style={{ backgroundColor: formData.color }}
          >
            <form onSubmit={handleSubmit} className="space-y-3">
              {/* Title */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Title
                </label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="What's on your mind?"
                  className="w-full px-3 py-2 bg-white/90 backdrop-blur-sm border-2 border-slate-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition text-base font-medium"
                  required
                />
              </div>

              {/* Content */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Content
                </label>
                <textarea
                  value={formData.content}
                  onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                  placeholder="Pour your thoughts here..."
                  rows="12"
                  className="w-full px-3 py-2 bg-white/90 backdrop-blur-sm border-2 border-slate-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none resize-none transition"
                  required
                />
              </div>

              {/* Tags */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Tags
                </label>
                <div className="flex gap-2 mb-2">
                  <input
                    type="text"
                    value={tagInput}
                    onChange={(e) => setTagInput(e.target.value)}
                    onKeyPress={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault();
                        handleAddTag(e);
                      }
                    }}
                    placeholder="Add tag..."
                    className="flex-1 px-3 py-1.5 bg-white/90 backdrop-blur-sm border-2 border-slate-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none text-sm"
                  />
                  <button
                    type="button"
                    onClick={handleAddTag}
                    className="bg-gradient-to-r from-primary-600 to-accent-600 text-white px-3 py-1.5 rounded-lg hover:from-primary-700 hover:to-accent-700 transition flex items-center gap-1 text-sm font-medium shadow-lg"
                  >
                    <Plus className="w-3 h-3" />
                    Add
                  </button>
                </div>
                <div className="flex flex-wrap gap-1.5 max-h-16 overflow-y-auto">
                  {formData.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="inline-flex items-center gap-1 bg-gradient-to-r from-primary-100 to-accent-100 text-primary-700 px-2 py-1 rounded-full text-xs font-medium"
                    >
                      <Tag className="w-3 h-3" />
                      {tag}
                      <button
                        type="button"
                        onClick={() => handleRemoveTag(tag)}
                        className="hover:text-primary-900"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </span>
                  ))}
                </div>
              </div>

              {/* Pin Checkbox */}
              <div className="flex items-center gap-2 bg-amber-50 border-2 border-amber-200 rounded-lg p-2">
                <input
                  type="checkbox"
                  id="isPinned"
                  checked={formData.isPinned}
                  onChange={(e) => setFormData({ ...formData, isPinned: e.target.checked })}
                  className="w-4 h-4 text-amber-600 border-amber-300 rounded focus:ring-2 focus:ring-amber-500"
                />
                <label htmlFor="isPinned" className="text-xs font-semibold text-amber-800 cursor-pointer flex items-center gap-1">
                  <Sparkles className="w-3 h-3" />
                  Pin this note
                </label>
              </div>

              {/* Submit Buttons */}
              <div className="flex gap-2 pt-2">
                <button
                  type="submit"
                  className="flex-1 bg-gradient-to-r from-primary-600 to-accent-600 hover:from-primary-700 hover:to-accent-700 text-white px-4 py-3 rounded-lg font-bold transition-all shadow-lg hover:shadow-xl"
                >
                  Create Note
                </button>
                <button
                  type="button"
                  onClick={() => navigate('/')}
                  className="px-4 py-3 bg-slate-200 hover:bg-slate-300 text-slate-700 rounded-lg font-semibold transition"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>

          {/* Right Side - Color Picker & Tips (2 columns) */}
          <div className="md:col-span-2 space-y-4 overflow-y-auto">
            {/* Color Picker */}
            <div className="bg-white rounded-xl shadow-xl p-4 border-2 border-slate-200">
              <h3 className="text-lg font-bold text-slate-800 mb-2 flex items-center gap-1">
                🎨 Choose Color
              </h3>
              <div className="grid grid-cols-2 gap-2">
                {colors.map(color => (
                  <button
                    key={color.value}
                    type="button"
                    onClick={() => setFormData({ ...formData, color: color.value })}
                    className={`h-12 rounded-lg border-4 transition-all hover:scale-105 shadow-md ${formData.color === color.value
                      ? 'border-primary-600 scale-105 ring-2 ring-primary-200'
                      : 'border-slate-300'
                      }`}
                    style={{ backgroundColor: color.value }}
                    title={color.name}
                  />
                ))}
              </div>
            </div>

            {/* Motivational Tips */}
            <div className="bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl shadow-xl p-4 text-white">
              <h3 className="text-lg font-bold mb-2">💡 Pro Tips</h3>
              <ul className="space-y-1.5 text-xs text-blue-50">
                <li className="flex items-start gap-1.5">
                  <span className="text-yellow-300 text-sm">✨</span>
                  <span>Keep notes short and focused</span>
                </li>
                <li className="flex items-start gap-1.5">
                  <span className="text-yellow-300 text-sm">🏷️</span>
                  <span>Use tags to organize quickly</span>
                </li>
                <li className="flex items-start gap-1.5">
                  <span className="text-yellow-300 text-sm">📌</span>
                  <span>Pin important notes to top</span>
                </li>
                <li className="flex items-start gap-1.5">
                  <span className="text-yellow-300 text-sm">🎨</span>
                  <span>Color-code by topic</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Noteform;