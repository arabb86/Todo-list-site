import React, { useContext, useState } from 'react';
import { NoteContext } from '../context/NoteContext';
import { useNavigate } from 'react-router-dom';
import { Plus, X, Tag, Sparkles } from 'lucide-react';

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
    <div className="min-h-[calc(100vh-160px)] overflow-hidden pt-1 pb-2 flex items-start justify-center bg-slate-50/50">
      <div className="max-w-4xl w-full flex flex-col px-4">
        {/* Main Form Area - Centralized and single column */}
        <div
          className="rounded-xl px-8 py-6 border-2 border-slate-200 flex flex-col"
          style={{ backgroundColor: formData.color }}
        >
          <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
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
                className="w-full px-4 py-2 bg-white/90 backdrop-blur-sm border-2 border-slate-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition text-base font-medium shadow-sm"
                required
              />
            </div>

            {/* Content - Shortened and fixed height */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Content
              </label>
              <textarea
                value={formData.content}
                onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                placeholder="Pour your thoughts here..."
                rows="6"
                className="w-full px-4 py-3 bg-white/90 backdrop-blur-sm border-2 border-slate-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none resize-none transition shadow-sm"
                required
              />
            </div>

            {/* Tags & Colors Section */}
            <div className="grid grid-cols-2 gap-4">
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
                    className="bg-primary-600 text-white px-3 py-1.5 rounded-lg hover:bg-primary-700 transition flex items-center gap-1 text-sm font-medium"
                  >
                    <Plus className="w-3 h-3" />
                  </button>
                </div>
                <div className="flex flex-wrap gap-1.5 max-h-12 overflow-hidden">
                  {formData.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="inline-flex items-center gap-1 bg-white/80 text-primary-700 px-2 py-1 rounded-full text-xs font-medium border border-slate-200"
                    >
                      {tag}
                      <button type="button" onClick={() => handleRemoveTag(tag)}>
                        <X className="w-3 h-3" />
                      </button>
                    </span>
                  ))}
                </div>
              </div>

              {/* Color Picker - Now below tags/next to tags area */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Choose Color
                </label>
                <div className="grid grid-cols-4 gap-1.5">
                  {colors.map(color => (
                    <button
                      key={color.value}
                      type="button"
                      onClick={() => setFormData({ ...formData, color: color.value })}
                      className={`h-7 rounded-md border-2 transition-all hover:scale-105 ${formData.color === color.value
                        ? 'border-primary-600 scale-105 shadow-sm'
                        : 'border-slate-300'
                        }`}
                      style={{ backgroundColor: color.value }}
                      title={color.name}
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* Bottom Actions: Pin and Submit */}
            <div className="flex items-center justify-between gap-4 pt-2">
              <div className="flex items-center gap-2 bg-white/80 border border-slate-200 rounded-lg px-3 py-2">
                <input
                  type="checkbox"
                  id="isPinned"
                  checked={formData.isPinned}
                  onChange={(e) => setFormData({ ...formData, isPinned: e.target.checked })}
                  className="w-4 h-4 text-primary-600 border-slate-300 rounded focus:ring-primary-500"
                />
                <label htmlFor="isPinned" className="text-xs font-semibold text-slate-700 cursor-pointer flex items-center gap-1">
                  <Sparkles className="w-3 h-3" />
                  Pin
                </label>
              </div>

              <div className="flex gap-2 flex-1">
                <button
                  type="submit"
                  className="flex-1 bg-primary-600 hover:bg-primary-700 text-white px-4 py-2.5 rounded-lg font-bold transition-all shadow-md"
                >
                  Create
                </button>
                <button
                  type="button"
                  onClick={() => navigate('/')}
                  className="px-4 py-2.5 bg-slate-200 hover:bg-slate-300 text-slate-700 rounded-lg font-semibold transition"
                >
                  Cancel
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Noteform;