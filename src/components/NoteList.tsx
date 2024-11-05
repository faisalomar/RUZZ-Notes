import React from 'react';
import { format } from 'date-fns';
import { Pencil, Trash2, ExternalLink } from 'lucide-react';
import type { Note } from '../App';

interface NoteListProps {
  notes: Note[];
  onEdit: (note: Note) => void;
  onDelete: (id: string) => void;
}

export function NoteList({ notes, onEdit, onDelete }: NoteListProps) {
  const getStatusColor = (status: Note['status']) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'in-progress':
        return 'bg-blue-100 text-blue-800';
      case 'completed':
        return 'bg-green-100 text-green-800';
    }
  };

  if (notes.length === 0) {
    return (
      <div className="text-center py-12">
        <h2 className="text-xl font-semibold text-gray-600 mb-2">
          No notes found
        </h2>
        <p className="text-gray-500">
          Create a new note to get started!
        </p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-gray-50 border-b border-gray-200">
            <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600 w-36">Date & Time</th>
            <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600 w-48">Subject</th>
            <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">Journal</th>
            <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">Output</th>
            <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">Follow Up</th>
            <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600 w-28">Status</th>
            <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600 w-24">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {notes.map((note) => (
            <tr key={note.id} className="bg-white hover:bg-gray-50">
              <td className="px-4 py-4 text-sm text-gray-500 align-top">
                {format(note.timestamp, 'PPpp')}
              </td>
              <td className="px-4 py-4 text-sm text-gray-900 font-medium align-top">
                {note.subject}
              </td>
              <td className="px-4 py-4 text-sm text-gray-500 align-top">
                <div className="whitespace-pre-wrap">{note.content}</div>
              </td>
              <td className="px-4 py-4 text-sm text-gray-500 align-top">
                <div className="space-y-3">
                  {note.output.text && (
                    <div className="whitespace-pre-wrap">{note.output.text}</div>
                  )}
                  {note.output.links.length > 0 && (
                    <div className="space-y-1">
                      {note.output.links.map((link, index) => (
                        <a
                          key={index}
                          href={link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-1 text-blue-600 hover:text-blue-800"
                        >
                          {link}
                          <ExternalLink size={14} />
                        </a>
                      ))}
                    </div>
                  )}
                  {note.output.images.length > 0 && (
                    <div className="grid gap-2">
                      {note.output.images.map((image, index) => (
                        <a
                          key={index}
                          href={image}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="block"
                        >
                          <img
                            src={image}
                            alt={`Output image ${index + 1}`}
                            className="rounded-lg w-full max-w-xs object-cover"
                          />
                        </a>
                      ))}
                    </div>
                  )}
                </div>
              </td>
              <td className="px-4 py-4 text-sm text-gray-500 align-top">
                <div className="whitespace-pre-wrap">{note.followUp}</div>
              </td>
              <td className="px-4 py-4 text-sm align-top">
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(note.status)}`}>
                  {note.status.charAt(0).toUpperCase() + note.status.slice(1)}
                </span>
              </td>
              <td className="px-4 py-4 text-sm align-top">
                <div className="flex gap-2">
                  <button
                    onClick={() => onEdit(note)}
                    className="p-1.5 text-gray-600 hover:text-blue-600 rounded-full hover:bg-blue-50 transition-colors"
                  >
                    <Pencil size={16} />
                  </button>
                  <button
                    onClick={() => onDelete(note.id)}
                    className="p-1.5 text-gray-600 hover:text-red-600 rounded-full hover:bg-red-50 transition-colors"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}