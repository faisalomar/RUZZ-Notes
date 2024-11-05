import React from 'react';
import { formatDistanceToNow } from 'date-fns';
import { Pencil, Trash2 } from 'lucide-react';

interface JournalEntryProps {
  entry: {
    id: string;
    title: string;
    content: string;
    date: Date;
  };
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
}

export function JournalEntry({ entry, onEdit, onDelete }: JournalEntryProps) {
  return (
    <div className="bg-white rounded-lg shadow-sm p-6 mb-4 transition-all hover:shadow-md">
      <div className="flex justify-between items-start mb-3">
        <h3 className="text-xl font-semibold text-gray-800">{entry.title}</h3>
        <div className="flex gap-2">
          <button
            onClick={() => onEdit(entry.id)}
            className="p-2 text-gray-600 hover:text-blue-600 rounded-full hover:bg-blue-50 transition-colors"
          >
            <Pencil size={18} />
          </button>
          <button
            onClick={() => onDelete(entry.id)}
            className="p-2 text-gray-600 hover:text-red-600 rounded-full hover:bg-red-50 transition-colors"
          >
            <Trash2 size={18} />
          </button>
        </div>
      </div>
      <p className="text-gray-600 mb-3 whitespace-pre-wrap">{entry.content}</p>
      <span className="text-sm text-gray-400">
        {formatDistanceToNow(entry.date, { addSuffix: true })}
      </span>
    </div>
  );
}