import React from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { GripVertical } from 'lucide-react';

export const SortableSection = ({ id, title }) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className="flex items-center justify-between p-2 mb-2 bg-white border border-gray-200 rounded shadow-sm cursor-move hover:border-blue-400 group"
    >
      <span className="text-sm font-medium text-gray-700">{title}</span>
      <GripVertical className="w-4 h-4 text-gray-400 group-hover:text-blue-500" />
    </div>
  );
};