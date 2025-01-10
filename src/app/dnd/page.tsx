'use client';
import { dndData } from '@/lib/constants';
import { useState } from 'react';
import { DragDropContext, Draggable, Droppable } from '@hello-pangea/dnd';

function DndPage() {
  const [pageData, setPageData] = useState(dndData);
  return (
    <DragDropContext onDragEnd={() => console.log('Dragged')}>
      <Droppable droppableId="lists" type="list" direction="horizontal">
        {(provider) => (
          <div
            {...provider.droppableProps}
            ref={provider.innerRef}
            className="grid grid-cols-3 max-w-3xl gap-3 mx-auto p-5 border-2 border-slate-200 rounded-md"
          >
            {pageData.map((data, ind) => {
              return (
                <Draggable draggableId={data.id} index={ind} key={data.id}>
                  {(provider) => (
                    <div
                      {...provider.draggableProps}
                      {...provider.dragHandleProps}
                      ref={provider.innerRef}
                      className="border border-slate-400 rounded-md p-2"
                    >
                      {data.name}
                    </div>
                  )}
                </Draggable>
              );
            })}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
}

export default DndPage;
