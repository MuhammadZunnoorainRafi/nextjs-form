'use client';
import { dndData } from '@/lib/constants';
import { useState } from 'react';
import { DragDropContext, Draggable, Droppable } from '@hello-pangea/dnd';

function reorder<T>(list: T[], startIndex: number, endIndex: number) {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);
  return result;
}

function DndPage() {
  const [pageData, setPageData] = useState(dndData);
  const handleDragEnd = (res: any) => {
    const { destination, source, type } = res;
    if (!destination) {
      return;
    }

    if (
      source.droppableId === destination.draggableId &&
      source.index === destination.index
    ) {
      return;
    }

    if (type === 'list') {
      const result = reorder(pageData, source.index, destination.index);
      setPageData(result);
    }
  };

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <Droppable droppableId="lists" type="list" direction="horizontal">
        {(provider) => (
          <div
            {...provider.droppableProps}
            ref={provider.innerRef}
            className="grid grid-cols-3 max-w-3xl gap-x-3 mx-auto p-5 border-2 border-slate-200 rounded-md"
          >
            {pageData.map((data, ind) => {
              return (
                <Draggable draggableId={data.id} index={ind} key={data.id}>
                  {(provider) => (
                    <div
                      {...provider.draggableProps}
                      {...provider.dragHandleProps}
                      ref={provider.innerRef}
                      className="border border-slate-400 rounded-md p-2 bg-slate-900"
                    >
                      {data.name}
                    </div>
                  )}
                </Draggable>
              );
            })}
            {provider.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
}

export default DndPage;
