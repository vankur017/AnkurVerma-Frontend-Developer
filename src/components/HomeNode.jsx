import React, { useState, useEffect } from 'react';
import { Handle, Position } from 'reactflow';
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { SortableSection } from './SortableSection';

const HomeNode = ({ data, id }) => {
 
  const [sections, setSections] = useState(data.sections || []);

 
  useEffect(() => {
    if (data.sections) {
      setSections(data.sections);
    }
  }, [data.sections]);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragEnd = (event) => {
    const { active, over } = event;

    if (active.id !== over.id) {
      const oldIndex = sections.findIndex((s) => s.id === active.id);
      const newIndex = sections.findIndex((s) => s.id === over.id);

      const newSections = arrayMove(sections, oldIndex, newIndex);
      
      setSections(newSections);

     
      if (data.onSectionChange) {
        data.onSectionChange(id, newSections);
      }
    }
  };

  return (
    <div className="bg-yellow-50 border-2 border-yellow-400 rounded-lg w-62.5 shadow-md overflow-hidden">
    
      <div className="bg-yellow-400 p-2 border-b border-yellow-500">
        <h3 className="font-bold text-gray-800 text-center">{data.label}</h3>
        <p className="text-xs text-center text-gray-700 mt-1">
          Drag sections to reorder
        </p>
      </div>

   
      <div className="p-3">
       
        <div className="nodrag cursor-default">
          <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragEnd={handleDragEnd}
          >
            <SortableContext
              items={sections}
              strategy={verticalListSortingStrategy}
            >
              {sections.map((section) => (
                <SortableSection 
                  key={section.id} 
                  id={section.id} 
                  title={section.title} 
                />
              ))}
            </SortableContext>
          </DndContext>
        </div>
      </div>

      <Handle 
        type="source" 
        position={Position.Bottom} 
        className="w-3 h-3 bg-blue-500" 
      />
    </div>
  );
};

export default HomeNode;