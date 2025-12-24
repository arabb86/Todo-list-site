import React, { useContext, useEffect, useState } from 'react';
import { NoteContext } from '../context/NoteContext';
import { Search, Plus, Archive, Trash2, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

function Hero() {
    const { notes, searchQuery, setSearchQuery, searchNotes, fetchNotes } = useContext(NoteContext);
    const [localQuery, setLocalQuery] = useState('');
    const navigate = useNavigate();

    // Debounced search
    useEffect(() => {
        const timer = setTimeout(() => {
            searchNotes(localQuery);
            setSearchQuery(localQuery);
        }, 300);

        return () => clearTimeout(timer);
    }, [localQuery]);

    const handleClearSearch = () => {
        setLocalQuery('');
        setSearchQuery('');
        fetchNotes();
    };

    return (
        <div className="relative overflow-hidden bg-gradient-to-br from-primary-500 via-primary-600 to-accent-500 text-white rounded-2xl p-8 mb-8 shadow-2xl">
            {/* Background decoration */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -mr-32 -mt-32"></div>
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-accent-400/20 rounded-full blur-2xl -ml-24 -mb-24"></div>

            <div className="relative z-10">
                {/* Title */}
                <h1 className="text-4xl md:text-5xl font-bold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-white to-accent-100">
                    Welcome Back!
                </h1>
                <p className="text-primary-100 text-lg mb-6">
                    Capture your thoughts, organize your ideas
                </p>

                {/* Search Bar */}
                <div className="relative max-w-2xl mb-6">
                    <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
                    <input
                        type="text"
                        placeholder="Search your notes..."
                        value={localQuery}
                        onChange={(e) => setLocalQuery(e.target.value)}
                        className="w-full pl-12 pr-12 py-3 rounded-xl bg-white/95 backdrop-blur-sm text-slate-900 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-accent-400 shadow-lg transition-all"
                    />
                    {localQuery && (
                        <button
                            onClick={handleClearSearch}
                            className="absolute right-4 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-slate-600 transition"
                        >
                            <X className="w-5 h-5" />
                        </button>
                    )}
                </div>

                {/* Stats & Actions */}
                <div className="flex flex-wrap gap-4 items-center">
                    {/* Note Count */}
                    <div className="bg-white/20 backdrop-blur-sm rounded-lg px-4 py-2 border border-white/30">
                        <span className="text-3xl font-bold">{notes.length}</span>
                        <span className="ml-2 text-primary-100">Active Notes</span>
                    </div>

                    {/* Quick Actions */}
                    <div className="flex gap-2 ml-auto">
                        <button
                            onClick={() => navigate('/create')}
                            className="flex items-center gap-2 bg-white text-primary-600 px-4 py-2 rounded-lg font-medium hover:bg-primary-50 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                        >
                            <Plus className="w-5 h-5" />
                            New Note
                        </button>
                        <button
                            onClick={() => navigate('/archive')}
                            className="flex items-center gap-2 bg-white/20 backdrop-blur-sm border border-white/30 px-4 py-2 rounded-lg font-medium hover:bg-white/30 transition-all"
                        >
                            <Archive className="w-5 h-5" />
                            Archive
                        </button>
                        <button
                            onClick={() => navigate('/trash')}
                            className="flex items-center gap-2 bg-white/20 backdrop-blur-sm border border-white/30 px-4 py-2 rounded-lg font-medium hover:bg-white/30 transition-all"
                        >
                            <Trash2 className="w-5 h-5" />
                            Trash
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Hero;
