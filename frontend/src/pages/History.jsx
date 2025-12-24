import React, { useContext, useEffect } from 'react';
import { NoteContext } from '../context/NoteContext';
import { Trash2, RotateCcw, FileX2, AlertCircle } from 'lucide-react';

function History() {
    const { deletedNotes, restoreNote, permanentDelete, fetchDeletedNotes } = useContext(NoteContext);

    // Fetch deleted notes when component mounts
    useEffect(() => {
        fetchDeletedNotes();
    }, []);

    return (
        <div className="max-w-7xl mx-auto">
            {/* Header */}
            <div className="bg-gradient-to-r from-red-500 to-orange-500 text-white rounded-2xl p-8 mb-8 shadow-xl">
                <div className="flex items-center gap-3 mb-2">
                    <Trash2 className="w-8 h-8" />
                    <h1 className="text-4xl font-bold">Trash</h1>
                </div>
                <p className="text-red-100">
                    Notes here will be automatically deleted after 30 days
                </p>
            </div>

            {/* Deleted Notes */}
            {deletedNotes.length === 0 ? (
                <div className='flex flex-col items-center justify-center py-20 gap-4'>
                    <div className="bg-slate-100 dark:bg-slate-800 p-6 rounded-full">
                        <Trash2 className='w-16 h-16 text-slate-400' />
                    </div>
                    <h3 className="text-2xl font-semibold text-slate-700 dark:text-slate-300">
                        Trash is empty
                    </h3>
                    <p className='text-slate-500 dark:text-slate-400 text-center max-w-md'>
                        Deleted notes will appear here for 30 days before being permanently removed.
                    </p>
                </div>
            ) : (
                <>
                    <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mb-6 flex items-start gap-3">
                        <AlertCircle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
                        <div>
                            <p className="text-amber-800 text-sm">
                                <strong>Note:</strong> These notes will be permanently deleted after 30 days.
                                You can restore them anytime before that.
                            </p>
                        </div>
                    </div>
                    <div className='grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6'>
                        {deletedNotes.map((note) => (
                            <div
                                key={note._id}
                                className="bg-white rounded-xl shadow-md p-5 border border-slate-200 opacity-75"
                                style={{ backgroundColor: note.color || '#ffffff' }}
                            >
                                <h2 className="text-xl font-semibold text-slate-900 mb-2 line-clamp-2">
                                    {note.title}
                                </h2>
                                <p className="text-slate-700 mb-3 line-clamp-3 text-sm">
                                    {note.content}
                                </p>

                                <div className="text-xs text-slate-500 mb-3">
                                    Deleted: {new Date(note.deletedAt).toLocaleDateString("en-GB", {
                                        day: "numeric",
                                        month: "short",
                                        year: "numeric"
                                    })}
                                </div>

                                <div className="flex gap-2">
                                    <button
                                        onClick={() => restoreNote(note._id)}
                                        className="flex-1 flex items-center justify-center gap-1 bg-green-600 hover:bg-green-700 text-white px-3 py-2 rounded-lg text-sm font-medium transition"
                                    >
                                        <RotateCcw className="w-4 h-4" />
                                        Restore
                                    </button>
                                    <button
                                        onClick={() => {
                                            if (window.confirm('Permanently delete this note? This action cannot be undone.')) {
                                                permanentDelete(note._id);
                                            }
                                        }}
                                        className="flex-1 flex items-center justify-center gap-1 bg-red-600 hover:bg-red-700 text-white px-3 py-2 rounded-lg text-sm font-medium transition"
                                    >
                                        <FileX2 className="w-4 h-4" />
                                        Delete
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </>
            )}
        </div>
    );
}

export default History;
