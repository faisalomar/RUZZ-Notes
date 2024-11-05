import React from 'react';
import { SlidersHorizontal } from 'lucide-react';
import type { Note } from '../App';

interface FilterSortProps {
  sortBy: 'date' | 'subject';
  sortOrder: 'asc' | 'desc';
  statusFilter: Note['status'] | 'all';
  onSortByChange: (sortBy: 'date' | 'subject') => void;
  onSortOrderChange: (order: 'asc' | 'desc') => void;
  onStatusFilterChange: (status: Note['status'] | 'all') => void;
}

export function FilterSort({
  sortBy,
  sortOrder,
  statusFilter,
  onSortByChange,
  onSortOrderChange,
  onStatusFilterChange,
}: FilterSortProps) {
  return (
    <div className="flex gap-3 items-center">
      <div className="flex items-center gap-2">
        <select
          value={sortBy}
          onChange={(e) => onSortByChange(e.target.value as 'date' | 'subject')}
          className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent bg-white"
        >
          <option value="date">Sort by Date</option>
          <option value="subject">Sort by Subject</option>
        </select>

        <select
          value={sortOrder}
          onChange={(e) => onSortOrderChange(e.target.value as 'asc' | 'desc')}
          className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent bg-white"
        >
          <option value="desc">Newest First</option>
          <option value="asc">Oldest First</option>
        </select>

        <select
          value={statusFilter}
          onChange={(e) => onStatusFilterChange(e.target.value as Note['status'] | 'all')}
          className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent bg-white"
        >
          <option value="all">All Status</option>
          <option value="pending">Pending</option>
          <option value="in-progress">In Progress</option>
          <option value="completed">Completed</option>
        </select>
      </div>
    </div>
  );
}