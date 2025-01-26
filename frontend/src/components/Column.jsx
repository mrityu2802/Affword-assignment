import { Loader2, Trash2 } from "lucide-react";
import React, { useRef, useState } from "react";
import { Droppable, Draggable } from "react-beautiful-dnd";
import { useTaskstore } from "../store/useTaskStore";
import Modal from "./Modal";
import TaskModal from "./TaskModal";

const Column = ({ col }) => {
  const modalRef = useRef(null);
  const taskModelRef = useRef(null);
  const [modalTask, setModalTask] = useState({});
  const [idToDelete, setIdToDelete] = useState(null);

  const { deleteTask, isCreatingTask } = useTaskstore();

  const handleDelete = async () => {
    if (idToDelete) {
      await deleteTask(idToDelete);
      modalRef.current?.close();
      setIdToDelete(null);
    }
  };

  const handleTaskClick = (task) => {
    setModalTask(task);
    taskModelRef.current?.showModal();
  };

  return (
    <div className="p-4 rounded bg-neutral text-neutral-content h-full overflow-hidden">
      <h2 className="text-xl font-bold mb-4">{col.name}</h2>
      <Droppable droppableId={col.id}>
        {(provided) => (
          <div
            {...provided.droppableProps}
            ref={provided.innerRef}
            className="min-h-[200px] h-[91%] overflow-auto no-scroll p-2 rounded bg-base-100 shadow-md"
          >
            {col.list.map((task, index) => (
              <Draggable key={task._id} draggableId={task._id} index={index}>
                {(provided) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    className="relative p-2 mb-2 min-h-16 rounded ring-1 ring-neutral-content bg-base-200"
                    id={task._id}
                  >
                    <div className="w-full min-h-12" role="button" onClick={() => handleTaskClick(task)}>
                      <p className="font-semibold text-base-content truncate">
                        {task.task}
                      </p>
                      <p className="text-sm text-primary-content truncate">
                        {task.description}
                      </p>
                    </div>
                    <button
                      onClick={() => {
                        modalRef.current?.showModal();
                        setIdToDelete(task._id);
                      }}
                      className="btn btn-square shadow-none absolute right-1 top-2 group"
                      aria-label="Delete task"
                    >
                      <Trash2 className="size-5 text-base-content group-hover:text-base-content" />
                    </button>
                    <Modal
                      title="Are you sure?"
                      modalRef={modalRef}
                      className="w-[20rem]"
                    >
                      <div className="flex items-center pt-3 gap-2 justify-evenly">
                        <button
                          onClick={handleDelete}
                          className="btn btn-warning"
                          disabled={isCreatingTask}
                        >
                          {isCreatingTask ? (
                            <>
                              <Loader2 className="size-5 animate-spin" />
                              Loading...
                            </>
                          ) : (
                            "Delete"
                          )}
                        </button>
                        <button
                          className="btn btn-primary"
                          onClick={() => modalRef.current?.close()}
                        >
                          Cancel
                        </button>
                      </div>
                    </Modal>
                  </div>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
      <TaskModal data={modalTask} modalRef={taskModelRef} />
    </div>
  );
};

export default Column;
