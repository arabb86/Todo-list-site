import React, { useContext, useState, useEffect } from 'react'
import { NoteContext } from '../context/NoteContext'
import Notecard from '../components/Notecard'
import Hero from '../components/Hero'
import { FileText } from 'lucide-react'

// Skeleton Card Component
function SkeletonCard() {
  return (
    <div className="bg-white rounded-xl shadow-md p-5 border border-slate-200 animate-pulse">
      <div className="h-6 bg-slate-200 rounded w-3/4 mb-3"></div>
      <div className="space-y-2 mb-4">
        <div className="h-4 bg-slate-200 rounded"></div>
        <div className="h-4 bg-slate-200 rounded w-5/6"></div>
        <div className="h-4 bg-slate-200 rounded w-4/6"></div>
      </div>
      <div className="flex gap-2">
        <div className="h-8 bg-slate-200 rounded flex-1"></div>
        <div className="h-8 bg-slate-200 rounded flex-1"></div>
      </div>
    </div>
  );
}

function Home() {
  const { notes, loading } = useContext(NoteContext)
  const [showLoading, setShowLoading] = useState(false)

  // Only show loading state if it takes longer than 300ms
  useEffect(() => {
    if (loading) {
      const timer = setTimeout(() => setShowLoading(true), 300)
      return () => clearTimeout(timer)
    } else {
      setShowLoading(false)
    }
  }, [loading])

  return (
    <div className="max-w-7xl mx-auto">
      {/* Hero Section - Always show */}
      <Hero />

      {/* Notes Grid */}
      {loading && showLoading ? (
        // Show skeleton cards while loading
        <div className='grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6'>
          {[...Array(8)].map((_, i) => (
            <SkeletonCard key={i} />
          ))}
        </div>
      ) : notes.length === 0 ? (
        <div className='flex flex-col items-center justify-center py-20 gap-4'>
          <div className="bg-slate-100 dark:bg-slate-800 p-6 rounded-full">
            <FileText className='w-16 h-16 text-slate-400' />
          </div>
          <h3 className="text-2xl font-semibold text-slate-700 dark:text-slate-300">
            No notes yet
          </h3>
          <p className='text-slate-500 dark:text-slate-400 text-center max-w-md'>
            Start capturing your ideas! Click the "New Note" button above to create your first note.
          </p>
        </div>
      ) : (
        <div className='grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6'>
          {notes.map((note) => (
            <Notecard key={note._id} note={note} />
          ))}
        </div>
      )}
    </div>
  )
}

export default Home