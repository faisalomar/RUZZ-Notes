import React, { useState, useEffect, useRef } from 'react';
import { X, Plus, Trash2, Upload, Image as ImageIcon } from 'lucide-react';
import type { Note } from '../App';

interface NoteFormProps {
  onSubmit: (note: Note | Omit<Note, 'id' | 'timestamp'>) => void;
  onClose: () => void;
  initialValues?: Note;
}

export function NoteForm({ onSubmit, onClose, initialValues }: NoteFormProps) {
  const [subject, setSubject] = useState(initialValues?.subject || '');
  const [content, setContent] = useState(initialValues?.content || '');
  const [outputText, setOutputText] = useState(initialValues?.output.text || '');
  const [outputLinks, setOutputLinks] = useState<string[]>(initialValues?.output.links || []);
  const [outputImages, setOutputImages] = useState<string[]>(initialValues?.output.images || []);
  const [followUp, setFollowUp] = useState(initialValues?.followUp || '');
  const [status, setStatus] = useState<Note['status']>(initialValues?.status || 'pending');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const noteData = {
      ...(initialValues && { id: initialValues.id }),
      ...(initialValues && { timestamp: initialValues.timestamp }),
      subject,
      content,
      output: {
        text: outputText,
        links: outputLinks.filter(link => link.trim() !== ''),
        images: outputImages.filter(img => img.trim() !== '')
      },
      followUp,
      status
    };
    onSubmit(noteData);
  };

  const addOutputLink = () => setOutputLinks([...outputLinks, '']);
  const addOutputImage = () => setOutputImages([...outputImages, '']);

  const removeOutputLink = (index: number) => {
    setOutputLinks(outputLinks.filter((_, i) => i !== index));
  };

  const removeOutputImage = (index: number) => {
    setOutputImages(outputImages.filter((_, i) => i !== index));
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      Array.from(files).forEach(file => {
        const reader = new FileReader();
        reader.onloadend = () => {
          if (typeof reader.result === 'string') {
            setOutputImages(prev => [...prev, reader.result]);
          }
        };
        reader.readAsDataURL(file);
      });
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50 overflow-y-auto">
      <div className="bg-white rounded-lg w-full max-w-3xl">
        <div className="flex justify-between items-center p-4 border-b">
          <h2 className="text-xl font-semibold text-gray-800">
            {initialValues ? 'Edit Note' : 'New Note'}
          </h2>
          <button
            onClick={onClose}
            className="p-2 text-gray-600 hover:text-gray-800 rounded-full hover:bg-gray-100"
          >
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Subject
            </label>
            <input
              type="text"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Content
            </label>
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-transparent min-h-[100px]"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Output
            </label>
            <textarea
              value={outputText}
              onChange={(e) => setOutputText(e.target.value)}
              placeholder="Output text..."
              className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-transparent mb-2"
            />

            <div className="space-y-4">
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium text-gray-700">Links</span>
                  <button
                    type="button"
                    onClick={addOutputLink}
                    className="text-indigo-600 hover:text-indigo-700 text-sm flex items-center gap-1"
                  >
                    <Plus size={16} /> Add Link
                  </button>
                </div>
                {outputLinks.map((link, index) => (
                  <div key={index} className="flex gap-2 mb-2">
                    <input
                      type="url"
                      value={link}
                      onChange={(e) => {
                        const newLinks = [...outputLinks];
                        newLinks[index] = e.target.value;
                        setOutputLinks(newLinks);
                      }}
                      placeholder="https://"
                      className="flex-1 px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    />
                    <button
                      type="button"
                      onClick={() => removeOutputLink(index)}
                      className="p-2 text-red-600 hover:text-red-700 rounded-lg hover:bg-red-50"
                    >
                      <Trash2 size={20} />
                    </button>
                  </div>
                ))}
              </div>

              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium text-gray-700">Images</span>
                  <div className="flex gap-2">
                    <button
                      type="button"
                      onClick={addOutputImage}
                      className="text-indigo-600 hover:text-indigo-700 text-sm flex items-center gap-1"
                    >
                      <Plus size={16} /> Add Image URL
                    </button>
                    <button
                      type="button"
                      onClick={() => fileInputRef.current?.click()}
                      className="text-indigo-600 hover:text-indigo-700 text-sm flex items-center gap-1"
                    >
                      <Upload size={16} /> Upload Image
                    </button>
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="image/*"
                      multiple
                      onChange={handleImageUpload}
                      className="hidden"
                    />
                  </div>
                </div>
                {outputImages.map((image, index) => (
                  <div key={index} className="flex gap-2 mb-2">
                    <div className="flex-1 flex gap-2 items-center border border-gray-300 rounded-lg p-2">
                      {image.startsWith('data:image/') ? (
                        <div className="flex items-center gap-2">
                          <ImageIcon size={20} className="text-gray-400" />
                          <span className="text-sm text-gray-600">Uploaded Image</span>
                          <img src={image} alt="" className="h-8 w-8 object-cover rounded" />
                        </div>
                      ) : (
                        <input
                          type="url"
                          value={image}
                          onChange={(e) => {
                            const newImages = [...outputImages];
                            newImages[index] = e.target.value;
                            setOutputImages(newImages);
                          }}
                          placeholder="https://"
                          className="flex-1 px-4 py-2 focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                        />
                      )}
                    </div>
                    <button
                      type="button"
                      onClick={() => removeOutputImage(index)}
                      className="p-2 text-red-600 hover:text-red-700 rounded-lg hover:bg-red-50"
                    >
                      <Trash2 size={20} />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Follow Up
            </label>
            <textarea
              value={followUp}
              onChange={(e) => setFollowUp(e.target.value)}
              className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Status
            </label>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value as Note['status'])}
              className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            >
              <option value="pending">Pending</option>
              <option value="in-progress">In Progress</option>
              <option value="completed">Completed</option>
            </select>
          </div>

          <div className="flex justify-end gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-gradient-to-r from-indigo-600 to-blue-600 text-white rounded-lg hover:from-indigo-700 hover:to-blue-700 transition-colors"
            >
              {initialValues ? 'Save Changes' : 'Create Note'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}