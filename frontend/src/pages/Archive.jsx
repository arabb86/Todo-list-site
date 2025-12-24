import React, { useContext, useEffect } from 'react';
import { NoteContext } from '../context/NoteContext';
import { Archive, RotateCcw, FileText } from 'lucide-react';

function ArchivePage() {
    const { archivedNotes, toggleArchive, fetchArchivedNotes } = useContext(NoteContext);

    // Fetch archived notes when component mounts
    useEffect(() => {
        fetchArchivedNotes();
    }, []);

    return (
        <div className="max-w-7xl mx-auto">
            {/* Header */}
            <div className="bg-gradient-to-r from-slate-500 to-slate-600 text-white rounded-2xl p-8 mb-8 shadow-xl">
                <div className="flex items-center gap-3 mb-2">
                    <Archive className="w-8 h-8" />
                    <h1 className="text-4xl font-bold">Archive</h1>
                </div>
                <p className="text-slate-100">
                    Your archived notes are stored here
                </p>
            </div>

            {/* Archived Notes */}
            {archivedNotes.length === 0 ? (
                <div className='flex flex-col items-center justify-center py-20 gap-4'>
                    <div className="bg-slate-100 dark:bg-slate-800 p-6 rounded-full">
                        <Archive className='w-16 h-16 text-slate-400' />
                    </div>
                    <h3 className="text-2xl font-semibold text-slate-700 dark:text-slate-300">
                        No archived notes
                    </h3>
                    <p className='text-slate-500 dark:text-slate-400 text-center max-w-md'>
                        Archive notes you want to keep but don't need to see regularly.
                    </p>
                </div>
            ) : (
                <div className='grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6'>
                    {archivedNotes.map((note) => (
                        <div
                            key={note._id}
                            className="bg-white rounded-xl shadow-md p-5 border border-slate-200"
                            style={{ backgroundColor: note.color || '#ffffff' }}
                        >
                            <h2 className="text-xl font-semibold text-slate-900 mb-2 line-clamp-2">
                                {note.title}
                            </h2>
                            <p className="text-slate-700 mb-3 line-clamp-4 text-sm">
                                {note.content}
                            </p>

                            {/* Tags */}
                            {note.tags && note.tags.length > 0 && (
                                <div className="flex flex-wrap gap-1 mb-3">
                                    {note.tags.map((tag, index) => (
                                        <span
                                            key={index}
                                            className="bg-primary-100 text-primary-700 px-2 py-1 rounded-full text-xs"
                                        >
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                            )}

                            <div className="text-xs text-slate-500 mb-3">
                                {new Date(note.createdAt).toLocaleDateString("en-GB", {
                                    day: "numeric",
                                    month: "short",
                                    year: "numeric"
                                })}
                            </div>

                            <button
                                onClick={() => toggleArchive(note._id)}
                                className="w-full flex items-center justify-center gap-2 bg-primary-600 hover:bg-primary-700 text-white px-4 py-2 rounded-lg font-medium transition"
                            >
                                <RotateCcw className="w-4 h-4" />
                                Unarchive
                            </button>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default ArchivePage;
