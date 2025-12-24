import React from 'react';
import { X } from 'lucide-react';

function NoteModal({ isOpen, onClose, children }) {
    if (!isOpen) return null;

    return (
        <>
            {/* Backdrop */}
            <div
                className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 animate-in fade-in duration-200"
                onClick={onClose}
            />

            {/* Modal */}
            <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4">
                <div
                    className="relative bg-white rounded-2xl shadow-2xl w-full max-w-3xl max-h-[90vh] overflow-y-auto animate-in zoom-in-95 fade-in duration-200"
                    onClick={(e) => e.stopPropagation()}
                >
                    {/* Close Button */}
                    <button
                        onClick={onClose}
                        className="absolute top-4 right-4 z-10 bg-slate-100 hover:bg-slate-200 text-slate-600 rounded-full p-2 shadow-lg transition-all hover:scale-110"
                        aria-label="Close"
                    >
                        <X className="w-5 h-5" />
                    </button>

                    {/* Content */}
                    {children}
                </div>
            </div>
        </>
    );
}

export default NoteModal;
