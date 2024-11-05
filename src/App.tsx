import React, { useState, useMemo } from 'react';
import { Book, Search, SlidersHorizontal } from 'lucide-react';
import { NoteList } from './components/NoteList';
import { NoteForm } from './components/NoteForm';
import { SearchBar } from './components/SearchBar';
import { FilterSort } from './components/FilterSort';

export interface Note {
  id: string;
  subject: string;
  content: string;
  output: {
    text: string;
    links: string[];
    images: string[];
  };
  followUp: string;
  status: 'pending' | 'in-progress' | 'completed';
  timestamp: Date;
}

function App() {
  const [notes, setNotes] = useState<Note[]>([]);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingNote, setEditingNote] = useState<Note | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState<'date' | 'subject'>('date');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
  const [statusFilter, setStatusFilter] = useState<Note['status'] | 'all'>('all');

  const filteredAndSortedNotes = useMemo(() => {
    return notes
      .filter((note) => {
        const matchesSearch = 
          note.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
          note.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
          note.output.text.toLowerCase().includes(searchTerm.toLowerCase()) ||
          note.followUp.toLowerCase().includes(searchTerm.toLowerCase());
        
        const matchesStatus = statusFilter === 'all' || note.status === statusFilter;
        
        return matchesSearch && matchesStatus;
      })
      .sort((a, b) => {
        if (sortBy === 'date') {
          return sortOrder === 'desc' 
            ? b.timestamp.getTime() - a.timestamp.getTime()
            : a.timestamp.getTime() - b.timestamp.getTime();
        } else {
          return sortOrder === 'desc'
            ? b.subject.localeCompare(a.subject)
            : a.subject.localeCompare(b.subject);
        }
      });
  }, [notes, searchTerm, sortBy, sortOrder, statusFilter]);

  const handleCreateNote = (noteData: Omit<Note, 'id' | 'timestamp'>) => {
    const newNote = {
      ...noteData,
      id: Date.now().toString(),
      timestamp: new Date(),
    };
    setNotes([newNote, ...notes]);
    setIsFormOpen(false);
  };

  const handleUpdateNote = (updatedNote: Note) => {
    setNotes(notes.map(note => 
      note.id === updatedNote.id ? updatedNote : note
    ));
    setEditingNote(null);
    setIsFormOpen(false);
  };

  const handleDeleteNote = (id: string) => {
    if (window.confirm('Are you sure you want to delete this note?')) {
      setNotes(notes.filter(note => note.id !== id));
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50">
      <header className="bg-white shadow-sm border-b border-indigo-100">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-3">
              <Book className="text-indigo-600" size={28} />
              <h1 className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-blue-600 text-transparent bg-clip-text">
                RUZZ Notes
              </h1>
            </div>
            <button
              onClick={() => setIsFormOpen(true)}
              className="px-4 py-2 bg-gradient-to-r from-indigo-600 to-blue-600 text-white rounded-lg hover:from-indigo-700 hover:to-blue-700 transition-all shadow-sm hover:shadow-md"
            >
              New Note
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="mb-6 space-y-4">
          <div className="flex gap-4 flex-col sm:flex-row">
            <SearchBar 
              searchTerm={searchTerm}
              onSearchChange={setSearchTerm}
            />
            <FilterSort
              sortBy={sortBy}
              sortOrder={sortOrder}
              statusFilter={statusFilter}
              onSortByChange={setSortBy}
              onSortOrderChange={setSortOrder}
              onStatusFilterChange={setStatusFilter}
            />
          </div>
        </div>

        <NoteList
          notes={filteredAndSortedNotes}
          onEdit={(note) => {
            setEditingNote(note);
            setIsFormOpen(true);
          }}
          onDelete={handleDeleteNote}
        />
      </main>

      {isFormOpen && (
        <NoteForm
          onSubmit={editingNote ? handleUpdateNote : handleCreateNote}
          onClose={() => {
            setIsFormOpen(false);
            setEditingNote(null);
          }}
          initialValues={editingNote}
        />
      )}
    </div>
  );
}

export default App;